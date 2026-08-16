"use client";

import {
  BadgeCheck,
  Code2,
  Sparkles,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import { useState } from "react";

import styles from "./CoursesHero.module.css";
import roadmapHeroStyles from "../roadmap/RoadmapHero.module.css";

type ViewKey = "track" | "project" | "level";

interface ViewItem {
  key: ViewKey;
  label: string;
  title: string;
  description: string;
  value: string;
  progress: number;
  progressLabel: string;
  icon: LucideIcon;
  tags: string[];
}

const views: ViewItem[] = [
  {
    key: "track",
    label: "ACTIVE TRACK",
    title: "Frontend Engineer",
    description:
      "Build polished, responsive interfaces with React, Next.js and TypeScript.",
    value: "01",
    progress: 20,
    progressLabel: "18 / 90 levels",
    icon: Code2,
    tags: ["React", "Next.js", "TypeScript"],
  },

  {
    key: "project",
    label: "PROJECT STATUS",
    title: "Project Verified",
    description:
      "Your responsive dashboard passed review and is ready for your portfolio.",
    value: "✓",
    progress: 72,
    progressLabel: "72% complete",
    icon: BadgeCheck,
    tags: ["Responsive", "Accessible", "Reviewed"],
  },

  {
    key: "level",
    label: "CURRENT LEVEL",
    title: "Level 18",
    description:
      "Complete the component architecture mission to unlock the next stage.",
    value: "18",
    progress: 20,
    progressLabel: "Level 18 of 90",
    icon: Trophy,
    tags: ["Components", "State", "Architecture"],
  },
];

export default function CoursesHero() {
  const [activeView, setActiveView] =
    useState<ViewKey>("track");

  const currentView =
    views.find((item) => item.key === activeView) ??
    views[0];

  const CurrentIcon = currentView.icon;

  return (
    <section className={styles.hero}>
      {/* ===================================================
          LEFT CONTENT
          =================================================== */}

      <div className={styles.copy}>
        <header
          className={`hj-first-five-heading ${styles.heroHeading}`}
        >
          <div
            className={`${roadmapHeroStyles.kicker} ${styles.heroKicker}`}
          >
            <Sparkles size={15} />

            <span>
              FIND YOUR DIRECTION. START WITH CLARITY.
            </span>
          </div>

          <h2>
            Choose your path
            <br />

            <span className="hj-heading-wave text-4xl xl:text-6xl">
              grow your
            </span>{" "}

            <em className="text-4xl xl:text-6xl">future.</em>
          </h2>

          <span className={styles.heroDescription}>
            Frontend. Backend. Design. More paths ahead.
          </span>
        </header>

        {/* =================================================
            HERO STATS
            ================================================= */}

        <div className={styles.stats}>
          <article>
            <strong>03</strong>
            <span>Career tracks</span>
          </article>

          <article>
            <strong>90</strong>
            <span>Levels per journey</span>
          </article>

          <article>
            <strong>01</strong>
            <span>Clear direction</span>
          </article>
        </div>
      </div>

      {/* ===================================================
          RIGHT VISUAL
          =================================================== */}

      <div className={styles.visual}>
        <div
          className={styles.orbit}
          aria-hidden="true"
        >
          <span />
          <span />
        </div>

        {/* =================================================
            MAIN DASHBOARD
            ================================================= */}

        <article
          key={activeView}
          className={styles.dashboard}
        >
          <div className={styles.dashboardTop}>
            <span>MENTORME / CAREER SYSTEM</span>
            <b>{currentView.value}</b>
          </div>

          <div className={styles.status}>
            <i aria-hidden="true" />
            {currentView.label}
          </div>

          <div className={styles.mainIcon}>
            <CurrentIcon
              size={46}
              strokeWidth={1.7}
            />
          </div>

          <small>INTERACTIVE JOURNEY</small>

          <h3>{currentView.title}</h3>

          <p>{currentView.description}</p>

          <div className={styles.tags}>
            {currentView.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className={styles.progressCard}>
            <div>
              <span>Journey progress</span>
              <b>{currentView.progressLabel}</b>
            </div>

            <div className={styles.progressTrack}>
              <i
                style={{
                  width: `${currentView.progress}%`,
                }}
              />
            </div>
          </div>
        </article>

        {/* =================================================
            FLOATING SELECTORS
            ================================================= */}

        <div className={styles.selectorGrid}>
          {views.map((item) => {
            const ItemIcon = item.icon;
            const isActive =
              item.key === activeView;

            return (
              <button
                key={item.key}
                type="button"
                className={`${styles.selector} ${
                  isActive
                    ? styles.selectorActive
                    : ""
                }`}
                onClick={() =>
                  setActiveView(item.key)
                }
                aria-pressed={isActive}
              >
                <span
                  className={styles.selectorIcon}
                >
                  <ItemIcon
                    size={19}
                    strokeWidth={1.8}
                  />
                </span>

                <span
                  className={styles.selectorCopy}
                >
                  <small>{item.label}</small>
                  <strong>{item.title}</strong>
                </span>

                <i
                  className={styles.selectorDot}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}