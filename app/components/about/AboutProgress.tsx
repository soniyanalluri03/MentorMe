import { ArrowRight, Droplets, Sparkles, TrendingUp } from "lucide-react";
import styles from "./AboutProgress.module.css";

export default function AboutProgress() {
  return (
    <section className={styles.section} aria-labelledby="about-progress-heading">
      <div className={styles.content}>
        <header className={styles.heading}>
          <div className={styles.kicker}>
            {/* <Sparkles size={15} />
            PROGRESS THAT COMPOUNDS */}
          </div>

          <h2 id="about-progress-heading">
            <span className="hj-main-heading">Small steps</span>
            <span className={`${styles.secondaryLine} text-4xl xl:text-6xl`}>
              <span className="hj-main-heading hj-heading-wave">create real</span>{" "}
              <em className="seen-word">momentum.</em>
            </span>
          </h2>

          <p>
            Careers are not built in one giant leap. Progress happens when one
            useful action is repeated until knowledge becomes skill, skill
            becomes proof and proof becomes confidence.
          </p>
        </header>

        <div className={styles.progressGrid}>
          <article className={styles.progressCard}>
            <div className={styles.cardIcon}><Droplets size={25} /></div>
            <small>START SMALL</small>
            <h3>One useful action today.</h3>

            <div className={styles.jarScene}>
              <div className={styles.drop} />
              <div className={styles.jar}>
                <i />
                <strong>1%</strong>
              </div>
            </div>

            <p>Small enough to start.</p>
          </article>

          <div className={styles.bridge} aria-hidden="true">
            <span />
            <ArrowRight size={20} />
          </div>

          <article className={`${styles.progressCard} ${styles.progressCardStrong}`}>
            <div className={styles.cardIcon}><TrendingUp size={25} /></div>
            <small>KEEP GOING</small>
            <h3>Let useful work compound.</h3>

            <div className={styles.momentumVisual}>
              <div className={styles.bar}><i /></div>
              <div className={styles.bar}><i /></div>
              <div className={styles.bar}><i /></div>
              <div className={styles.bar}><i /></div>
              <div className={styles.bar}><i /></div>
            </div>

            <strong className={styles.momentumWord}>Momentum</strong>
            <p>Small actions become visible progress.</p>
          </article>
        </div>
      </div>
    </section>
  );
}