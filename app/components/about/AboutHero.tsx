import { ArrowRight, Sparkles } from "lucide-react";
import { careerStages } from "./aboutData";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <section className={styles.hero} aria-labelledby="about-hero-heading">
      <div className={styles.heroGlow} aria-hidden="true" />

      <div className={styles.content}>
        <header className="hj-first-five-heading ">
          <div className={styles.kicker}>
            {/* <Sparkles size={15} />
            WHY MENTORME EXISTS */}
          </div>

          <h2 id="about-hero-heading">
            Stop scrolling.
            <br />

            <span className="hj-heading-wave text-4xl xl:text-6xl">
              Start building your
            </span>{" "}

            <em className="text-4xl xl:text-6xl">future.</em>
          </h2>

          <span>
            MentorMe turns career uncertainty into a clear path of skills,
            practice, projects and visible progress — so you always know what
            to do next.
          </span>
        </header>

        <div className={styles.careerFlow} aria-label="MentorMe career journey">
          {careerStages.map((stage, index) => (
            <div className={styles.flowItem} key={stage.number}>
              <div
                className={`${styles.stage} ${index === 2 ? styles.stageActive : ""
                  }`}
              >
                <span>{stage.number}</span>
                <strong>{stage.label}</strong>
              </div>

              {index < careerStages.length - 1 && (
                <div
                  className={`${styles.connector} mm-career-connector`}
                  aria-hidden="true"
                >
                  <i />
                  <ArrowRight size={14} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}