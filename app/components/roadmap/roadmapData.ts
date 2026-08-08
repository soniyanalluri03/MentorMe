export type CheckpointType =
  | "direction"
  | "learning"
  | "practice"
  | "project"
  | "certificate"
  | "portfolio"
  | "career"
  | "internship";

export interface RoadmapCheckpoint {
  level: number;
  title: string;
  label: string;
  description: string;
  outcome: string;
  type: CheckpointType;
  free?: boolean;
  milestone?: boolean;
}

export interface RoadmapStat {
  value: string;
  title: string;
  description: string;
}

export const roadmapStats: RoadmapStat[] = [
  {
    value: "90",
    title: "Guided levels",
    description: "One clear next step at a time",
  },
  {
    value: "12+",
    title: "Real projects",
    description: "Practical work for your portfolio",
  },
  {
    value: "09",
    title: "Career certificates",
    description: "Milestones that recognise progress",
  },
  {
    value: "100+",
    title: "Internship opportunities",
    description: "Explore opportunities after readiness",
  },
];

export const roadmapCheckpoints: RoadmapCheckpoint[] = [
  {
    level: 1,
    title: "Career clarity",
    label: "START HERE",
    description:
      "Understand the purpose of your journey and discover the career possibilities available to you.",
    outcome:
      "You begin with a clearer understanding of where your learning journey can take you.",
    type: "direction",
    free: true,
  },
  {
    level: 2,
    title: "Strength discovery",
    label: "SELF DISCOVERY",
    description:
      "Identify your interests, existing strengths and areas where you want to improve.",
    outcome:
      "You understand the skills and qualities you can build upon.",
    type: "direction",
    free: true,
  },
  {
    level: 3,
    title: "Goal mapping",
    label: "CAREER GOAL",
    description:
      "Turn your interests into a clear career goal with an achievable learning direction.",
    outcome:
      "You receive a structured target instead of learning without direction.",
    type: "direction",
    free: true,
  },
  {
    level: 4,
    title: "Industry awareness",
    label: "EXPLORE THE FIELD",
    description:
      "Understand professional roles, work environments, common tools and industry expectations.",
    outcome:
      "You know what professionals actually do inside the selected career path.",
    type: "direction",
    free: true,
  },
  {
    level: 5,
    title: "Learning plan",
    label: "FIRST CHECKPOINT",
    description:
      "Create a structured learning plan containing missions, practice and measurable outcomes.",
    outcome:
      "You finish the first checkpoint with a clear plan for progressing forward.",
    type: "direction",
    free: true,
    milestone: true,
  },
  {
    level: 6,
    title: "Core foundations",
    label: "FOUNDATION",
    description:
      "Start learning the essential concepts and terminology required for your selected career.",
    outcome:
      "You build a reliable base before moving into practical work.",
    type: "learning",
    free: true,
  },
  {
    level: 7,
    title: "Guided learning",
    label: "GUIDED MISSION",
    description:
      "Complete focused learning activities instead of moving between random resources.",
    outcome:
      "You understand one important concept through a structured mission.",
    type: "learning",
    free: true,
  },
  {
    level: 8,
    title: "Skill practice",
    label: "PRACTICE",
    description:
      "Apply your understanding through a small guided activity and immediate feedback.",
    outcome:
      "You begin turning theoretical knowledge into practical ability.",
    type: "practice",
    free: true,
  },
  {
    level: 9,
    title: "First proof",
    label: "VISIBLE PROOF",
    description:
      "Complete a small task that demonstrates what you have understood and practised.",
    outcome:
      "You create your first visible proof of progress.",
    type: "practice",
    free: true,
  },
  {
    level: 10,
    title: "Free journey checkpoint",
    label: "FREE MILESTONE",
    description:
      "Complete the free starter journey and review your direction, learning and progress.",
    outcome:
      "You finish Levels 1–10 with clarity, foundational knowledge and practical exposure.",
    type: "certificate",
    free: true,
    milestone: true,
  },
  {
    level: 15,
    title: "Foundation certificate",
    label: "CERTIFICATE",
    description:
      "Validate your career awareness, foundational understanding and learning readiness.",
    outcome:
      "Earn your first milestone certificate and continue into deeper skill development.",
    type: "certificate",
    milestone: true,
  },
  {
    level: 20,
    title: "Core skill milestone",
    label: "CORE SKILLS",
    description:
      "Complete essential concept missions, guided exercises and foundational assessments.",
    outcome:
      "Build the reliable core knowledge required for more advanced practice.",
    type: "learning",
    milestone: true,
  },
  {
    level: 30,
    title: "Practical skills certificate",
    label: "SKILL CERTIFICATE",
    description:
      "Demonstrate that you can apply core concepts through practical tasks and challenges.",
    outcome:
      "Earn a practical-skills certificate and become ready for real project work.",
    type: "certificate",
    milestone: true,
  },
  {
    level: 40,
    title: "Mini project",
    label: "PROJECT MILESTONE",
    description:
      "Build a guided mini project based on a realistic requirement and working outcome.",
    outcome:
      "Complete your first portfolio-oriented project and receive project XP.",
    type: "project",
    milestone: true,
  },
  {
    level: 50,
    title: "Real-world project",
    label: "REAL PROJECT",
    description:
      "Build a larger project by following realistic requirements, workflows and quality checks.",
    outcome:
      "Create meaningful practical proof that demonstrates your growing ability.",
    type: "project",
    milestone: true,
  },
  {
    level: 60,
    title: "Portfolio proof",
    label: "PORTFOLIO",
    description:
      "Polish your strongest work and present it through a structured project case study.",
    outcome:
      "Add a professional project with clear explanation and visible proof to your portfolio.",
    type: "portfolio",
    milestone: true,
  },
  {
    level: 70,
    title: "Professional assessment",
    label: "PROVE YOUR SKILLS",
    description:
      "Complete advanced missions, assessments and professional reviews with less guidance.",
    outcome:
      "Receive a measurable readiness score and identify final improvement areas.",
    type: "career",
    milestone: true,
  },
  {
    level: 80,
    title: "Career toolkit",
    label: "CAREER PREPARATION",
    description:
      "Prepare your résumé, LinkedIn profile, portfolio story and professional introduction.",
    outcome:
      "Build the complete toolkit required for applications and professional conversations.",
    type: "career",
    milestone: true,
  },
  {
    level: 90,
    title: "Internship opportunity",
    label: "FINAL REWARD",
    description:
      "Complete the final readiness checkpoint across skills, projects, portfolio and communication.",
    outcome:
      "Become eligible to explore 100+ internship opportunities based on readiness and requirements.",
    type: "internship",
    milestone: true,
  },
];

export const roadmapRows: number[][] = [
  [1, 2, 3, 4, 5],
  [10, 9, 8, 7, 6],
  [15, 20, 30],
  [60, 50, 40],
  [70, 80, 90],
];

export const getCheckpoint = (
  level: number,
): RoadmapCheckpoint => {
  const checkpoint = roadmapCheckpoints.find(
    (item) => item.level === level,
  );

  if (!checkpoint) {
    throw new Error(
      `Roadmap checkpoint ${level} was not found.`,
    );
  }

  return checkpoint;
};
