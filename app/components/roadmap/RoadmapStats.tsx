import styles from "./RoadmapStats.module.css";
import { roadmapStats } from "./roadmapData";
import { TiltSurface } from "./RoadmapUI";

export default function RoadmapStats() {
  return (
    <section className={styles.statsSection}>
      {roadmapStats.map((stat, index) => (
        <TiltSurface
          key={stat.title}
          className={styles.statCard}
          delay={index * 0.55}
        >
          <strong>{stat.value}</strong>

          <div>
            <h2>{stat.title}</h2>
            <p>{stat.description}</p>
          </div>

          <span>↗</span>
        </TiltSurface>
      ))}
    </section>
  );
}
