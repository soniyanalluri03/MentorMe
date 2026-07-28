"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MentorMeLogo } from "./MentorMeLogo";
import { ThemeToggle } from "./ThemeToggle";

const links=[["⌂","Dashboard","/dashboard"],["⌁","My Journey","/dashboard/journey"],["✓","Missions","/dashboard/missions"],["▣","Projects","/dashboard/projects"],["◇","Achievements","/dashboard/achievements"],["▤","Certificates","/dashboard/certificates"],["↗","Progress","/dashboard/progress"]];
export function StudentShell({children,title}:{children:React.ReactNode;title:string}){
 const path=usePathname();return <main className="student-app"><aside className="sidebar"><Link href="/"><MentorMeLogo compact/></Link><nav>{links.map(x=><Link href={x[2]} className={path===x[2]?"active":""} key={x[1]}><i>{x[0]}</i><span>{x[1]}</span></Link>)}<hr/><Link href="#"><i>♧</i><span>Internship</span><b>LOCKED</b></Link><Link href="#"><i>◎</i><span>Career Hub</span></Link></nav><div className="side-bottom"><ThemeToggle/><Link href="/">↪ <span>Log out</span></Link></div></aside>
 <section className="student-main"><header className="student-top"><div><span>FRONTEND DEVELOPER</span><h1>{title}</h1></div><div className="student-meta"><span>⌕</span><b>⚡ 2,450 XP</b><b>🔥 12 days</b><span>♢</span><i>RS</i></div></header>{children}</section>
 <nav className="mobile-bottom">{links.slice(0,5).map(x=><Link href={x[2]} key={x[1]}>{x[0]}<small>{x[1].replace("My ","")}</small></Link>)}</nav></main>
}
