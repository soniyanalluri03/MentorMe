import { Sparkles } from "lucide-react";
import styles from "./RoadmapFinalSection.module.css";
import {
  CheckpointIcon,
  CosmicLink,
} from "./RoadmapUI";
import Link from "next/link";
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
          <header className="hj-first-five-heading ">
            <div className={styles.kicker}>
            {/* <Sparkles size={15} />
            LEVEL 90 COMPLETED */}
          </div>
        
            <h2>
              Career ready
              <br />

              <span className="hj-heading-wave text-4xl xl:text-6xl">
                Opportunity
              </span>{" "}

              <em className="text-4xl xl:text-6xl">unlocked</em>
            </h2>
            <span>
              Complete the full journey with practical skills,
              real projects, milestone certificates, portfolio
              proof and career preparation.
            </span>
          </header>

          <div className={styles.finalPills}>
            <span>PORTFOLIO READY</span>
            <span>INTERVIEW READY</span>
            <span>INTERNSHIP ELIGIBLE</span>
          </div>

          <Link
            href="/signup"
            className="navbar-sign-in"
          >
            Begin at Level 01
          </Link>
        </div>
      </article>
    </section>
  );
}
