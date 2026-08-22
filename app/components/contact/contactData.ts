import {
  Building2,
  GraduationCap,
  Handshake,
  MessageCircleMore,
  type LucideIcon,
} from "lucide-react";

export interface ContactType {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const contactTypes: ContactType[] = [
  {
    number: "01",
    title: "Student support",
    description:
      "Questions about your roadmap, levels, projects or learning journey.",
    icon: GraduationCap,
  },
  {
    number: "02",
    title: "College partnership",
    description:
      "Bring structured career-readiness journeys and practical outcomes to students.",
    icon: Building2,
  },
  {
    number: "03",
    title: "Corporate partnership",
    description:
      "Collaborate on internships, talent opportunities and industry-ready pathways.",
    icon: Handshake,
  },
  {
    number: "04",
    title: "General enquiry",
    description:
      "Have something else in mind? Send us a message and we will point you in the right direction.",
    icon: MessageCircleMore,
  },
];