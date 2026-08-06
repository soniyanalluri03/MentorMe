"use client";

import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CircleX,
  Code2,
  FolderCheck,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import styles from "./CourseComparison.module.css";

const traditionalPoints = [
  "Unclear learning sequence",
  "Progress measured by watch time",
  "Little practical accountability",
  "Certificates without enough evidence",
];

const mentorMePoints = [
  "One structured level at a time",
  "Practice after every important concept",
  "Projects that demonstrate capability",
  "A portfolio that grows with your progress",
];

const traditionalFlow = [
  "Watch",
  "Watch more",
  "Certificate",
];

const mentorFlow = [
  {
    label: "Learn",
    icon: BookOpen,
  },
  {
    label: "Practice",
    icon: Target,
  },
  {
    label: "Build",
    icon: Code2,
  },
  {
    label: "Prove",
    icon: Trophy,
  },
];

export default function CourseComparison() {
  return (
    <section
      className={styles.section}
      aria-labelledby="course-comparison-heading"
    >
      <div
        className={styles.ambientOne}
        aria-hidden="true"
      />

      <div
        className={styles.ambientTwo}
        aria-hidden="true"
      />

      <header className={styles.heading}>
        <div>
          <div className={styles.kicker}>
            <Sparkles size={15} />
            A different learning experience
          </div>

          <h2 id="course-comparison-heading">
            <span
              className={`${styles.headingLine} ${styles.headingLinePrimary}`}
            >
              Content gives information.
            </span>
            <span
              className={`${styles.headingLine} ${styles.headingLineSecondary}`}
            >
              <span className={styles.headingWave}>
                MentorMe creates </span>{" "}
              <em className={styles.proofWord}>
                momentum
              </em>
            </span>
          </h2>
        </div>

        <p>
          Compare passive course consumption with a
          guided system built around practice, projects
          and visible career proof
        </p>
      </header>

      <div className={styles.comparisonGrid}>
        <article className={styles.traditionalCard}>
          <div
            className={styles.traditionalNoise}
            aria-hidden="true"
          />

          <div className={styles.cardHeader}>
            <div>
              <span className={styles.traditionalEyebrow}>
                Traditional course platform
              </span>

              <h3>Content library</h3>
            </div>

            <div className={styles.traditionalIcon}>
              <CircleX size={22} />
            </div>
          </div>

          <blockquote>
            “What video should I watch next?”
          </blockquote>

          <div className={styles.traditionalFlow}>
            {traditionalFlow.map((step, index) => (
              <div key={step}>
                <span>{step}</span>

                {index <
                  traditionalFlow.length - 1 && (
                    <ArrowRight size={15} />
                  )}
              </div>
            ))}
          </div>

          <div className={styles.traditionalMeter}>
            <div>
              <span>Measured by</span>
              <strong>Watch time</strong>
            </div>

            <div className={styles.traditionalTrack}>
              <i />
            </div>
          </div>

          <ul className={styles.pointList}>
            {traditionalPoints.map((point) => (
              <li key={point}>
                <span className={styles.oldMark}>
                  —
                </span>

                {point}
              </li>
            ))}
          </ul>

          <div
            className={styles.brokenPath}
            aria-hidden="true"
          >
            <i />
            <i />
            <i />
          </div>
        </article>

        <div className={styles.vsColumn}>
          <div className={styles.vsLine} />

          <div className={styles.vsBadge}>
            <span>VS</span>
          </div>


        </div>

        <article className={styles.mentorCard}>
          <div
            className={styles.animatedBorder}
            aria-hidden="true"
          />

          <div
            className={styles.mentorShine}
            aria-hidden="true"
          />

          <div
            className={styles.mentorOrbit}
            aria-hidden="true"
          >
            <i />
            <i />
            <i />
          </div>

          <div className={styles.cardHeader}>
            <div>
              <span className={styles.mentorEyebrow}>
                MentorMe career system
              </span>

              <h3>Outcome engine</h3>
            </div>

            <div className={styles.mentorIcon}>
              <BadgeCheck size={23} />
            </div>
          </div>

          <blockquote>
            “What outcome should I complete next?”
          </blockquote>

          <div className={styles.mentorFlow}>
            {mentorFlow.map((step, index) => {
              const StepIcon = step.icon;

              return (
                <div key={step.label}>
                  <span>
                    <StepIcon
                      size={14}
                      strokeWidth={1.8}
                    />

                    {step.label}
                  </span>

                  {index <
                    mentorFlow.length - 1 && (
                      <ArrowRight size={15} />
                    )}
                </div>
              );
            })}
          </div>

          <div className={styles.proofPanel}>
            <div className={styles.proofTop}>
              <div>
                <FolderCheck size={18} />

                <span>Portfolio progress</span>
              </div>

              <strong>Verified</strong>
            </div>

            <div className={styles.proofTrack}>
              <i />
            </div>

            <div className={styles.proofStats}>
              <span>
                <b>18</b>
                Levels
              </span>

              <span>
                <b>06</b>
                Missions
              </span>

              <span>
                <b>03</b>
                Projects
              </span>
            </div>
          </div>

          <ul className={styles.pointList}>
            {mentorMePoints.map((point) => (
              <li key={point}>
                <BadgeCheck
                  size={17}
                  className={styles.checkIcon}
                />

                {point}
              </li>
            ))}
          </ul>

          <div className={styles.outcomeBadge}>
            <Trophy size={17} />

            <span>
              Career proof grows with every level
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}