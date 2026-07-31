import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the MentorME navbar and preserved routes", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<header class="public-header">/);
  assert.match(html, /src="\/logo-bold\.png"/);
  assert.match(html, /aria-label="Notifications"/);
  assert.match(html, /aria-label="Switch to dark mode"/);
  for (const route of ["courses", "roadmap", "leaderboard", "pricing", "about", "contact", "login"]) {
    assert.match(html, new RegExp(`href="/${route}"`));
  }
});

test("navbar source includes responsive, non-sticky glass styling", async () => {
  const [component, logo, css] = await Promise.all([
    readFile(new URL("../app/components/PublicSite.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/MentorMeLogo.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(component, /const \[menuOpen, setMenuOpen\] = useState\(false\)/);
  assert.match(component, /aria-expanded=\{menuOpen\}/);
  assert.match(logo, /src="\/logo-bold\.png"/);
  assert.match(logo, /src="\/logo-dark\.png"/);
  assert.match(css, /\/\* Definitive responsive glass navbar \*\//);
  assert.match(css, /position:relative;top:auto/);
  assert.match(css, /backdrop-filter:blur\(22px\)/);
  assert.match(css, /border-radius:999px/);
  assert.match(css, /\.public-header nav\.is-open\{display:flex\}/);
  assert.match(css, /rgba\(239,235,255,.88\)/);
  assert.match(css, /rgba\(23,35,63,.9\)/);
});
