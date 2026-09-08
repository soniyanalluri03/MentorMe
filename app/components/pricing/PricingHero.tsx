import Link from "next/link";
import { ArrowRight } from "lucide-react";

import styles from "./PricingHero.module.css";

export default function PricingHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="pricing-hero-heading"
    >
      <div className={styles.content}>
        {/* =====================================================
            SHARED GLOBAL HEADING
        ===================================================== */}

        <header className="hj-first-five-heading">
          <h2 id="pricing-hero-heading">
            Choose how far
            <br />

            <span className="hj-heading-wave text-4xl xl:text-6xl">
              you want to
            </span>{" "}

            <em className="text-4xl xl:text-6xl">
              go.
            </em>
          </h2>

          <span>
            Start free. Upgrade when you are ready.
            Keep everything you have already achieved.
          </span>
        </header>

        {/* =====================================================
            PRICING-SPECIFIC DESCRIPTION
        ===================================================== */}

        <p className={styles.description}>
          Pick the level of guidance that fits your journey —
          from exploring your direction to full career
          preparation.
        </p>

        {/* =====================================================
            SHARED GLOBAL ACTION BUTTONS
        ===================================================== */}

        <div className="hj-action-row">
          <Link
            href="#pricing-plans"
            className="navbar-sign-in"
          >
            View pricing
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/"
            className="mh-button mh-button--secondary"
          >
            Visit MentorMe
            <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}