"use client";
import Link from "next/link";
import {useEffect,useRef,useState,} from "react";
import { MentorMeLogo } from "./MentorMeLogo";
import { ThemeToggle } from "./ThemeToggle";
import { LearningHero } from "./home/LearningHero";
import { HomeJourneySections } from "./home/HomeJourneySections";
import CareerTracksAndCTA from "./courses/CareerTracksAndCTA";
import CourseComparison from "./courses/CourseComparison";
import CoursesHero from "./courses/CoursesHero";
import FeaturedTrack from "./courses/FeaturedTrack";
import MentorMethod from "./courses/MentorMethod";
import styles from "../../app/home.module.css";
import { LeaderboardExperience } from "./leaderboard/LeaderboardExperience";
import { AboutExperience } from "./about/AboutExperience";
import RoadmapHero from "./roadmap/RoadmapHero";
import RoadmapStats from "./roadmap/RoadmapStats";
import RoadmapJourney from "./roadmap/RoadmapJourney";
import RoadmapFinalSection from "./roadmap/RoadmapFinalSection";
import PricingMain from "./pricing/PricingMain";

type Page =
  | "home"
  | "courses"
  | "roadmap"
  | "leaderboard"
  | "about"
  | "pricing"
  | "contact";

const nav: {
  label: string;
  href: string;
  page: Page;
}[] = [
  {
    label: "Home",
    href: "/",
    page: "home",
  },
  {
    label: "Career Tracks",
    href: "/courses",
    page: "courses",
  },
  {
    label: "Roadmap",
    href: "/roadmap",
    page: "roadmap",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
    page: "leaderboard",
  },
  {
    label: "Pricing",
    href: "/pricing",
    page: "pricing",
  },
  {
    label: "About",
    href: "/about",
    page: "about",
  },
  {
    label: "Contact",
    href: "/contact",
    page: "contact",
  },
];

function Header({
  page,
}: {
  page: Page;
}) {
  const [notice, setNotice] =
    useState(false);

  const [navbarVisible, setNavbarVisible] =
    useState(true);

  const previousScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    previousScrollY.current =
      window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentScrollY =
          window.scrollY;

        const scrollDifference =
          currentScrollY -
          previousScrollY.current;

        /*
         * Always show the navbar
         * near the top of the page.
         */
        if (currentScrollY <= 20) {
          setNavbarVisible(true);
        }

        /*
         * Scrolling down:
         * hide the navbar.
         */
        else if (scrollDifference > 6) {
          setNavbarVisible(false);
          setNotice(false);
        }

        /*
         * Scrolling upward:
         * show the navbar again.
         */
        else if (scrollDifference < -6) {
          setNavbarVisible(true);
        }

        previousScrollY.current =
          currentScrollY;

        ticking.current = false;
      });
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  return (
    <div className="public-header-slot">
      <header
        className={`public-header ${
          navbarVisible
            ? "navbar-visible"
            : "navbar-hidden"
        }`}
      >
        <div className="public-header__inner">
          <Link
            className="brand-link"
            href="/"
            aria-label="MentorME home"
          >
            <MentorMeLogo />
          </Link>

          <nav aria-label="Primary navigation">
            {nav.map((item) => (
              <Link
                className={
                  page === item.page
                    ? "active"
                    : ""
                }
                href={item.href}
                key={item.page}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <div className="notice-wrap">
              <button
                className="notification-button"
                onClick={() =>
                  setNotice(
                    (current) => !current,
                  )
                }
                aria-label="Notifications"
                aria-expanded={notice}
                type="button"
              >
                <svg
                  viewBox="0 0 448 512"
                  className="notification-bell"
                  aria-hidden="true"
                >
                  <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
                </svg>

                <i />
              </button>

              {notice && (
                <div className="notice-pop">
                  <b>What&apos;s new</b>

                  <p>
                    New Python career track
                    missions added.
                  </p>

                  <p>
                    Levels 1–5 are free.
                  </p>

                  <Link href="/roadmap">
                    Explore the new roadmap →
                  </Link>
                </div>
              )}
            </div>

            <ThemeToggle />

            <Link
              className="navbar-sign-in"
              href="/login"
            >
              <svg
                className="navbar-sign-in__icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
              </svg>

              <span>Sign in</span>
            </Link>
          </div>

          <button
            className="mobile-menu"
            aria-label="Open menu"
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
    </div>
  );
}

function JourneyStrip() {
  const steps = [
    "Confusion",
    "Direction",
    "Learning",
    "Practice",
    "Projects",
    "Proof",
    "Confidence",
  ];

  return (
    <div className="journey-strip">
      {steps.map(
        (step, index) => (
          <div key={step}>
            <span>
              {String(
                index + 1,
              ).padStart(2, "0")}
            </span>

            <b>{step}</b>
          </div>
        ),
      )}
    </div>
  );
}



const worlds = [
  [
    "01",
    "DISCOVER",
    "Levels 1–5",
    "Find your direction",
  ],
  [
    "02",
    "LEARN",
    "Levels 6–22",
    "Build core skills",
  ],
  [
    "03",
    "PRACTICE",
    "Levels 23–39",
    "Turn theory into action",
  ],
  [
    "04",
    "CHALLENGE",
    "Levels 40–56",
    "Prove what you know",
  ],
  [
    "05",
    "BUILD",
    "Levels 57–73",
    "Create portfolio proof",
  ],
  [
    "06",
    "LAUNCH",
    "Levels 74–90",
    "Become career ready",
  ],
];

function WorldMap({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className={`world-map ${
        compact ? "compact" : ""
      }`}
    >
      <div className="map-path" />

      {worlds.map(
        (world, index) => (
          <article
            key={world[1]}
            className={`world world-${
              index + 1
            }`}
          >
            <span>{world[0]}</span>

            <div>
              <small>
                {world[2]}
              </small>

              <h3>{world[1]}</h3>

              <p>{world[3]}</p>
            </div>

            <b>
              {index === 5
                ? "★"
                : index + 1}
            </b>
          </article>
        ),
      )}
    </div>
  );
}

export default function Courses() {
  return (
    <main className="courses-page">
      <CoursesHero />
      <FeaturedTrack />
      {/* <CourseStats /> */}
      <MentorMethod />
      <CourseComparison />
      <CareerTracksAndCTA />
    </main>
  );
}
function Home() {
  return (
    <>
      <LearningHero />
      <HomeJourneySections />
    </>
  );
}

function Roadmap() {
  return (
    <>
      <main className="roadmap-page">
      <RoadmapHero/>
      <RoadmapStats />
      <RoadmapJourney />
      <RoadmapFinalSection />
    </main>
    </>
  );
}

function Pricing() {
  return (
    <main className="pricing-page">
      <PricingMain/>
    </main>
  );
}

const leaders = [
  [
    "01",
    "Ananya Rao",
    "Frontend Developer",
    "8,920 XP",
    "AR",
  ],
  [
    "02",
    "Kabir Shah",
    "Frontend Developer",
    "8,640 XP",
    "KS",
  ],
  [
    "03",
    "Meera Nair",
    "Frontend Developer",
    "8,410 XP",
    "MN",
  ],
  [
    "04",
    "Rahul Sharma",
    "Frontend Developer",
    "2,450 XP",
    "RS",
  ],
  [
    "05",
    "Dev Patel",
    "Frontend Developer",
    "2,280 XP",
    "DP",
  ],
];

function Leaderboard() {
  return (
    <>
      <PageHero
        tag="MENTORME LEADERBOARD"
        title={
          <>
            Momentum deserves
            <br />
            <em>to be seen.</em>
          </>
        }
        text="A friendly ranking of students turning consistent action into visible career progress."
      />

      <section className="section leaderboard">
        <div className="leaderboard-head">
          <div>
            <span className="kicker">
              THIS WEEK
            </span>

            <h2>Top learners</h2>
          </div>

          <div className="your-rank">
            <small>
              YOUR RANK
            </small>

            <b>#04</b>

            <span>
              ↑ 2 places this week
            </span>
          </div>
        </div>

        <div className="podium">
          <article>
            <span>02</span>

            <i>KS</i>

            <h3>
              Kabir Shah
            </h3>

            <b>8,640 XP</b>
          </article>

          <article className="winner">
            <span>01</span>

            <i>AR</i>

            <h3>
              Ananya Rao
            </h3>

            <b>8,920 XP</b>
          </article>

          <article>
            <span>03</span>

            <i>MN</i>

            <h3>
              Meera Nair
            </h3>

            <b>8,410 XP</b>
          </article>
        </div>

        <div className="leader-list">
          {leaders.map(
            (leader) => (
              <article
                className={
                  leader[4] === "RS"
                    ? "you"
                    : ""
                }
                key={leader[0]}
              >
                <strong>
                  {leader[0]}
                </strong>

                <i>{leader[4]}</i>

                <div>
                  <b>
                    {leader[1]}{" "}

                    {leader[4] ===
                      "RS" && (
                      <small>
                        YOU
                      </small>
                    )}
                  </b>

                  <span>
                    {leader[2]}
                  </span>
                </div>

                <em>
                  {leader[3]}
                </em>
              </article>
            ),
          )}
        </div>
      </section>
    </>
  );
}

function Contact() {
  const [sent, setSent] =
    useState(false);

  const contactTypes = [
    "Student support",
    "College partnership",
    "Corporate partnership",
    "General enquiry",
  ];

  return (
    <>
      <PageHero
        tag="GET IN TOUCH"
        title={
          <>
            Let’s talk about
            <br />
            <em>
              your next step.
            </em>
          </>
        }
        text="Questions about your journey, a college partnership or something bigger? Start here."
      />

      <section className="section contact-grid">
        <div className="contact-types">
          {contactTypes.map(
            (contactType, index) => (
              <div key={contactType}>
                <span>
                  0{index + 1}
                </span>

                <b>
                  {contactType}
                </b>

                <i>→</i>
              </div>
            ),
          )}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <div className="field-row">
            <label>
              Name

              <input
                required
                placeholder="Your name"
              />
            </label>

            <label>
              Email

              <input
                required
                type="email"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <div className="field-row">
            <label>
              Phone

              <input
                required
                placeholder="+91"
              />
            </label>

            <label>
              I am a...

              <select required>
                <option value="">
                  Select one
                </option>

                <option>
                  Student
                </option>

                <option>
                  Educator
                </option>

                <option>
                  Partner
                </option>
              </select>
            </label>
          </div>

          <label>
            Subject

            <input
              required
              placeholder="How can we help?"
            />
          </label>

          <label>
            Message

            <textarea
              required
              placeholder="Tell us a little more..."
              rows={5}
            />
          </label>

          <button
            className="btn"
            type="submit"
          >
            Send message →
          </button>

          {sent && (
            <p className="success">
              ✓ Message received.
              We’ll be in touch soon.
            </p>
          )}
        </form>
      </section>
    </>
  );
}

function PageHero({
  tag,
  title,
  text,
}: {
  tag: string;
  title: React.ReactNode;
  text: string;
}) {
  return (
    <section className="page-hero">
      <span className="kicker">
        {tag}
      </span>

      <h1>{title}</h1>

      <p>{text}</p>

      <div className="page-orb" />
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <MentorMeLogo />

      <p>
        From confusion to
        confidence.
      </p>

      <div>
        {nav.map((item) => (
          <Link
            href={item.href}
            key={item.page}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <small>
        © 2026 MentorME. Progress
        with purpose.
      </small>
    </footer>
  );
}

export function PublicSite({
  page,
}: {
  page: Page;
}) {
  const content = {
    home: <Home />,
    courses: <Courses />,
    roadmap: <Roadmap />,
    leaderboard: <LeaderboardExperience />,
    about: <AboutExperience />,
    pricing: <Pricing />,
    contact: <Contact />,
  }[page];

  return (
    <main
      className={
        page === "home"
          ? styles.homePage
          : page === "courses"
            ? "courses-page"
            : undefined
      }
    >
      <Header page={page} />

      {content}

      <Footer />
    </main>
  );
}