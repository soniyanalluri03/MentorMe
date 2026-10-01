import {
  BadgeCheck,
  BookOpen,
  Code2,
  Dumbbell,
} from "lucide-react";

import HighlightCard from "@/app/components/courses/ui/highlight-card";

import styles from "./MentorMethod.module.css";

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
    <section
      className={styles.section}
      aria-labelledby="mentor-method-heading"
    >
      {/* =====================================================
          SHARED GLOBAL HEADING
      ===================================================== */}

      <header
        className={`hj-first-five-heading ${styles.methodHeading}`}
      >
        <h2 id="mentor-method-heading">
          Learning becomes powerful
          <br />

          <span className="hj-heading-wave text-4xl xl:text-6xl">
            when progress becomes
          </span>{" "}

          <em className="text-4xl xl:text-6xl">
            proof.
          </em>
        </h2>

        <span>
          Every level moves you through one repeatable
          system. Learn with direction, practice with
          purpose, build real work and prove your progress.
        </span>
      </header>

      {/* =====================================================
          PROCESS LINE
      ===================================================== */}

      <div className={styles.processLine}>
        <span>Learn</span>
        <i aria-hidden="true" />

        <span>Practice</span>
        <i aria-hidden="true" />

        <span>Build</span>
        <i aria-hidden="true" />

        <span>Prove</span>
      </div>

      {/* =====================================================
          METHOD CARDS
      ===================================================== */}

      <div className={styles.grid}>
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