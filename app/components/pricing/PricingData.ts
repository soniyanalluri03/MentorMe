import type {
  LucideIcon,
} from "lucide-react";

import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Crown,
  Layers3,
  Route,
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

  monthlyPrice:
    number | null;

  annualPrice:
    number | null;

  priceSuffix?: string;

  startingFrom?: number;

  comingSoon?: boolean;

  levelAccess: string;

  icon: LucideIcon;

  features:
    PricingFeature[];

  cta: string;

  href: string;

  featured?: boolean;

  enterprise?: boolean;

  note?: string;
}


/* =========================================================
   PRICING PLANS
   ========================================================= */

export const pricingPlans:
  PricingPlan[] = [
  {
    id: "free",

    name: "Free",

    eyebrow:
      "START HERE",

    description:
      "Explore MentorMe, find your direction and start building strong foundations.",

    monthlyPrice: 0,

    annualPrice: 0,

    levelAccess:
      "Foundation access",

    icon: Route,

    features: [
      {
        label:
          "Career direction",
        included: true,
      },
      {
        label:
          "Starter roadmap",
        included: true,
      },
      {
        label:
          "Foundation missions",
        included: true,
      },
      {
        label:
          "Basic assessment",
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
          "Access to all 90 levels",
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

    eyebrow:
      "BUILD YOUR SKILLS",

    badge:
      "MOST POPULAR",

    description:
      "Unlock the full structured journey with guided levels, projects and milestone certificates.",

    monthlyPrice:
      null,

    annualPrice:
      null,

    startingFrom:
      2000,

    levelAccess:
      "Full 90-level journey",

    icon:
      Layers3,

    featured:
      true,

    features: [
      {
        label:
          "Everything in Free",
        included: true,
      },
      {
        label:
          "All 90 guided levels",
        included: true,
        highlight: true,
      },
      {
        label:
          "Missions & assessments",
        included: true,
      },
      {
        label:
          "12+ real projects",
        included: true,
      },
      {
        label:
          "9 milestone certificates",
        included: true,
      },
      {
        label:
          "Portfolio proof building",
        included: true,
      },
      {
        label:
          "Live career guide sessions",
        included: false,
      },
    ],

    cta:
      "Choose Pro",

    href:
      "/signup?plan=pro",

    note:
      "Price varies by career track.",
  },

  {
    id: "career",

    name:
      "Career Accelerator",

    eyebrow:
      "BECOME CAREER READY",

    badge:
      "COMING SOON",

    description:
      "Advanced career preparation with mentor guidance, reviews and interview support.",

    monthlyPrice:
      null,

    annualPrice:
      null,

    comingSoon:
      true,

    levelAccess:
      "Mentor-led support",

    icon:
      Crown,

    features: [
      {
        label:
          "Everything in Pro",
        included: true,
      },
      {
        label:
          "Group mentor sessions",
        included: true,
        highlight: true,
      },
      {
        label:
          "Resume & LinkedIn support",
        included: true,
      },
      {
        label:
          "Mock interviews",
        included: true,
      },
      {
        label:
          "Portfolio review",
        included: true,
      },
      {
        label:
          "Internship readiness",
        included: true,
      },
    ],

    cta:
      "Coming soon",

    href:
      "#",
  },

  {
    id: "enterprise",

    name:
      "Enterprise",

    eyebrow:
      "FOR INSTITUTIONS",

    description:
      "Structured MentorMe journeys for colleges, institutes and learner cohorts.",

    monthlyPrice:
      null,

    annualPrice:
      null,

    priceSuffix:
      "For institutions",

    levelAccess:
      "Cohort access",

    icon:
      Building2,

    enterprise:
      true,

    features: [
      {
        label:
          "Career Accelerator access",
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
          "Progress dashboard",
        included: true,
      },
      {
        label:
          "Institution reporting",
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
      "For teams and institutions.",
  },
];


/* =========================================================
   BENEFITS
   ========================================================= */

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
      "Follow one connected journey instead of jumping between unrelated courses.",

    icon:
      Route,
  },

  {
    title:
      "Proof over completion",

    description:
      "Build visible proof through projects, assessments and milestones.",

    icon:
      BadgeCheck,
  },

  {
    title:
      "Career preparation",

    description:
      "Connect learning with portfolios, interviews and career readiness.",

    icon:
      BriefcaseBusiness,
  },
];


/* =========================================================
   FAQ
   ========================================================= */

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
      "Yes. The Free plan lets you explore your direction and begin the foundation journey before choosing a paid plan.",
  },

  {
    question:
      "What is the difference between Pro and Career Accelerator?",

    answer:
      "Pro provides the complete structured learning journey. Career Accelerator adds mentor guidance, portfolio reviews, interview preparation and career-readiness support.",
  },

  {
    question:
      "What happens to my progress if I change plans?",

    answer:
      "Your completed progress, milestones and certificates remain connected to your MentorMe account.",
  },

  {
    question:
      "Does a paid plan guarantee an internship?",

    answer:
      "No. MentorMe helps you build readiness and proof of skills, but internship selection depends on eligibility and the hiring organization.",
  },
  {
    question:
      "What happens to my progress if I cancel?",

    answer:
      "Your completed progress and earned milestones remain preserved. Access to paid-only learning content may depend on your active subscription.",
  },

  {
    question:
      "Who is Enterprise for?",

    answer:
      "Enterprise is designed for colleges, training institutes and organizations managing multiple learners.",
  },

  {
    question:
      "Can I upgrade from Free to Pro later?",

    answer:
      "Yes. You can start with Free and upgrade later without restarting your journey.",
  },
];