import {
  BadgeCheck,
  BookOpen,
  Code2,
  Dumbbell,
  Sparkles,
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
      <div
        className={styles.ambient}
        aria-hidden="true"
      />

      <div className={styles.heading}>
  {/* LEFT HEADING */}

  <div className={styles.headingCopy}>
    <div className={styles.kicker}>
      {/* <Sparkles size={15} />
      MENTOR METHOD */}
    </div>

    <h2 id="mentor-method-heading">
      <span className="hj-main-heading">
        Learning becomes powerful
      </span>

      <span
        className={`${styles.headingLine} ${styles.headingLineSecondary} text-4xl xl:text-6xl`}
      >
        <span className="hj-main-heading hj-heading-wave">
          when progress becomes
        </span>{" "}

        <em className="seen-word">
          proof
        </em>
      </span>
    </h2>
  </div>

  {/* RIGHT SUPPORTING COPY */}

  <div
    className={`${styles.headingAside} hj-first-five-heading`}
  >
    <span>
      Every level moves you through one repeatable
      system. Learn with direction.
      
    </span>
  </div>
</div>
      <div className={styles.processLine}>
        <span>Learn</span>
        <i aria-hidden="true" />

        <span>Practice</span>
        <i aria-hidden="true" />

        <span>Build</span>
        <i aria-hidden="true" />

        <span>Prove</span>
      </div>

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