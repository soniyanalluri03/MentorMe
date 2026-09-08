import Link from "next/link";
import styles from "./RoadmapHero.module.css";

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
        {/* =====================================================
            SHARED GLOBAL HEADING
        ===================================================== */}

        <header className="hj-first-five-heading">
          <h2 id="roadmap-hero-heading">
            Every next step.
            <br />

            <span className="hj-heading-wave text-4xl xl:text-6xl">
              Already
            </span>{" "}

            <em className="text-4xl xl:text-6xl">
              mapped.
            </em>
          </h2>

          <span>
            Explore the complete journey from career
            discovery to practical projects,
            professional certificates, portfolio
            building and internship readiness.
          </span>
        </header>


        {/* =====================================================
            SHARED GLOBAL PILLS
        ===================================================== */}

        <div
          className="hj-highlight-pills"
          aria-label="Roadmap highlights"
        >
          <span className="hj-highlight-pill hj-highlight-pill--gold">
            LEVELS 1–10 FREE
          </span>

          <span className="hj-highlight-pill hj-highlight-pill--purple">
            FULL 90-LEVEL PREVIEW
          </span>

          <span className="hj-highlight-pill hj-highlight-pill--blue">
            100+ OPPORTUNITIES
          </span>
        </div>


        {/* =====================================================
            SHARED GLOBAL ACTION BUTTONS
        ===================================================== */}

        <div className="hj-action-row">
          <Link
            href="#journey-map"
            className="navbar-sign-in"
          >
            Explore the roadmap
          </Link>

          <Link
            href="/courses"
            className="mh-button mh-button--secondary"
          >
            Choose a career track
            <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}