import {
  BadgeCheck,
  BookOpen,
  Code2,
  Dumbbell,
} from "lucide-react";

import HighlightCard from "@/app/components/courses/ui/highlight-card";

const steps = [
  {
    number: "01",
    title: "Learn",
    text:
      "Understand the right concept at the right time through focused lessons and guided examples.",
    icon: BookOpen,
  },
  {
    number: "02",
    title: "Practice",
    text:
      "Convert every concept into action through missions, challenges and deliberate repetition.",
    icon: Dumbbell,
  },
  {
    number: "03",
    title: "Build",
    text:
      "Create production-style work that proves you can apply skills beyond tutorials.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Prove",
    text:
      "Earn verified outcomes through assessments, projects and a career-ready portfolio.",
    icon: BadgeCheck,
  },
];

export default function MentorMethod() {
  return (
    <section className="method section-shell">
      <div className="section-heading">
        <div>
          <div className="section-kicker">
            THE MENTORME METHOD
          </div>

          <h2>
            Learning becomes powerful when{" "}
            <span>progress becomes proof.</span>
          </h2>
        </div>

        <p>
          Every level moves you through one repeatable system. Learn
          with direction, practise immediately, build something real
          and prove the result before moving forward.
        </p>
      </div>

      <div className="method-grid">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <HighlightCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={[step.text]}
              icon={
                <Icon
                  size={29}
                  strokeWidth={1.7}
                />
              }
            />
          );
        })}
      </div>
    </section>
  );
}