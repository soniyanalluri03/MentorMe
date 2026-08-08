import styles from "./RoadmapHero.module.css";
import { CosmicLink } from "./RoadmapUI";

export default function RoadmapHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroGrid} aria-hidden="true" />

      <div className={styles.heroContent}>
        <span className={styles.heroEyebrow}>
          <i />
          THE MENTORME 90-LEVEL JOURNEY
          <i />
        </span>

        <h1>
          Every next step.
          <em>Already mapped.</em>
        </h1>

        <p>
          Explore the complete journey from career discovery
          to practical projects, professional certificates,
          portfolio building and internship readiness.
        </p>

        <div className={styles.heroPills}>
          <span>LEVELS 1–10 FREE</span>
          <span>FULL 90-LEVEL PREVIEW</span>
          <span>100+ OPPORTUNITIES</span>
        </div>

        <div className={styles.heroActions}>
          <CosmicLink href="#journey-map" arrow="↓">
            Explore the roadmap
          </CosmicLink>

          <CosmicLink href="/courses" arrow="→" secondary>
            Choose a career track
          </CosmicLink>
        </div>
      </div>
    </section>
  );
}
