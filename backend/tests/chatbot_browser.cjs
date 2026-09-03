/* Run against the local frontend and API. Uses Playwright from NODE_PATH or a local installation. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require("playwright");

const base = process.env.CHATBOT_TEST_URL || "http://127.0.0.1:3000";
const artifacts = path.join(__dirname, ".browser-artifacts");
const choices = ["What is MentorMe?", "How it works", "Career tracks", "Explore roadmap", "Find my next step", "Pricing", "Start free", "Talk to the team", "Certificates"];
const inputSelector = ".mentorme-chat-input input";

async function settled(page) {
  await page.waitForFunction(() => {
    const input = document.querySelector(".mentorme-chat-input input");
    const turns = [...document.querySelectorAll(".mentorme-chat-turn")];
    const latest = turns.at(-1);
    const panel = document.querySelector(".mentorme-chat-window");
    const style = panel && getComputedStyle(panel);
    return input && !input.readOnly && latest && latest.getAttribute("aria-busy") === "false"
      && panel.classList.contains("mentorme-chat-window--open") && style.visibility === "visible" && Number(style.opacity) > .99;
  }).catch(async error => {
    console.error("CHAT_STATE", await page.evaluate(() => {
      const panel=document.querySelector(".mentorme-chat-window");
      return { html:panel?.outerHTML, style:panel && {visibility:getComputedStyle(panel).visibility,opacity:getComputedStyle(panel).opacity} };
    }));
    throw error;
  });
}
async function ask(page, text, button = false) {
  const count = await page.locator(".mentorme-chat-turn").count();
  await page.locator(inputSelector).fill(text);
  if (button) await page.getByRole("button", { name: "Send message", exact: true }).click();
  else await page.locator(inputSelector).press("Enter");
  await page.waitForFunction(n => document.querySelectorAll(".mentorme-chat-turn").length > n, count);
  await settled(page);
}
async function lastText(page) {
  return page.locator(".mentorme-chat-turn").last().innerText();
}
async function geometry(page) {
  return page.evaluate(() => {
    const panel = document.querySelector(".mentorme-chat-window");
    const log = document.querySelector(".mentorme-chat-messages");
    const input = document.querySelector(".mentorme-chat-input");
    const box = e => { const r = e.getBoundingClientRect(); return { x:r.x, y:r.y, width:r.width, height:r.height, bottom:r.bottom, right:r.right }; };
    return { panel:box(panel), input:box(input), viewport:{width:innerWidth,height:innerHeight},
      horizontalOverflow: log.scrollWidth > log.clientWidth + 1,
      theme:document.documentElement.dataset.theme };
  });
}

(async () => {
  await fs.mkdir(artifacts, { recursive:true });
  const browser = await chromium.launch({ channel:process.env.CHATBOT_BROWSER_CHANNEL || "msedge", headless:true });
  const results = [];
  try {
    for (const theme of (process.env.CHATBOT_TEST_THEMES || "light,dark").split(",")) {
      for (const [size, viewport] of [["desktop",{width:1280,height:900}],["mobile",{width:390,height:844}]]) {
        const context = await browser.newContext({ viewport, colorScheme:"light" });
        const page = await context.newPage();
        page.on("pageerror", error => console.error("PAGE_ERROR", error.message));
        let posts = 0;
        const countRequest = route => { posts++; return route.continue(); };
        await page.route("**/api/chat", countRequest);
        await page.goto(base, {waitUntil:"networkidle"});
        // Vite can finish network requests before React attaches event handlers.
        await page.waitForFunction(() => Object.keys(document.querySelector(".mentorme-chat-trigger") || {}).some(key => key.startsWith("__reactProps$")));
        if (await page.locator("html").getAttribute("data-theme") !== theme) {
          await page.locator("label.sky-toggle").click();
          await page.waitForFunction(expected => document.documentElement.dataset.theme === expected, theme);
        }
        await page.getByRole("button", {name:"Open MentorME assistant",exact:true}).click();
        await settled(page);
        assert.match(await lastText(page), /what should I call you/);
        await ask(page, "jai");
        assert.match(await lastText(page), /Nice to meet you, Jai/);
        const actual = await page.locator(".mentorme-chat-turn").last().locator(".mentorme-chat-actions button").allTextContents();
        assert.deepEqual(actual, choices);
        for (const label of choices) {
          const button = page.locator(".mentorme-chat-turn").last().getByRole("button", {name:label,exact:true});
          await button.scrollIntoViewIfNeeded();
          assert.equal(await button.isVisible(), true);
        }
        await page.locator(".mentorme-chat-turn").last().evaluate(el => {
          document.querySelector(".mentorme-chat-messages").scrollTop=el.parentElement.offsetTop-12;
        });
        await page.locator(".mentorme-chat-window").screenshot({path:path.join(artifacts,theme+"-"+size+"-introduction.png")});

        for (const [label, expected] of [
          ["Certificates", /Certificates that mark your progress/],
          ["Milestone certificates", /nine milestone certificates/],
          ["Course completion certificate", /successfully completing/],
          ["Internship eligibility", /internship opportunities with startups/],
          ["Course completion", /Course Completion Certificate/],
        ]) {
          const count = await page.locator(".mentorme-chat-turn").count();
          await page.locator(".mentorme-chat-turn").last().getByRole("button", {name:label,exact:true}).click();
          await page.waitForFunction(n => document.querySelectorAll(".mentorme-chat-turn").length > n, count);
          await settled(page);
          assert.match(await lastText(page), expected);
        }

        await page.evaluate(() => {
          globalThis.chatRevealStages = [];
          const observer = new MutationObserver(() => {
            const latest = [...document.querySelectorAll(".mentorme-chat-turn")].at(-1);
            if (latest && latest.textContent.includes("Choose a direction, then learn")) {
              globalThis.chatRevealStages.push({
                bullets:!!latest.querySelector(".mentorme-chat-bullets"),
                choices:!!latest.querySelector(".mentorme-chat-actions"),
              });
            }
          });
          observer.observe(document.querySelector(".mentorme-chat-messages"), {childList:true,subtree:true});
          globalThis.chatRevealObserver=observer;
        });
        await ask(page, "How it works");
        const stages = await page.evaluate(() => { globalThis.chatRevealObserver.disconnect(); return globalThis.chatRevealStages; });
        assert.ok(stages.some(s => !s.bullets && !s.choices), "answer appears first");
        assert.ok(stages.some(s => s.bullets && !s.choices), "bullets appear before choices");
        assert.ok(stages.some(s => s.bullets && s.choices), "choices appear after answer");

        const before = posts;
        await page.locator(inputSelector).fill("Pro");
        await page.getByRole("button", {name:"Send message",exact:true}).click({clickCount:2});
        await page.waitForFunction(() => [...document.querySelectorAll(".mentorme-chat-answer-title")].at(-1)?.textContent.includes("Pro:"));
        await settled(page);
        assert.equal(posts-before,1,"double click sends one request");
        await ask(page, "how much is it");
        assert.match(await lastText(page), /2,000/);
        await ask(page, "what do I get");
        assert.match(await lastText(page), /90/);
        const answerOffset = await page.locator(".mentorme-chat-turn").last().evaluate(el => el.getBoundingClientRect().top - document.querySelector(".mentorme-chat-messages").getBoundingClientRect().top);
        assert.ok(answerOffset >= 0 && answerOffset < 30, "latest answer stays readable as supporting content appears");
        await page.locator(".mentorme-chat-window").screenshot({path:path.join(artifacts,theme+"-"+size+"-answer.png")});
        const bounds = await geometry(page);
        assert.ok(bounds.panel.x>=0 && bounds.panel.right<=bounds.viewport.width);
        assert.ok(bounds.panel.y>=0 && bounds.input.bottom<=bounds.viewport.height);
        assert.equal(bounds.horizontalOverflow,false);

        await ask(page,"Talk to the team");
        assert.equal(await page.locator(inputSelector).getAttribute("inputmode"),"email");
        await ask(page,"invalid");
        assert.match(await lastText(page), /doesn't look quite right/);
        await ask(page,"jai@example.com");
        assert.equal(await page.locator(inputSelector).getAttribute("inputmode"),"tel");
        await ask(page,"+44 7700 900123",true);
        assert.match(await lastText(page), /Got it, Jai/);
        assert.equal((await page.locator(".mentorme-chat-messages").innerText()).includes("jai@example.com"),false);
        assert.deepEqual(await page.evaluate(() => Object.keys(sessionStorage)),["mentorme-public-chat-session"]);

        await page.locator(inputSelector).press("Escape");
        assert.equal(await page.getByRole("button", {name:"Open MentorME assistant",exact:true}).getAttribute("aria-expanded"),"false");
        await page.getByRole("button", {name:"Open MentorME assistant",exact:true}).click();
        await page.locator(inputSelector).waitFor({state:"visible"});
        await page.waitForFunction(() => document.activeElement===document.querySelector(".mentorme-chat-input input"));
        assert.match(await lastText(page), /Got it, Jai/);

        const failRequest = route => route.abort("failed");
        await page.route("**/api/chat",failRequest);
        await ask(page,"Pricing");
        assert.match(await lastText(page), /trouble connecting/);
        assert.equal(await page.locator(".mentorme-chat-turn").last().locator("a").count(),4);
        await page.unroute("**/api/chat",failRequest);
        await ask(page,"Pricing");
        assert.match(await lastText(page), /Enterprise/);
        await page.reload({waitUntil:"networkidle"});
        await page.waitForFunction(() => Object.keys(document.querySelector(".mentorme-chat-trigger") || {}).some(key => key.startsWith("__reactProps$")));
        await page.getByRole("button", {name:"Open MentorME assistant",exact:true}).click();
        await settled(page);
        assert.equal((await lastText(page)).includes("what should I call you"),false);
        await ask(page,"Talk to the team");
        assert.match(await lastText(page), /Got it, Jai/);

        if (size==="mobile") {
          await page.setViewportSize({width:390,height:520});
          const short = await geometry(page);
          assert.ok(short.panel.y>=0 && short.input.bottom<=520,"short-screen input stays visible");
          await page.locator(".mentorme-chat-window").screenshot({path:path.join(artifacts,theme+"-short-mobile.png")});
        }
        await page.getByRole("button", {name:"Clear chat",exact:true}).click();
        await settled(page);
        assert.match(await lastText(page), /what should I call you/);
        await ask(page,"Skip for now");
        assert.equal(await page.locator(".mentorme-chat-turn").last().locator(".mentorme-chat-actions button").count(),choices.length);
        await page.getByRole("button", {name:"Clear chat",exact:true}).click();
        await settled(page);
        await context.close();
        results.push({theme,size,passed:true,bounds,progressiveStages:stages});
        console.log("PASS",theme,size);
      }
    }
  } finally { await browser.close(); }
  await fs.writeFile(path.join(artifacts,"report.json"),JSON.stringify(results,null,2));
  console.log("PASS:", results.length, "theme/viewport combinations; introduction, choices, progressive content, contact, duplicate prevention, errors, resume, clear and short-screen scrolling");
})().catch(error => { console.error(error); process.exitCode=1; });
