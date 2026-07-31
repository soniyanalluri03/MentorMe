import Link from "next/link";

import {
  ArrowRight,
  Database,
  Layers3,
  Palette,
  Target,
} from "lucide-react";

const tracks = [
  {
    number: "02",
    icon: Database,
    title: "Backend Developer",
    description:
      "APIs, databases, authentication, system design and scalable services.",
    status: "Coming soon",
  },
  {
    number: "03",
    icon: Palette,
    title: "UI/UX Designer",
    description:
      "Research, product thinking, visual systems and portfolio-ready interfaces.",
    status: "Coming soon",
  },
  {
    number: "04",
    icon: Layers3,
    title: "Data Analyst",
    description:
      "SQL, analysis, visualisation and business-focused decision making.",
    status: "Planned",
  },
];

export default function CareerTracksAndCTA() {
  return (
    <>
      <section className="tracks section-shell">
        <div className="section-heading">
          <div>
            <div className="section-kicker">
              EXPANDING CAREER TRACKS
            </div>

            <h2>
              More career directions.{" "}
              <span>The same proof-first system.</span>
            </h2>
          </div>

          <p>
            Each new track will use the same level-based roadmap,
            project gates, milestone certificates and portfolio
            evidence.
          </p>
        </div>

        <div className="track-list">
          {tracks.map((track) => {
            const Icon = track.icon;

            return (
              <article
                className="track-card"
                key={track.number}
              >
                <span className="track-card__number">
                  {track.number}
                </span>

                <div className="track-card__icon">
                  <Icon
                    size={28}
                    strokeWidth={1.6}
                  />
                </div>

                <div className="track-card__body">
                  <small>{track.status}</small>
                  <h3>{track.title}</h3>
                  <p>{track.description}</p>
                </div>

                <span className="track-card__status">
                  {track.status}
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="final-cta">
        <div
          className="final-cta__border"
          aria-hidden="true"
        />

        <Target
          className="final-cta__icon"
          size={38}
          strokeWidth={1.5}
        />

        <span>YOUR FIRST FIVE LEVELS ARE FREE</span>

        <h2>
          A career goal becomes real when the{" "}
          <em>next step is visible.</em>
        </h2>

        <p>
          Choose the Frontend Engineer track and begin building
          measurable progress from your very first level.
        </p>

        <Link className="gold-button" href="/signup">
          Start your journey
          <ArrowRight size={18} />
        </Link>
      </section>
    </>
  );
}