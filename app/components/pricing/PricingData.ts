import type { LucideIcon } from "lucide-react";

import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Crown,
  FileCheck2,
  GraduationCap,
  Layers3,
  MessageSquareMore,
  Route,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

export type BillingCycle =
  | "monthly"
  | "annually";

export type PricingPlanId =
  | "free"
  | "pro"
  | "career"
  | "enterprise";

export interface PricingFeature {
  label: string;
  included: boolean;
  highlight?: boolean;
}

export interface PricingPlan {
  id: PricingPlanId;

  name: string;
  eyebrow: string;
  badge?: string;

  description: string;

  monthlyPrice: number | null;
  annualPrice: number | null;

  annualSaving?: string;
  priceSuffix?: string;

  /* NEW */
  startingFrom?: number;
  comingSoon?: boolean;

  levelAccess: string;

  icon: LucideIcon;

  features: PricingFeature[];

  cta: string;
  href: string;

  featured?: boolean;
  enterprise?: boolean;

  note?: string;
}

export const pricingPlans:
  PricingPlan[] = [
  {
    id: "free",

    name: "Free",
    eyebrow: "START HERE",

    description:
      "Explore your direction, understand the MentorMe journey and start building your foundations.",

    monthlyPrice: 0,
    annualPrice: 0,

    levelAccess:
      "Foundation access",

    icon: Route,

    features: [
      {
        label:
          "Career direction & awareness",
        included: true,
      },
      {
        label:
          "Starter roadmap access",
        included: true,
      },
      {
        label:
          "Foundation learning missions",
        included: true,
      },
      {
        label:
          "Basic skills assessment",
        included: true,
      },
      {
        label:
          "Progress tracking",
        included: true,
      },
      {
        label:
          "Portfolio projects",
        included: false,
      },
      {
        label:
          "Mentor sessions",
        included: false,
      },
      {
        label:
          "Career preparation",
        included: false,
      },
    ],

    cta:
      "Start for free",

    href:
      "/signup",

    note:
      "No card required.",
  },

  {
  id: "pro",

  name: "Pro",
  eyebrow: "BUILD YOUR SKILLS",

  badge: "MOST POPULAR",

  description:
    "Unlock the complete structured MentorMe journey with guided levels, missions, assessments, projects and milestone certificates.",

  monthlyPrice: null,
  annualPrice: null,

  startingFrom: 2000,

  levelAccess:
    "Full 90-level journey",

  icon: Layers3,

  featured: true,

  features: [
    {
      label: "Everything in Free",
      included: true,
    },
    {
      label: "All 90 guided levels",
      included: true,
      highlight: true,
    },
    {
      label: "All missions & assessments",
      included: true,
    },
    {
      label: "12+ real projects",
      included: true,
    },
    {
      label: "9 milestone certificates",
      included: true,
    },
    {
      label: "Portfolio proof building",
      included: true,
    },
    {
      label: "Progress & readiness tracking",
      included: true,
    },
    {
      label: "Live mentor sessions",
      included: false,
    },
  ],

  cta: "Choose Pro",

  href: "/signup?plan=pro",

  note:
    "Starting price may vary depending on the selected career track.",
},

  {
  id: "career",

  name: "Career Accelerator",

  eyebrow: "BECOME CAREER READY",

  badge: "COMING SOON",

  description:
    "Advanced career preparation with mentor guidance, portfolio reviews, interview support and career-readiness assistance.",

  monthlyPrice: null,
  annualPrice: null,

  comingSoon: true,

  levelAccess:
    "Mentor-led career support",

  icon: Crown,

  featured: false,

  features: [
    {
      label: "Everything in Pro",
      included: true,
    },
    {
      label: "Group mentor sessions",
      included: true,
      highlight: true,
    },
    {
      label: "Resume preparation",
      included: true,
    },
    {
      label: "LinkedIn profile support",
      included: true,
    },
    {
      label: "Mock interviews",
      included: true,
    },
    {
      label: "Portfolio review",
      included: true,
    },
    {
      label: "Career readiness reviews",
      included: true,
    },
    {
      label: "Internship readiness support",
      included: true,
      highlight: true,
    },
  ],

  cta: "Coming soon",

  href: "#",

  note:
    "Mentor-led career support is currently being prepared.",
},

  {
    id: "enterprise",

    name: "Enterprise",

    eyebrow:
      "FOR INSTITUTIONS",

    description:
      "Bring structured career journeys to colleges, training institutes and learner cohorts.",

    monthlyPrice: null,
    annualPrice: null,

    priceSuffix:
      "Custom pricing",

    levelAccess:
      "Multi-user & cohort access",

    icon: Building2,

    enterprise: true,

    features: [
      {
        label:
          "Everything in Career Accelerator",
        included: true,
      },
      {
        label:
          "Bulk learner access",
        included: true,
      },
      {
        label:
          "Cohort management",
        included: true,
      },
      {
        label:
          "Learner progress dashboard",
        included: true,
      },
      {
        label:
          "Readiness insights",
        included: true,
      },
      {
        label:
          "Custom onboarding",
        included: true,
      },
      {
        label:
          "Institution-level reporting",
        included: true,
      },
      {
        label:
          "Dedicated support",
        included: true,
      },
    ],

    cta:
      "Talk to our team",

    href:
      "/contact",

    note:
      "Designed for teams and institutions.",
  },
];

export interface PricingBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const pricingBenefits:
  PricingBenefit[] = [
  {
    title:
      "Structured progression",

    description:
      "Move through one connected journey instead of jumping between unrelated courses.",

    icon: Route,
  },

  {
    title:
      "Proof over completion",

    description:
      "Projects, assessments and milestone certificates create visible evidence of your progress.",

    icon: BadgeCheck,
  },

  {
    title:
      "Career preparation",

    description:
      "Higher plans connect learning with resumes, portfolios, interviews and internship readiness.",

    icon: BriefcaseBusiness,
  },
];

export interface PricingFAQ {
  question: string;
  answer: string;
}

export const pricingFAQs:
  PricingFAQ[] = [
  {
    question:
      "Can I start MentorMe without paying?",

    answer:
      "Yes. The Free plan is designed to help you explore your direction and start the foundation journey before choosing a paid plan.",
  },

  {
    question:
      "What is the difference between Pro and Career Accelerator?",

    answer:
      "Pro focuses on the complete self-paced MentorMe journey, including levels, missions, projects and certificates. Career Accelerator includes everything in Pro plus mentor sessions, resume and LinkedIn support, mock interviews, portfolio review and additional career-readiness support.",
  },

  {
    question:
      "Can I switch between monthly and annual billing?",

    answer:
      "Yes. Monthly billing gives you more flexibility, while annual billing offers a lower effective monthly cost. Your progress remains tied to your MentorMe account.",
  },

  {
    question:
      "What happens to my progress if I cancel?",

    answer:
      "Your completed progress and earned milestones remain preserved. Access to paid-only learning content may depend on your active subscription.",
  },

  {
    question:
      "Does paying for a plan guarantee an internship?",

    answer:
      "No. Completing the journey can make you eligible to explore internship opportunities based on readiness and applicable requirements, but it does not guarantee placement or selection.",
  },

  {
    question:
      "Who is the Enterprise plan for?",

    answer:
      "Enterprise is intended for colleges, training institutes and organizations that want to provide MentorMe journeys to multiple learners while tracking cohort progress and readiness.",
  },

  {
    question:
      "Can I upgrade from Free to Pro later?",

    answer:
      "Yes. You can begin on Free and upgrade when you are ready without restarting your journey.",
  },

  {
    question:
      "Are annual plans paid monthly?",

    answer:
      "No. The annual amount is billed for the full year. The annual option is discounted compared with paying the monthly rate for twelve months.",
  },
];