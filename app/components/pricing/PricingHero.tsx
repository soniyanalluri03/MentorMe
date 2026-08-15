import Link from "next/link";

import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import styles from "./PricingHero.module.css";

export default function PricingHero() {
  return (
    <section
      className={styles.hero}
    >
      <div
        className={
          styles.content
        }
      >
        <header className="hj-first-five-heading">
          <div
            className={
              styles.kicker
            }
          >
            <Sparkles
              size={15}
            />

            SIMPLE PRICING.
            SERIOUS PROGRESS.
          </div>


          <h2>
            Choose how far
            <br />

            <span className="hj-heading-wave text-4xl xl:text-6xl"
            >
              you want to
            </span>{" "}

            <em className="text-4xl xl:text-6xl">
              go.
            </em>
          </h2>

          <span>
            Start free.
            Upgrade when you
            are ready. Keep
            everything you
            have already
            achieved.
          </span>
        </header>
        <p
          className={
            styles.description
          }
        >
          Pick the level of
          guidance that fits
          your journey — from
          exploring your
          direction to full
          career preparation.
        </p>

        <div
          className={
            styles.actions
          }
        >
          <Link
            href="#pricing-plans"
            className="navbar-sign-in"
          >
            View pricing

            <ArrowRight
              size={18}
            />
          </Link>


          <Link
            className="mh-button mh-button--secondary"
            href="/"
          >
            Visit MentorMe
            <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}