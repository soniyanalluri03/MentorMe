"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MentorMeLogo } from "./MentorMeLogo";

export function AuthPage({mode}:{mode:"login"|"signup"}) {
 const router=useRouter(); const [step,setStep]=useState(1); const signup=mode==="signup";
 function submit(e:React.FormEvent){e.preventDefault(); if(signup&&step<5){setStep(step+1)}else{localStorage.setItem("mentor-auth","true");router.push("/dashboard")}}
 const signupContent=[
   <><h1>Let’s start with <em>you.</em></h1><p>Which description fits you best?</p><div className="choice-grid"><button type="button">College student</button><button type="button">Recent graduate</button><button type="button">Career switcher</button><button type="button">Just exploring</button></div></>,
   <><h1>What are you <em>studying?</em></h1><p>This helps us tune your starting point.</p><label>Course or degree<input required placeholder="e.g. B.Tech Computer Science"/></label><label>Year of study<select><option>First year</option><option>Second year</option><option>Third year</option><option>Final year</option></select></label></>,
   <><h1>Where do you want<br/>to <em>go?</em></h1><p>It’s okay if this changes later.</p><div className="choice-grid"><button type="button">Build digital products</button><button type="button">Work with data & AI</button><button type="button">Design experiences</button><button type="button">Help me decide</button></div></>,
   <><h1>Choose your <em>track.</em></h1><p>Your 90-level map will be built around it.</p><div className="track-choice selected"><span>&lt;/&gt;</span><div><b>Frontend Developer</b><small>Interfaces • React • Projects</small></div><i>✓</i></div><div className="track-choice disabled"><span>AI</span><div><b>AI & Data</b><small>Coming next</small></div></div></>,
   <div className="unlock"><span>LEVEL 1</span><div className="unlock-ring">1</div><h1>Your journey<br/>is <em>ready.</em></h1><p>Career Awareness is unlocked. Your first mission is waiting.</p></div>
 ];
 return <main className="auth-page"><section className="auth-visual"><Link href="/"><MentorMeLogo/></Link><div className="auth-path"><span>CONFUSION</span><i/><span>DIRECTION</span><i/><span>ACTION</span><i/><span>CONFIDENCE</span></div><blockquote>“You don’t need the whole answer.<br/>You need the <em>next clear step.</em>”</blockquote><small>90 LEVELS • ONE VISIBLE PATH</small></section>
 <section className="auth-form"><Link className="back" href="/">← Back to MentorME</Link><form onSubmit={submit}>
 {signup?<><div className="step-line"><span>STEP {step} OF 5</span><i><b style={{width:`${step*20}%`}}/></i></div>{signupContent[step-1]}<button className="btn auth-submit">{step===5?"Enter my dashboard →":"Continue →"}</button></>:<>
 <span className="kicker">WELCOME BACK</span><h1>Continue your<br/><em>momentum.</em></h1><p>Your next mission is exactly where you left it.</p><label>Email<input required type="email" placeholder="you@example.com"/></label><label>Password<input required minLength={8} type="password" placeholder="At least 8 characters"/></label><div className="form-meta"><label><input type="checkbox"/> Remember me</label><a href="#">Forgot password?</a></div><button className="btn auth-submit">Log in →</button><p className="switch">New to MentorME? <Link href="/signup">Start free</Link></p></>}
 </form></section></main>
}
