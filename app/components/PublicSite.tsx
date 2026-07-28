"use client";

import Link from "next/link";
import { useState } from "react";
import { MentorMeLogo } from "./MentorMeLogo";
import { ThemeToggle } from "./ThemeToggle";

type Page = "home" | "courses" | "roadmap" | "leaderboard" | "about" | "pricing" | "contact";
const nav: { label: string; href: string; page: Page }[] = [
  { label: "Home", href: "/", page: "home" },
  { label: "Career Tracks", href: "/courses", page: "courses" },
  { label: "Roadmap", href: "/roadmap", page: "roadmap" },
  { label: "Leaderboard", href: "/leaderboard", page: "leaderboard" },
  { label: "Pricing", href: "/pricing", page: "pricing" },
  { label: "About", href: "/about", page: "about" },
  { label: "Contact", href: "/contact", page: "contact" },
];

function Header({ page }: { page: Page }) {
  const [notice, setNotice] = useState(false);
  return <header className="public-header"><div className="public-header__inner"><Link className="brand-link" href="/" aria-label="MentorME home"><MentorMeLogo /></Link>
    <nav aria-label="Primary navigation">{nav.map(n => <Link className={page === n.page ? "active" : ""} href={n.href} key={n.page}>{n.label}</Link>)}</nav>
    <div className="header-actions"><div className="notice-wrap"><button className="notification-button" onClick={() => setNotice(!notice)} aria-label="Notifications" aria-expanded={notice}>
      <svg viewBox="0 0 448 512" className="notification-bell" aria-hidden="true"><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/></svg><i /></button>
      {notice && <div className="notice-pop"><b>What's new</b><p>New Python career track missions added.</p><p>Levels 1–5 are free.</p><Link href="/roadmap">Explore the new roadmap →</Link></div>}</div>
      <ThemeToggle /><div className="auth-combo"><Link href="/login">Log in</Link><span/><Link href="/signup">Sign up</Link></div></div>
    <button className="mobile-menu" aria-label="Open menu"><span/><span/><span/></button></div>
  </header>;
}

function JourneyStrip() {
  const steps = ["Confusion", "Direction", "Learning", "Practice", "Projects", "Proof", "Confidence"];
  return <div className="journey-strip">{steps.map((s, i) => <div key={s}><span>{String(i + 1).padStart(2, "0")}</span><b>{s}</b></div>)}</div>;
}

function Home() {
  return <><section className="hero">
    <div className="hero-copy"><div className="eyebrow"><span /> YOUR CAREER, FINALLY MAPPED</div>
      <h1>Stop guessing.<br/><em>Start progressing.</em></h1>
      <p>One career track. Ninety purposeful levels. A visible path from “what now?” to career confidence.</p>
      <div className="hero-actions"><Link className="btn" href="/signup">Unlock level 1 <b>→</b></Link><Link className="text-link" href="/roadmap">Explore the 90-level map ↗</Link></div>
      <div className="trust-row"><div className="avatars"><i>RS</i><i>AK</i><i>PM</i></div><span><b>1,200+ learners</b><br/>building proof, not playlists</span></div>
    </div>
    <div className="hero-visual">
      <div className="orbit orbit-a" /><div className="orbit orbit-b" />
      <div className="level-card glass"><span>CURRENT MISSION</span><div className="level-title"><strong>18</strong><div><b>Responsive Interfaces</b><small>Frontend Developer</small></div></div><div className="bar"><i style={{width:"65%"}} /></div><p>3 of 5 missions complete <b>+320 XP</b></p></div>
      <div className="reward-card glass"><span>NEXT MILESTONE</span><b>Builder<br/>Certificate</b><small>Unlocks at level 20</small></div>
      <div className="floating-chip chip-one">⚡ 12 day streak</div><div className="floating-chip chip-two">✓ Project reviewed</div>
      <div className="path-line"><i /><i /><i className="current">18</i><i className="locked">19</i><i className="gold">★</i></div>
    </div>
  </section>
  <JourneyStrip />
  <section className="section universe"><div className="section-intro"><span className="kicker">CHOOSE YOUR DIRECTION</span><h2>Your career isn’t a course.<br/>It’s a world to <em>unlock.</em></h2><p>Pick a destination. We turn it into a clear sequence of skills, missions, projects and proof.</p></div>
    <div className="tracks">
      <article className="track track-main"><span className="track-no">01 / MOST POPULAR</span><div className="track-art code-art"><i>&lt;/&gt;</i></div><h3>Frontend Developer</h3><p>Build the interfaces people remember.</p><footer><span>90 LEVELS</span><Link href="/courses">Enter track →</Link></footer></article>
      <article className="track"><span className="track-no">02</span><div className="track-art"><i>AI</i></div><h3>AI & Data</h3><p>Turn information into intelligent decisions.</p><footer><span>COMING NEXT</span><b>↗</b></footer></article>
      <article className="track"><span className="track-no">03</span><div className="track-art"><i>UX</i></div><h3>Product Design</h3><p>Shape useful products and human experiences.</p><footer><span>COMING NEXT</span><b>↗</b></footer></article>
    </div>
  </section>
  <section className="section map-preview"><div className="world-copy"><span className="kicker">A CAREER JOURNEY YOU CAN SEE</span><h2>Ninety levels.<br/>Six <em>worlds.</em><br/>One direction.</h2><p>Every level tells you what to do, why it matters, and what it unlocks next. No skipping. No wondering.</p><Link className="btn btn-light" href="/roadmap">See the full roadmap →</Link></div><WorldMap compact /></section>
  <section className="section proof"><div><span className="kicker">PROGRESS BECOMES PROOF</span><h2>Don’t just finish.<br/><em>Have something to show.</em></h2></div><div className="proof-grid"><article><span>20</span><h3>Builder Certificate</h3><p>Milestone earned</p></article><article className="project-proof"><small>LIVE PROJECT</small><h3>Campus Events Platform</h3><div className="mini-ui"/><p>Case study • React • Responsive UI</p></article><article><span>12</span><h3>Day streak</h3><p>Consistency compounds</p></article></div></section>
  <section className="final-cta"><span>YOUR FIRST FIVE LEVELS ARE FREE</span><h2>Confusion ends when<br/>the path becomes <em>visible.</em></h2><Link className="btn btn-light" href="/signup">Start your journey →</Link></section></>;
}

const worlds = [
  ["01","DISCOVER","Levels 1–5","Find your direction"],["02","LEARN","Levels 6–22","Build core skills"],["03","PRACTICE","Levels 23–39","Turn theory into action"],
  ["04","CHALLENGE","Levels 40–56","Prove what you know"],["05","BUILD","Levels 57–73","Create portfolio proof"],["06","LAUNCH","Levels 74–90","Become career ready"],
];
function WorldMap({ compact=false }: { compact?: boolean }) {
  return <div className={`world-map ${compact ? "compact" : ""}`}><div className="map-path"/>{worlds.map((w,i)=><article key={w[1]} className={`world world-${i+1}`}><span>{w[0]}</span><div><small>{w[2]}</small><h3>{w[1]}</h3><p>{w[3]}</p></div><b>{i===5 ? "★" : i+1}</b></article>)}</div>;
}

function Courses() {
  return <><PageHero tag="CAREER TRACKS" title={<>Choose a direction.<br/><em>We’ll map the distance.</em></>} text="Purpose-built journeys that move from fundamentals to portfolio proof and career readiness." />
  <section className="section course-feature"><div className="course-visual"><div className="code-window"><span>FRONTEND / LEVEL 18</span><b>&lt;build<br/>&nbsp;&nbsp;what<br/>&nbsp;&nbsp;matters /&gt;</b></div></div><div><span className="kicker">AVAILABLE NOW</span><h2>Frontend<br/>Developer</h2><p>Learn interface engineering through 90 sequential levels, practical missions and portfolio projects.</p><div className="metric-row"><span><b>90</b> LEVELS</span><span><b>9</b> CERTIFICATES</span><span><b>12+</b> PROJECTS</span></div><Link className="btn" href="/signup">Start levels 1–5 free →</Link></div></section>
  <section className="section compare"><h2>Not another content library.</h2><div className="compare-grid"><article><small>COURSE LIBRARY</small><p>“What should I watch?”</p><p>Content → Content → Certificate</p></article><article className="accent-card"><small>MENTORME JOURNEY</small><p>“What should I do next?”</p><p>Learn → Practice → Build → Prove</p></article></div></section></>;
}
function Roadmap() {
  return <><PageHero tag="THE 90-LEVEL ROADMAP" title={<>Every next step.<br/><em>Already mapped.</em></>} text="A sequential career journey across six professional worlds. Complete the mission. Earn the XP. Unlock what’s next." />
  <section className="roadmap-section"><aside><b>FRONTEND DEVELOPER</b><span>90 levels</span><span>9 certificates</span><span>Level 1 unlocked</span></aside><WorldMap /></section></>;
}
function About() {
  return <><PageHero tag="WHY MENTORME EXISTS" title={<>Career confusion isn’t<br/><em>a content problem.</em></>} text="Students already have videos, blogs, tutorials and advice. The real question is simpler — what should I do next?" />
  <section className="section story"><div className="story-number">01</div><div><h2>More content created<br/>more <em>confusion.</em></h2><p>Open tabs. Saved playlists. Half-finished courses. Information was everywhere, but direction was missing.</p></div></section>
  <section className="section compare"><h2>We changed the learning loop.</h2><div className="compare-grid"><article><small>TRADITIONAL LEARNING</small><p>Watch → Watch → Watch → Certificate</p></article><article className="accent-card"><small>MENTORME</small><p>Understand → Practice → Complete → Build → Prove → Progress</p></article></div></section></>;
}
function Pricing() {
  return <><PageHero tag="SIMPLE ACCESS" title={<>Start with clarity.<br/><em>Grow with momentum.</em></>} text="Explore your direction before committing. Your first five levels are completely free." />
  <section className="section pricing-grid"><article className="price-card"><small>FREE / FOUNDATION</small><h2>₹0</h2><p>Levels 1–5</p><ul>{["Career awareness","Technology awareness","Skill identification","Fundamentals","Basic assessment","Roadmap preview"].map(x=><li key={x}>✓ {x}</li>)}</ul><Link className="btn btn-outline" href="/signup">Start free →</Link></article>
  <article className="price-card premium"><div className="popular">FULL JOURNEY</div><small>PREMIUM</small><h2>Pricing<br/>coming soon</h2><p>Levels 6–90</p><ul>{["All missions & projects","9 milestone certificates","Monthly group mentor sessions","Resume & LinkedIn support","Mock interviews","Internship eligibility after level 90"].map(x=><li key={x}>✓ {x}</li>)}</ul><Link className="btn btn-light" href="/contact">Join waitlist →</Link></article></section><p className="preserved">Your progress is always preserved if Premium access pauses.</p></>;
}
const leaders = [
  ["01","Ananya Rao","Frontend Developer","8,920 XP","AR"],
  ["02","Kabir Shah","Frontend Developer","8,640 XP","KS"],
  ["03","Meera Nair","Frontend Developer","8,410 XP","MN"],
  ["04","Rahul Sharma","Frontend Developer","2,450 XP","RS"],
  ["05","Dev Patel","Frontend Developer","2,280 XP","DP"],
];
function Leaderboard() {
  return <><PageHero tag="MENTORME LEADERBOARD" title={<>Momentum deserves<br/><em>to be seen.</em></>} text="A friendly ranking of students turning consistent action into visible career progress." />
  <section className="section leaderboard"><div className="leaderboard-head"><div><span className="kicker">THIS WEEK</span><h2>Top learners</h2></div><div className="your-rank"><small>YOUR RANK</small><b>#04</b><span>↑ 2 places this week</span></div></div>
  <div className="podium"><article><span>02</span><i>KS</i><h3>Kabir Shah</h3><b>8,640 XP</b></article><article className="winner"><span>01</span><i>AR</i><h3>Ananya Rao</h3><b>8,920 XP</b></article><article><span>03</span><i>MN</i><h3>Meera Nair</h3><b>8,410 XP</b></article></div>
  <div className="leader-list">{leaders.map((l)=><article className={l[4]==="RS"?"you":""} key={l[0]}><strong>{l[0]}</strong><i>{l[4]}</i><div><b>{l[1]} {l[4]==="RS"&&<small>YOU</small>}</b><span>{l[2]}</span></div><em>{l[3]}</em></article>)}</div></section></>;
}
function Contact() {
  const [sent,setSent]=useState(false);
  return <><PageHero tag="GET IN TOUCH" title={<>Let’s talk about<br/><em>your next step.</em></>} text="Questions about your journey, a college partnership or something bigger? Start here." />
  <section className="section contact-grid"><div className="contact-types">{["Student support","College partnership","Corporate partnership","General enquiry"].map((x,i)=><div key={x}><span>0{i+1}</span><b>{x}</b><i>→</i></div>)}</div>
  <form onSubmit={e=>{e.preventDefault();setSent(true)}}><div className="field-row"><label>Name<input required placeholder="Your name"/></label><label>Email<input required type="email" placeholder="you@example.com"/></label></div><div className="field-row"><label>Phone<input required placeholder="+91"/></label><label>I am a...<select required><option value="">Select one</option><option>Student</option><option>Educator</option><option>Partner</option></select></label></div><label>Subject<input required placeholder="How can we help?"/></label><label>Message<textarea required placeholder="Tell us a little more..." rows={5}/></label><button className="btn" type="submit">Send message →</button>{sent&&<p className="success">✓ Message received. We’ll be in touch soon.</p>}</form></section></>;
}
function PageHero({tag,title,text}:{tag:string;title:React.ReactNode;text:string}) {return <section className="page-hero"><span className="kicker">{tag}</span><h1>{title}</h1><p>{text}</p><div className="page-orb"/></section>}
function Footer(){return <footer className="footer"><MentorMeLogo/><p>From confusion to confidence.</p><div>{nav.map(n=><Link href={n.href} key={n.page}>{n.label}</Link>)}</div><small>© 2026 MentorME. Progress with purpose.</small></footer>}
export function PublicSite({page}:{page:Page}) { const content={home:<Home/>,courses:<Courses/>,roadmap:<Roadmap/>,leaderboard:<Leaderboard/>,about:<About/>,pricing:<Pricing/>,contact:<Contact/>}[page]; return <main><Header page={page}/>{content}<Footer/></main>}
