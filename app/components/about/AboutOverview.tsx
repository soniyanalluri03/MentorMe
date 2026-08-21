import {
  BadgeCheck,
  BookOpen,
  Code2,
  Compass,
  Sparkles,
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
    <section className={styles.section} aria-labelledby="about-overview-heading">
      <div className={styles.layout}>
        <div className={styles.copy}>
          <div className={styles.kicker}>
            {/* <Sparkles size={15} />
            ONE GUIDED JOURNEY */}
          </div>

          <h2 id="about-overview-heading">
            <span className="hj-main-heading">A career journey</span>

            <span className={`${styles.secondaryLine} text-4xl xl:text-6xl`}>
              <span className="hj-main-heading hj-heading-wave">with a next</span>{" "}
              <em className="seen-word">step.</em>
            </span>
          </h2>

          <p className={styles.description}>
            There is already enough content on the internet. MentorMe helps you
            focus on what actually matters by connecting direction, learning,
            practice, projects and proof into one guided journey.
          </p>
        </div>

        <div className={styles.skillsVisual} aria-label="MentorMe learning system">
          <div className={`${styles.orbit} ${styles.orbitOuter}`} aria-hidden="true" />
          <div className={`${styles.orbit} ${styles.orbitMiddle}`} aria-hidden="true" />

          <div className={styles.core}>
            <small>YOUR</small>
            <strong>SKILLS</strong>
            <em>grow here</em>
          </div>

          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div className={`${styles.skillChip} ${styles[`skill${index + 1}`]}`} key={skill.label}>
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