import Link from "next/link";

import styles from "./RoadmapFinalSection.module.css";

import {
  CheckpointIcon,
} from "./RoadmapUI";

export default function RoadmapFinalSection() {
  return (
    <section className={styles.finalSection}>
      <article className={styles.finalCard}>
        {/* Decorative grid inside final card */}
        <div
          className={styles.finalGrid}
          aria-hidden="true"
        />

        {/* Decorative orbit */}
        <div
          className={styles.finalOrbit}
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </div>

        <div className={styles.finalContent}>
          {/* =====================================================
              FINAL REWARD ICON
          ===================================================== */}

          <div className={styles.finalIcon}>
            <CheckpointIcon type="internship" />
          </div>

          {/* =====================================================
              SHARED GLOBAL HEADING
          ===================================================== */}

          <header className="hj-first-five-heading">
            <h2>
              Career ready
              <br />

              <span className="hj-heading-wave text-4xl xl:text-6xl">
                Opportunity
              </span>{" "}

              <em className="text-4xl xl:text-6xl">
                unlocked
              </em>
            </h2>

            <span>
              Complete the full journey with practical skills,
              real projects, milestone certificates, portfolio
              proof and career preparation.
            </span>
          </header>

          {/* =====================================================
              SHARED GLOBAL PILLS
          ===================================================== */}

          <div
            className="hj-highlight-pills"
            aria-label="Career readiness highlights"
          >
            <span className="hj-highlight-pill hj-highlight-pill--purple">
              PORTFOLIO READY
            </span>

            <span className="hj-highlight-pill hj-highlight-pill--blue">
              INTERVIEW READY
            </span>

            <span className="hj-highlight-pill hj-highlight-pill--gold">
              INTERNSHIP ELIGIBLE
            </span>
          </div>

          {/* =====================================================
              SHARED GLOBAL ACTION
          ===================================================== */}

          <div className="hj-action-row">
            <Link
              href="/signup"
              className="navbar-sign-in"
            >
              Begin at Level 01
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}