"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Code2,
  Palette,
  ServerCog,
  Sparkles,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import styles from "./FeaturedTrack.module.css";

type TrackStatus = "AVAILABLE" | "COMING SOON";

interface Track {
  id: string;
  number: string;
  status: TrackStatus;
  title: string;
  accent: string;
  description: string;
  icon: LucideIcon;
  level: string;
  progress: number;
  progressLabel: string;
  proof: string;
  skills: string[];
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

const tracks: Track[] = [
  {
    id: "frontend",
    number: "01",
    status: "AVAILABLE",
    title: "Frontend",
    accent: "Engineer",
    description:
      "Build responsive, production-ready web experiences through guided levels, practical missions and verified projects.",
    icon: Code2,
    level: "18",
    progress: 20,
    progressLabel: "18 / 90 levels",
    proof: "Responsive dashboard verified",
    skills: [
      "HTML & CSS",
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "UI Engineering",
    ],
    primaryLabel: "Start levels 1–5 free",
    primaryHref: "/signup",
    secondaryLabel: "View all 90 levels",
    secondaryHref: "/roadmap",
  },
  {
    id: "backend",
    number: "02",
    status: "COMING SOON",
    title: "Backend",
    accent: "Developer",
    description:
      "Design secure APIs, model reliable data and build scalable backend services through real development missions.",
    icon: ServerCog,
    level: "12",
    progress: 13,
    progressLabel: "Preview journey",
    proof: "Production API milestone",
    skills: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Authentication",
      "REST APIs",
      "System Design",
    ],
    primaryLabel: "Join the waitlist",
    primaryHref: "/signup",
    secondaryLabel: "Preview roadmap",
    secondaryHref: "/roadmap",
  },
  {
    id: "design",
    number: "03",
    status: "COMING SOON",
    title: "UI/UX",
    accent: "Designer",
    description:
      "Turn user problems into polished product experiences through research, systems and portfolio-ready case studies.",
    icon: Palette,
    level: "09",
    progress: 10,
    progressLabel: "Preview journey",
    proof: "Product case study ready",
    skills: [
      "User Research",
      "Wireframes",
      "Figma",
      "Prototyping",
      "Design Systems",
      "Case Studies",
    ],
    primaryLabel: "Join the waitlist",
    primaryHref: "/signup",
    secondaryLabel: "Preview roadmap",
    secondaryHref: "/roadmap",
  },
];

export default function FeaturedTrack() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTrack = tracks[activeIndex];
  const ActiveIcon = activeTrack.icon;

  const getRelativePosition = (index: number) => {
    const difference =
      (index - activeIndex + tracks.length) %
      tracks.length;

    if (difference === 0) {
      return "active";
    }

    if (difference === 1) {
      return "next";
    }

    return "previous";
  };

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0
        ? tracks.length - 1
        : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === tracks.length - 1
        ? 0
        : current + 1,
    );
  };

  return (
    <section
      className={styles.section}
      aria-labelledby="featured-track-heading"
    >
      <div
        className={styles.ambient}
        aria-hidden="true"
      />

      <header className={styles.heading}>
        <div>
          <div className={styles.kicker}>
            {/* <Sparkles size={15} />
            Career tracks */}
          </div>

          <h2 id="featured-track-heading">
            <span
              className="hj-main-heading"
            >
              Find the path that
            </span>
            <span
  className={`${styles.headingLine} ${styles.headingLineSecondary} text-4xl xl:text-6xl`}
>
  <span className="hj-main-heading hj-heading-wave">
    fits your
  </span>{" "}

  <em className="seen-word">
    ambition
  </em>
</span>
          </h2>
        </div>

        <div className="hj-first-five-heading">
          <span >
            Every track follows one system: guided
            levels, practical missions, real projects
            and visible proof
          </span>

          <div
            className={styles.trackCounter}
            aria-label={`Track ${activeIndex + 1} of ${tracks.length
              }`}
          >
            <span>
              {String(activeIndex + 1).padStart(
                2,
                "0",
              )}
            </span>

            <i aria-hidden="true" />

            <span>
              {String(tracks.length).padStart(
                2,
                "0",
              )}
            </span>
          </div>
        </div>
      </header>

      <div className={styles.carousel}>
        <div
          className={styles.carouselGlow}
          aria-hidden="true"
        />

        {tracks.map((track, index) => {
          const TrackIcon = track.icon;
          const position =
            getRelativePosition(index);

          return (
            <button
              key={track.id}
              type="button"
              className={`${styles.trackCard} ${position === "active"
                  ? styles.trackCardActive
                  : position === "previous"
                    ? styles.trackCardPrevious
                    : styles.trackCardNext
                }`}
              onClick={() =>
                setActiveIndex(index)
              }
              aria-pressed={index === activeIndex}
            >
              <span className={styles.cardNumber}>
                {track.number}
              </span>


              <span className={styles.cardIcon}>
                <TrackIcon
                  size={36}
                  strokeWidth={1.65}
                />
              </span>

              <span className={styles.cardTitle}>
                <strong>{track.title}</strong>
                <b>{track.accent}</b>
              </span>

              <span className={styles.cardLevel}>
                Level {track.level}
              </span>

              <i aria-hidden="true" />
            </button>
          );
        })}

        <button
          type="button"
          className={`${styles.sideArrow} ${styles.sideArrowLeft}`}
          onClick={showPrevious}
          aria-label="Previous career track"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          type="button"
          className={`${styles.sideArrow} ${styles.sideArrowRight}`}
          onClick={showNext}
          aria-label="Next career track"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      <article
        key={activeTrack.id}
        className={styles.detailPanel}
        aria-live="polite"
      >
        <div className={styles.detailIdentity}>
          <div className={styles.detailIcon}>
            <ActiveIcon
              size={30}
              strokeWidth={1.65}
            />
          </div>

          <div>


            <h3>
              {activeTrack.title}{" "}
              <span>{activeTrack.accent}.</span>
            </h3>
          </div>
        </div>

        <div className={styles.detailCopy}>
          <p>{activeTrack.description}</p>

          <div className={styles.skills}>
            {activeTrack.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        <div className={styles.proofPanel}>
          <div className={styles.proofTop}>
            <div>
              <Trophy size={18} />
              <span>Proof outcome</span>
            </div>

            <b>{activeTrack.progressLabel}</b>
          </div>

          <strong>{activeTrack.proof}</strong>

          <div className={styles.progressTrack}>
            <i
              style={{
                width: `${activeTrack.progress}%`,
              }}
            />
          </div>

          <div className={styles.verified}>
            <BadgeCheck size={15} />
            Portfolio-ready milestone
          </div>
        </div>

        <div className={styles.actions}>
          <Link
            href={activeTrack.primaryHref}
            className="navbar-sign-in"
          >
            {activeTrack.primaryLabel}
            <ArrowRight size={18} />
          </Link>

          <Link
            href={activeTrack.secondaryHref}
            className={styles.secondaryButton}
          >
            {activeTrack.secondaryLabel}
          </Link>
        </div>
      </article>
    </section>
  );
}