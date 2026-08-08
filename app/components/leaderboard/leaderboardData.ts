export interface LeaderboardStudent {
  rank: number;
  name: string;
  initials: string;
  track: string;
  xp: number;
  level: number;
  streak: number;
  stage: string;
  unlock: string;
  badge: string;
  badgeDescription: string;
  isCurrentUser?: boolean;
}

const getStage = (level: number) => {
  if (level <= 10) return "Foundation";
  if (level <= 20) return "Guided Learning";
  if (level <= 30) return "Practice";
  if (level <= 40) return "Code Challenges";
  if (level <= 50) return "Project Stage";
  if (level <= 60) return "Mentor Review";
  if (level <= 70) return "Portfolio Proof";
  if (level <= 80) return "Career Preparation";
  if (level <= 89) return "Internship Readiness";

  return "Journey Complete";
};

const getUnlock = (level: number) => {
  if (level <= 10) return "Learning missions unlocked";
  if (level <= 20) return "Guided practice unlocked";
  if (level <= 30) return "Skill assessments unlocked";
  if (level <= 40) return "Code challenges unlocked";
  if (level <= 50) return "Real project unlocked";
  if (level <= 60) return "Mentor review unlocked";
  if (level <= 70) return "Portfolio proof unlocked";
  if (level <= 80) return "Career toolkit unlocked";
  if (level <= 89) return "Internship opportunities unlocked";

  return "90-level journey completed";
};

const getBadge = (level: number) => {
  if (level <= 10) return "Starter Spark";
  if (level <= 20) return "Step Star";
  if (level <= 30) return "Practice Pro";
  if (level <= 40) return "Code Challenger";
  if (level <= 50) return "Project Builder";
  if (level <= 60) return "Mentor Ready";
  if (level <= 70) return "Proof Maker";
  if (level <= 80) return "Career Climber";
  if (level <= 89) return "Opportunity Ready";

  return "Journey Champion";
};

const firstNames = [
  "Aarav",
  "Ishita",
  "Rohan",
  "Sneha",
  "Arjun",
  "Priya",
  "Kiran",
  "Neha",
  "Aditya",
  "Nisha",
  "Varun",
  "Aditi",
  "Riya",
  "Sahil",
  "Anjali",
  "Vikram",
  "Divya",
  "Karthik",
  "Pooja",
  "Nikhil",
  "Megha",
  "Harsha",
  "Keerthi",
  "Akash",
];

const lastNames = [
  "Reddy",
  "Sharma",
  "Patel",
  "Rao",
  "Nair",
  "Iyer",
  "Das",
  "Menon",
  "Singh",
  "Verma",
  "Gupta",
  "Kumar",
];

const tracks = [
  "Frontend Developer",
  "Backend Developer",
  "UI / UX Designer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Python Developer",
];

const generatedStudents: LeaderboardStudent[] = Array.from(
  { length: 96 },
  (_, index) => {
    const rank = index + 5;

    /*
      Weekly XP controls leaderboard position.
      Level represents overall MentorMe journey progress.
      Therefore a lower weekly rank can still be at a higher journey level.
    */
    const level = ((rank * 19 + 11) % 90) + 1;

    const firstName =
      firstNames[(rank * 3) % firstNames.length];

    const lastName =
      lastNames[(rank * 5) % lastNames.length];

    const name = `${firstName} ${lastName}`;

    const initials =
      `${firstName[0]}${lastName[0]}`.toUpperCase();

    const stage = getStage(level);
    const unlock = getUnlock(level);
    const badge = getBadge(level);

    return {
      rank,
      name,
      initials,
      track: tracks[rank % tracks.length],
      xp: Math.max(520, 2380 - (rank - 5) * 18),
      level,
      streak: ((rank * 7) % 28) + 2,
      stage,
      unlock,
      badge,
      badgeDescription: `${unlock} through consistent progress at Level ${level}.`,
    };
  },
);

export const leaderboardStudents: LeaderboardStudent[] = [
  {
    rank: 1,
    name: "Ananya Rao",
    initials: "AR",
    track: "Frontend Developer",
    xp: 8920,
    level: 42,
    streak: 21,
    stage: getStage(42),
    unlock: getUnlock(42),
    badge: "Momentum Master",
    badgeDescription:
      "Leading the week through consistent missions, practice and project XP.",
  },
  {
    rank: 2,
    name: "Kabir Shah",
    initials: "KS",
    track: "Frontend Developer",
    xp: 8640,
    level: 39,
    streak: 18,
    stage: getStage(39),
    unlock: getUnlock(39),
    badge: "Mission Machine",
    badgeDescription:
      "Consistent learning and code challenges are creating visible momentum.",
  },
  {
    rank: 3,
    name: "Meera Nair",
    initials: "MN",
    track: "Frontend Developer",
    xp: 8410,
    level: 37,
    streak: 16,
    stage: getStage(37),
    unlock: getUnlock(37),
    badge: "Proof Builder",
    badgeDescription:
      "Turning structured learning into practical proof every week.",
  },
  {
    rank: 4,
    name: "Rahul Sharma",
    initials: "RS",
    track: "Frontend Developer",
    xp: 2450,
    level: 18,
    streak: 9,
    stage: getStage(18),
    unlock: getUnlock(18),
    badge: "Step Star",
    badgeDescription:
      "A strong week of guided learning and consistent progress.",
    isCurrentUser: true,
  },
  ...generatedStudents,
];

export const podiumStudents = [
  leaderboardStudents[1],
  leaderboardStudents[0],
  leaderboardStudents[2],
];

export const rankingStudents =
  leaderboardStudents.slice(3);

export const currentStudent =
  leaderboardStudents.find(
    (student) => student.isCurrentUser,
  ) ?? leaderboardStudents[3];