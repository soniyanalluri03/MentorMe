import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  Database,
  Layers3,
  Palette,
  Route,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";

import styles from "./CareerTracksAndCTA.module.css";

type TrackTone = "blue" | "purple" | "slate";

interface CareerTrack {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  status: string;
  category: string;
  skills: string[];
  tone: TrackTone;
}

const tracks: CareerTrack[] = [
  {
    number: "01",
    icon: Database,
    title: "Backend Developer",
    description:
      "Design secure APIs, dependable databases and scalable services through production-style missions.",
    status: "Available",
    category: "Systems & APIs",
    skills: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "System design",
    ],
    tone: "blue",
  },
  {
    number: "02",
    icon: Palette,
    title: "UI/UX Designer",
    description:
      "Turn user problems into polished interfaces, design systems and portfolio-ready case studies.",
    status: "Coming soon",
    category: "Product design",
    skills: [
      "Research",
      "Figma",
      "Prototyping",
    ],
    tone: "purple",
  },
  {
    number: "03",
    icon: Layers3,
    title: "Data Analyst",
    description:
      "Transform raw information into useful dashboards, insights and business-focused decisions.",
    status: "Planned",
    category: "Data & insights",
    skills: [
      "SQL",
      "Analytics",
      "Visualisation",
    ],
    tone: "slate",
  },
];

const toneClasses: Record<TrackTone, string> = {
  blue: "",
  purple: styles.tonePurple,
  slate: styles.toneSlate,
};

export default function CareerTracksAndCTA() {
  return (
    <>
      {/* =====================================================
          EXPANDING CAREER TRACKS
      ===================================================== */}

      <section
        className={styles.tracksSection}
        aria-labelledby="expanding-career-tracks"
      >
        {/* ===================================================
            SHARED GLOBAL HEADING
        =================================================== */}

        <header className="hj-first-five-heading">
          <h2 id="expanding-career-tracks">
            More career directions
            <br />

            <span className="hj-heading-wave text-4xl xl:text-6xl">
              The same proof-first
            </span>{" "}

            <em className="text-4xl xl:text-6xl">
              system.
            </em>
          </h2>

          <span>
            The same level-based roadmap, project gates,
            milestone certificates and portfolio evidence.
          </span>
        </header>

        {/* ===================================================
            CAREER CONSTELLATION
        =================================================== */}

        <div className={styles.trackList}>
          <div
            className={styles.trackRail}
            aria-hidden="true"
          >
            <span />
            <i />
            <i />
            <i />
          </div>

          <div
            className={styles.deckBadge}
            aria-hidden="true"
          >
            <Route size={15} />
            Next tracks
          </div>

          {tracks.map((track, index) => {
            const Icon = track.icon;
            const isFeatured = index === 0;

            return (
              <article
                key={track.number}
                className={[
                  styles.trackCard,
                  isFeatured
                    ? styles.trackCardFeatured
                    : styles.trackCardSide,
                  toneClasses[track.tone],
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {/* Animated metallic border */}

                <div
                  className={styles.trackBorder}
                  aria-hidden="true"
                />

                {/* Ambient card glow */}

                <div
                  className={styles.trackGlow}
                  aria-hidden="true"
                />

                {/* Top */}

                <div className={styles.trackTop}>
                  <span className={styles.trackNumber}>
                    {track.number}
                  </span>

                  <span className={styles.trackStatus}>
                    <Sparkles size={12} />
                    {track.status}
                  </span>
                </div>

                {/* Icon */}

                <div className={styles.trackIcon}>
                  <Icon
                    size={isFeatured ? 34 : 28}
                    strokeWidth={1.6}
                  />
                </div>

                {/* Content */}

                <div className={styles.trackBody}>
                  <small>
                    {track.category}
                  </small>

                  <h3>
                    {track.title}
                  </h3>

                  <p>
                    {track.description}
                  </p>
                </div>

                {/* Skills */}

                <div className={styles.skillList}>
                  {track.skills.map((skill) => (
                    <span key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer */}

                <div className={styles.trackFooter}>
                  <span>
                    <Sparkles size={14} />
                    Roadmap preview
                  </span>

                  <ArrowUpRight size={18} />
                </div>

                {/* Decorative mini roadmap */}

                <div
                  className={styles.trackVisual}
                  aria-hidden="true"
                >
                  <span />
                  <span />
                  <span />
                  <b />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section
        className={styles.finalCta}
        aria-labelledby="career-journey-cta"
      >
        {/* Decorative orbit */}

        <div
          className={styles.ctaOrbit}
          aria-hidden="true"
        >
          <i />
          <i />
          <i />
        </div>

        {/* CTA icon */}

        <div
          className={styles.ctaIcon}
          aria-hidden="true"
        >
          <Target
            size={38}
            strokeWidth={1.5}
          />
        </div>

        {/* ===================================================
            SHARED CTA HEADING
        =================================================== */}

        <header
          className={`hj-first-five-heading ${styles.ctaHeading}`}
        >
          <div className="hj-gold-eyebrow">
            <Sparkles
              size={15}
              className="mm-shared-icon mm-spark-icon"
            />

            YOUR FIRST FIVE LEVELS ARE FREE
          </div>

          <h2 id="career-journey-cta">
            A career goal becomes real
            <br />

            <span className="hj-heading-wave text-4xl xl:text-6xl">
              when the next step is
            </span>{" "}

            <em className="text-4xl xl:text-6xl">
              visible.
            </em>
          </h2>

          <span>
            Choose the Frontend Engineer track and begin
            building measurable progress from your very
            first level.
          </span>
        </header>

        <div className="hj-action-row">
          <Link
            className="navbar-sign-in"
            href="/signup"
          >
            Explore your path
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}