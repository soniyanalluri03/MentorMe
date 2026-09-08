import {
  BadgeCheck,
  BookOpen,
  Code2,
  Compass,
  Target,
} from "lucide-react";

import styles from "./AboutOverview.module.css";

const skills = [
  { label: "Learn", icon: BookOpen },
  { label: "Practice", icon: Target },
  { label: "Projects", icon: Code2 },
  { label: "Direction", icon: Compass },
  { label: "Proof", icon: BadgeCheck },
];

export default function AboutOverview() {
  return (
    <section
      className={styles.section}
      aria-labelledby="about-overview-heading"
    >
      <div className={styles.layout}>
        {/* =====================================================
            COPY / SHARED GLOBAL HEADING
        ===================================================== */}

        <div className={styles.copy}>
          <header className="hj-first-five-heading">
            <h2 id="about-overview-heading">
              A career journey
              <br />

              <span className="hj-heading-wave text-4xl xl:text-6xl">
                with a next
              </span>{" "}

              <em className="text-4xl xl:text-6xl">
                step.
              </em>
            </h2>

            <span>
              There is already enough content on the internet.
              MentorMe helps you focus on what actually matters
              by connecting direction, learning, practice,
              projects and proof into one guided journey.
            </span>
          </header>
        </div>

        {/* =====================================================
            SKILLS VISUAL
        ===================================================== */}

        <div
          className={styles.skillsVisual}
          aria-label="MentorMe learning system"
        >
          <div
            className={`${styles.orbit} ${styles.orbitOuter}`}
            aria-hidden="true"
          />

          <div
            className={`${styles.orbit} ${styles.orbitMiddle}`}
            aria-hidden="true"
          />

          <div className={styles.core}>
            <small>YOUR</small>
            <strong>SKILLS</strong>
            <em>grow here</em>
          </div>

          {skills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <div
                className={`${styles.skillChip} ${
                  styles[`skill${index + 1}`]
                }`}
                key={skill.label}
              >
                <Icon size={15} />
                {skill.label}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}