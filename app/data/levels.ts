export type Level={number:number;title:string;stage:string;xp:number;status:"completed"|"current"|"locked";certificate?:string};
const stageRanges=[
  ["Discover",1,5],["Learn",6,22],["Practice",23,39],["Challenge",40,56],["Build",57,73],["Launch",74,90],
] as const;
const titles=["Career Awareness","Technology Landscape","Strength Mapping","Digital Fundamentals","Direction Checkpoint","HTML Foundations","CSS Systems","Layout Thinking","Git Essentials","Explorer Milestone","JavaScript Logic","DOM Interactions","Accessible Interfaces","Design to Code","Component Thinking","React Foundations","State & Props","Responsive Web Interfaces","API Integration","Builder Milestone","Testing Basics","Performance Foundations"];
const certificates:Record<number,string>={10:"Explorer",20:"Builder",30:"Contributor",40:"Performer",50:"Specialist",60:"Professional",70:"Advanced Professional",80:"Industry Ready",90:"Career Champion"};
export const levels:Level[]=Array.from({length:90},(_,i)=>{const n=i+1;const stage=stageRanges.find(x=>n>=x[1]&&n<=x[2])?.[0]??"Launch";return{number:n,title:titles[i]??`${stage} Mission ${n}`,stage,xp:120+n*10,status:n<18?"completed":n===18?"current":"locked",certificate:certificates[n]}})
