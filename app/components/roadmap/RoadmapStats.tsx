import { roadmapStats } from "./roadmapData";
import styles from "./RoadmapStats.module.css";

export default function RoadmapStats() {
  return (
    <section
      className={styles.statsSection}
      aria-label="Roadmap statistics"
    >
      <div className={styles.grid}>
        {roadmapStats.map((stat) => (
          <article
            key={stat.title}
            className={styles.statCard}
          >
            {/* Animated metallic border */}
            <div
              className={styles.animatedBorder}
              aria-hidden="true"
            />

            {/* Hover shine */}
            <div
              className={styles.shine}
              aria-hidden="true"
            />

            {/* Bottom-right ambient glow */}
            <div
              className={styles.cardGlow}
              aria-hidden="true"
            />

            {/* Large number */}
            <strong className={styles.number}>
              {stat.value}
            </strong>

            {/* Text */}
            <div className={styles.content}>
              <h2>{stat.title}</h2>

              <p>{stat.description}</p>
            </div>

            {/* Footer */}
            <div
              className={styles.footer}
              aria-hidden="true"
            >
              <span />
              <i />
              <i />
              <i />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}