import styles from "./RoadmapFinalSection.module.css";
import {
  CheckpointIcon,
  CosmicLink,
} from "./RoadmapUI";

export default function RoadmapFinalSection() {
  return (
    <section className={styles.finalSection}>
      <article className={styles.finalCard}>
        <div className={styles.finalGrid} aria-hidden="true" />

        <div className={styles.finalOrbit} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className={styles.finalContent}>
          <div className={styles.finalIcon}>
            <CheckpointIcon type="internship" />
          </div>

          <span className={styles.finalEyebrow}>
            LEVEL 90 COMPLETED
          </span>

          <h2>
            Career ready.
            <em>Opportunity unlocked.</em>
          </h2>

          <p>
            Complete the full journey with practical skills,
            real projects, milestone certificates, portfolio
            proof and career preparation.
          </p>

          <div className={styles.finalPills}>
            <span>PORTFOLIO READY</span>
            <span>INTERVIEW READY</span>
            <span>INTERNSHIP ELIGIBLE</span>
          </div>

          <CosmicLink
            href="/signup"
            arrow="→"
            className={styles.finalButton}
          >
            Begin at Level 01
          </CosmicLink>
        </div>
      </article>
    </section>
  );
}
