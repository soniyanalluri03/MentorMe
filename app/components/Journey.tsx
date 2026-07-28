"use client";
import { useState } from "react";
import { StudentShell } from "./StudentShell";
import { levels, type Level } from "../data/levels";

const worlds=[["DISCOVER",1,5,"Find your compass"],["LEARN",6,22,"Build the foundation"],["PRACTICE",23,39,"Make skills real"],["CHALLENGE",40,56,"Test your edge"],["BUILD",57,73,"Create career proof"],["LAUNCH",74,90,"Step into industry"]] as const;
export function Journey(){
 const [selected,setSelected]=useState<Level>(levels[17]); const [current,setCurrent]=useState(18); const [celebrate,setCelebrate]=useState(false);
 function complete(){setCelebrate(true);setTimeout(()=>{setCurrent(19);setSelected({...levels[18],status:"current"});setCelebrate(false)},1600)}
 return <StudentShell title="My Journey"><div className="journey-head"><div><span className="kicker">FRONTEND DEVELOPER • 18 / 90</span><h2>Your path from<br/><em>learner to builder.</em></h2></div><div className="journey-status"><span><b>{current}</b> CURRENT LEVEL</span><span><b>2,450</b> TOTAL XP</span><span><b>12</b> DAY STREAK</span></div></div>
 <div className="journey-layout"><section className="level-map"><div className="journey-line"/>
 {worlds.map((w,wi)=><div className={`journey-world jw-${wi+1}`} key={w[0]}><header><span>WORLD 0{wi+1}</span><h3>{w[0]}</h3><p>{w[3]} • Levels {w[1]}–{w[2]}</p></header><div className="nodes">
 {levels.filter(l=>l.number>=w[1]&&l.number<=w[2]).map((l,i)=>{const status=l.number<current?"completed":l.number===current?"current":"locked";return <button aria-label={`Level ${l.number}`} onClick={()=>setSelected({...l,status})} className={`level-node ${status} ${l.certificate?"certificate":""}`} key={l.number} style={{marginLeft:`${Math.sin(i*1.25)*105+110}px`}}>{l.certificate?"★":status==="completed"?"✓":l.number}{status==="current"&&<span className="avatar">RS</span>}</button>})}</div></div>)}</section>
 <aside className="level-panel"><button className="panel-close">×</button><span className="panel-stage">{selected.stage} • LEVEL {selected.number}</span><h2>{selected.title}</h2><p>Build practical confidence through a focused sequence of guided missions.</p><div className="panel-progress"><span>LEVEL PROGRESS <b>{selected.number===current?"65%":selected.status==="completed"?"100%":"0%"}</b></span><div><i style={{width:selected.number===current?"65%":selected.status==="completed"?"100%":"0%"}}/></div></div>
 <h4>MISSIONS</h4>{["Learn the core concept","Apply it in context","Complete the skill check","Build the mini challenge","Reflect and document"].map((m,i)=><div className="mission-row" key={m}><i>{selected.status==="completed"||selected.number===current&&i<3?"✓":i+1}</i><span>{m}<small>{i===3?"Practical build":"10–20 minutes"}</small></span><b>+{80+i*20} XP</b></div>)}
 <div className="panel-reward"><span>COMPLETION REWARD</span><b>+{selected.xp} XP</b></div>{selected.number===current?<button className="btn" onClick={complete}>Complete level →</button>:selected.status==="locked"?<button className="btn btn-disabled">Complete level {current} to unlock</button>:<button className="btn btn-outline">Review completed level</button>}</aside></div>
 {celebrate&&<div className="celebration"><div><span>LEVEL COMPLETE</span><strong>18</strong><h2>Responsive Interfaces</h2><p>+300 XP earned • Level 19 unlocked</p></div></div>}</StudentShell>
}
