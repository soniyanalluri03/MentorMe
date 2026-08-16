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

const toneClasses: Record<
  TrackTone,
  string
> = {
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
  {/* LEFT HEADING */}

  <div className={styles.sectionHeadingMain}>
    <div className={styles.kicker}>
      <Sparkles size={15} />
      EXPANDING CAREER TRACKS
    </div>

    <h2 id="expanding-career-tracks">
      <span className="hj-main-heading">
        More career directions
      </span>

      <span
        className={`${styles.headingLine} ${styles.headingLineSecondary} text-4xl xl:text-6xl`}
      >
        <span className="hj-main-heading hj-heading-wave">
          The same proof-first
        </span>{" "}

        <em className="seen-word">
          system
        </em>
      </span>
    </h2>
  </div>

  {/* RIGHT SUPPORTING COPY */}

  <div
    className={`${styles.headingAside} hj-first-five-heading`}
  >
    <span>
      The same level-based roadmap, project gates,
      milestone certificates and portfolio evidence.
    </span>
  </div>
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
                className={`${styles.trackCard} ${isFeatured
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
                    <span key={skill}>
                      {skill}
                    </span>
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
{/* 
        <span className={styles.ctaEyebrow}>
          Your first five levels are free
        </span>

        <h2 id="career-journey-cta">
          <span
            className={`${styles.ctaHeadingLine} ${styles.ctaHeadingPrimary}`}
          >
            A career goal becomes real
          </span>

          <span
            className={`${styles.ctaHeadingLine} ${styles.ctaHeadingSecondary}`}
          >
            <span className={styles.ctaHeadingWave}>
              when the next step is
            </span>{" "}

            <em className={styles.ctaProofWord}>
              visible
            </em>
          </span>
        </h2>

        <p>
          Choose the Frontend Engineer track and
          begin building measurable progress from
          your very first level
        </p> */}
<header className="hj-first-five-heading pt-10">
          <div className={styles.kicker}>
            <Sparkles size={15} />
            Your first five levels are free
          </div>
          <h2>
             A career goal becomes real
            <br />

            <span className="hj-heading-wave text-4xl xl:text-6xl">
              when the next step is
            </span>{" "}

            <em className="text-4xl xl:text-6xl"> visible</em>
          </h2>
          <span>
            Choose the Frontend Engineer track and
          begin building measurable progress from
          your very first level
          </span>
        </header>
        <Link
          className="navbar-sign-in mt-10"
          href="/signup"
        >
          Start your journey
          <ArrowRight size={18} />
        </Link>
      </section>
      
    </>
  );
}