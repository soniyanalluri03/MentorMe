export const processSteps = [

  {

    number: "01",

    title: "Confusion",

    icon: "?",

    headline: "Name the uncertainty",

    description:

      "Start by identifying what feels unclear, what you enjoy, and what kind of future you want to build.",

  },

  {

    number: "02",

    title: "Direction",

    icon: "⌖",

    headline: "Choose a clear destination",

    description:

      "Select a career direction that fits your strengths, interests, and long-term ambition.",

  },

  {

    number: "03",

    title: "Learning",

    icon: "◇",

    headline: "Build the right skills",

    description:

      "Follow a structured sequence of concepts and guided missions instead of jumping between random resources.",

  },

  {

    number: "04",

    title: "Practice",

    icon: "</>",

    headline: "Turn knowledge into ability",

    description:

      "Apply every skill through focused challenges that make learning practical, repeatable, and measurable.",

  },

  {

    number: "05",

    title: "Projects",

    icon: "▣",

    headline: "Create work that proves it",

    description:

      "Build portfolio-ready projects that show what you can do, not only what you have completed.",

  },

  {

    number: "06",

    title: "Proof",

    icon: "✓",

    headline: "Make progress visible",

    description:

      "Collect projects, milestones, certificates, and outcomes that make your growth easy to understand.",

  },

  {

    number: "07",

    title: "Confidence",

    icon: "★",

    headline: "Move forward with confidence",

    description:

      "Reach opportunities with a clear story, demonstrated ability, and evidence that you are ready.",

  },

];



export const firstFiveLevels = [

  {

    number: "01",

    title: "Fundamentals",

    short: "Learn the core concepts",

    description:

      "Build a strong foundation with the essential concepts required for your chosen career path.",

    icon: "</>",

  },

  {

    number: "02",

    title: "Guided Mission",

    short: "Apply it step by step",

    description:

      "Complete a guided practical mission that helps you use what you learned with clear support.",

    icon: "◆",

  },

  {

    number: "03",

    title: "Skill Test",

    short: "Check your understanding",

    description:

      "Take a focused skill test that confirms your understanding before moving to the next stage.",

    icon: "✓",

  },

  {

    number: "04",

    title: "Mentor Review",

    short: "Get feedback and improve",

    description:

      "Receive structured mentor feedback, correct mistakes, and strengthen the way you approach the skill.",

    icon: "◎",

  },

  {

    number: "05",

    title: "First Project",

    short: "Create your first proof",

    description:

      "Build a practical mini project that becomes your first visible piece of career-ready proof.",

    icon: "★",

  },

];

export type ProcessStep = (typeof processSteps)[number];
export type FirstFiveLevel = (typeof firstFiveLevels)[number];
