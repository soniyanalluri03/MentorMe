import Link from "next/link";
import styles from "./RoadmapHero.module.css";
import { CosmicLink } from "./RoadmapUI";
import { Sparkles } from "lucide-react";

export default function RoadmapHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="roadmap-hero-heading"
    >
      <div
        className={styles.heroGrid}
        aria-hidden="true"
      />

      <div className={styles.heroContent}>

        <header className="hj-first-five-heading pt-10">
          <div className={styles.kicker}>
            <Sparkles size={15} />
            THE MENTORME 90-LEVEL JOURNEY
          </div>
          <h2>
            Every next step.
            <br />

            <span className="hj-heading-wave">
              Already
            </span>{" "}

            <em>mapped.</em>
          </h2>
          <span>
            Explore the complete journey from career
            discovery to practical projects,
            professional certificates, portfolio
            building and internship readiness.
          </span>
        </header>

        <div
          className={styles.heroPills}
          aria-label="Roadmap highlights"
        >
          <span>LEVELS 1–10 FREE</span>
          <span>FULL 90-LEVEL PREVIEW</span>
          <span>100+ OPPORTUNITIES</span>
        </div>

        <div className={styles.heroActions}>

          <Link href="#journey-map" className="navbar-sign-in">Explore the roadmap</Link>
          <Link
            className="mh-button mh-button--secondary"
            href="/courses"
          >
            Choose a career track
            <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}