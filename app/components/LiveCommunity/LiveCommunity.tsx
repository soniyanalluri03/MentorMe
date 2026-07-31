"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BriefcaseBusiness, CheckCircle2, Code2, FolderKanban, MessageCircleMore, Trophy } from "lucide-react";
import styles from "./LiveCommunity.module.css";

type ActivityType = "project" | "xp" | "mentor" | "milestone";
interface Activity { avatar: string; name: string; handle: string; action: string; highlight: string; meta: string; type: ActivityType; }

const activities: Activity[] = [
  {avatar:"AK",name:"Aarav K.",handle:"@aaravbuilds",action:"shipped",highlight:"a responsive portfolio",meta:"2m ago",type:"project"},
  {avatar:"SM",name:"Sanya M.",handle:"@sanyalearns",action:"earned",highlight:"+240 XP",meta:"5m ago",type:"xp"},
  {avatar:"RJ",name:"Rohan J.",handle:"@rohanjs",action:"completed",highlight:"Mentor Review",meta:"8m ago",type:"mentor"},
  {avatar:"NP",name:"Neha P.",handle:"@nehacodes",action:"unlocked",highlight:"Project Builder",meta:"12m ago",type:"milestone"},
  {avatar:"IK",name:"Ishaan K.",handle:"@ishaanui",action:"published",highlight:"a UI case study",meta:"16m ago",type:"project"},
  {avatar:"AD",name:"Ananya D.",handle:"@ananyadev",action:"reached",highlight:"Level 18",meta:"21m ago",type:"xp"},
  {avatar:"VS",name:"Vihaan S.",handle:"@vihaanstack",action:"received",highlight:"mentor approval",meta:"27m ago",type:"mentor"},
  {avatar:"MR",name:"Meera R.",handle:"@meeramakes",action:"completed",highlight:"Career Roadmap",meta:"31m ago",type:"milestone"},
  {avatar:"KB",name:"Kabir B.",handle:"@kabirbuilds",action:"shipped",highlight:"an API project",meta:"38m ago",type:"project"},
  {avatar:"TS",name:"Tara S.",handle:"@taraskills",action:"earned",highlight:"+180 XP",meta:"42m ago",type:"xp"},
  {avatar:"AV",name:"Arjun V.",handle:"@arjunlearns",action:"passed",highlight:"Skill Test 04",meta:"48m ago",type:"mentor"},
  {avatar:"ZI",name:"Zoya I.",handle:"@zoyacreates",action:"unlocked",highlight:"Interview Prep",meta:"54m ago",type:"milestone"},
];
const iconMap={project:FolderKanban,xp:Trophy,mentor:MessageCircleMore,milestone:CheckCircle2};
// Replace these display-only values with live backend counts when community APIs are connected.
const communityStats=[{value:"12,400+",label:"active learners"},{value:"38,000+",label:"projects shipped"},{value:"91%",label:"weekly momentum"}];

function ActivityCard({activity}:{activity:Activity}){
  const Icon=iconMap[activity.type];
  return <article className={styles.card} tabIndex={0}>
    <div className={styles.avatar} aria-hidden="true">{activity.avatar}</div>
    <div className={styles.cardCopy}><div><strong>{activity.name}</strong><span>{activity.handle}</span></div><p>{activity.action} <b>{activity.highlight}</b></p><small>{activity.meta}</small></div>
    <span className={`${styles.typeIcon} ${styles[activity.type]}`} aria-label={`${activity.type} activity`}><Icon size={17}/></span>
  </article>;
}

export default function LiveCommunity(){
  const sectionRef=useRef<HTMLElement>(null);
  const [visible,setVisible]=useState(false);
  const reducedMotion=useReducedMotion();
  useEffect(()=>{const node=sectionRef.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{rootMargin:"120px 0px",threshold:.04});observer.observe(node);return()=>observer.disconnect();},[]);
  return <section ref={sectionRef} className={styles.section} aria-labelledby="community-title">
    <div className={styles.shell}>
      <motion.header className={styles.heading} initial={reducedMotion?false:{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.45}} transition={{duration:.65,ease:[.22,1,.36,1]}}>
        <p>LIVE COMMUNITY. REAL PROGRESS.</p>
        <h2 id="community-title">See learners build, grow, and win—together.</h2>
        <p className={styles.subtitle}>A living stream of projects, milestones, mentor feedback, and momentum from the Mentor Me community.</p>
      </motion.header>
      <div className={styles.streamFrame}>
        <div className={styles.timeline} aria-hidden="true"><span/><Code2/><span/><BriefcaseBusiness/><span/></div>
        <div className={styles.marquee} aria-label="Recent learner activity" onMouseEnter={()=>setVisible(false)} onMouseLeave={()=>setVisible(true)}>
          <div className={`${styles.track} ${visible&&!reducedMotion?styles.running:""}`}>
            {[0,1].map(group=><div className={styles.group} aria-hidden={group===1} key={group}>{activities.map((activity,index)=><ActivityCard activity={activity} key={`${group}-${index}`}/>)}</div>)}
          </div>
        </div>
      </div>
      <motion.div className={styles.stats} initial={reducedMotion?false:{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.7}}>
        {communityStats.map(stat=><div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
        <p><i/> Live activity updates</p>
      </motion.div>
    </div>
  </section>;
}
