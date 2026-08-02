import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
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
    number: "02",
    icon: Database,
    title: "Backend Developer",
    description:
      "Design secure APIs, dependable databases and scalable services through production-style missions.",
    status: "Coming soon",
    category: "Systems & APIs",
    skills: ["Python", "FastAPI", "PostgreSQL", "System design"],
    tone: "blue",
  },
  {
    number: "03",
    icon: Palette,
    title: "UI/UX Designer",
    description:
      "Turn user problems into polished interfaces, design systems and portfolio-ready case studies.",
    status: "Coming soon",
    category: "Product design",
    skills: ["Research", "Figma", "Prototyping"],
    tone: "purple",
  },
  {
    number: "04",
    icon: Layers3,
    title: "Data Analyst",
    description:
      "Transform raw information into useful dashboards, insights and business-focused decisions.",
    status: "Planned",
    category: "Data & insights",
    skills: ["SQL", "Analytics", "Visualisation"],
    tone: "slate",
  },
];

const toneClasses: Record<TrackTone, string> = {
  blue: styles.toneBlue,
  purple: styles.tonePurple,
  slate: styles.toneSlate,
};

export default function CareerTracksAndCTA() {
  return (
    <>
      <section
        className={styles.tracksSection}
        aria-labelledby="expanding-career-tracks"
      >
        <div
          className={styles.tracksAmbient}
          aria-hidden="true"
        />

        <div className={styles.sectionHeading}>
          <div>
            <div className={styles.kicker}>
              Expanding career tracks
            </div>

            <h2 id="expanding-career-tracks">
              More career directions.{" "}
              <span>
                The same proof-first system.
              </span>
            </h2>
          </div>

          <p>
            Each new track will use the same
            level-based roadmap, project gates,
            milestone certificates and portfolio
            evidence.
          </p>
        </div>

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
                className={`${styles.trackCard} ${
                  isFeatured
                    ? styles.trackCardFeatured
                    : styles.trackCardSide
                } ${toneClasses[track.tone]}`}
                key={track.number}
              >
                <div
                  className={styles.trackBorder}
                  aria-hidden="true"
                />

                <div
                  className={styles.trackGlow}
                  aria-hidden="true"
                />

                <div className={styles.trackTop}>
                  <span className={styles.trackNumber}>
                    {track.number}
                  </span>

                  <span className={styles.trackStatus}>
                    <Clock3 size={13} />
                    {track.status}
                  </span>
                </div>

                <div className={styles.trackIcon}>
                  <Icon
                    size={isFeatured ? 34 : 28}
                    strokeWidth={1.6}
                  />
                </div>

                <div className={styles.trackBody}>
                  <small>{track.category}</small>

                  <h3>{track.title}</h3>

                  <p>{track.description}</p>
                </div>

                <div className={styles.skillList}>
                  {track.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <div className={styles.trackFooter}>
                  <span>
                    <Sparkles size={14} />
                    Roadmap preview
                  </span>

                  <ArrowUpRight size={18} />
                </div>

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

      <section
        className={styles.finalCta}
        aria-labelledby="career-journey-cta"
      >
        <div
          className={styles.ctaBorder}
          aria-hidden="true"
        />

        <div
          className={styles.ctaGrid}
          aria-hidden="true"
        />

        <div
          className={styles.ctaOrbit}
          aria-hidden="true"
        >
          <i />
          <i />
          <i />
        </div>

        <div className={styles.ctaIcon}>
          <Target
            size={38}
            strokeWidth={1.5}
          />
        </div>

        <span className={styles.ctaEyebrow}>
          Your first five levels are free
        </span>

        <h2 id="career-journey-cta">
          A career goal becomes real when the{" "}
          <em>next step is visible.</em>
        </h2>

        <p>
          Choose the Frontend Engineer track and
          begin building measurable progress from
          your very first level.
        </p>

        <Link
          className="navbar-sign-in"
          href="/signup"
        >
          Start your journey
          <ArrowRight size={18} />
        </Link>
      </section>
    </>
  );
}