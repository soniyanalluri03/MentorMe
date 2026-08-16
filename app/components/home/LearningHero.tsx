"use client";

import Link from "next/link";
import "./LearningHero.css";
import {
  Award,
  BarChart3,
  BriefcaseBusiness,
  Check,
  Code2,
  Crown,
  Gift,
  Lightbulb,
  Route,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

/* =========================================================
   TYPES
========================================================= */

type ThemeMode = "light" | "dark";

/* =========================================================
   THEME DETECTION
========================================================= */

function useThemeMode(): ThemeMode {
  const [theme, setTheme] =
    useState<ThemeMode>("light");

  useEffect(() => {
    function updateTheme() {
      setTheme(
        document.documentElement
          .dataset.theme === "dark"
          ? "dark"
          : "light",
      );
    }

    updateTheme();

    const observer =
      new MutationObserver(
        updateTheme,
      );

    observer.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: [
          "data-theme",
        ],
      },
    );

    return () => {
      observer.disconnect();
    };
  }, []);

  return theme;
}



/* =========================================================
   FIXED FORMULA BACKGROUND
========================================================= */

const formulaBackgroundItems = [
  { text: "const skills = []", className: "mh-formula--one" },
  { text: "function buildCareer()", className: "mh-formula--two" },
  { text: "<Portfolio />", className: "mh-formula--three" },
  { text: "git commit -m \"progress\"", className: "mh-formula--four" },
  { text: "npm run dev", className: "mh-formula--five" },
  { text: "async / await", className: "mh-formula--six" },
  { text: "{ progress: true }", className: "mh-formula--seven" },
  { text: "return success", className: "mh-formula--eight" },
  { text: "GET /roadmap", className: "mh-formula--nine" },
  { text: "POST /projects", className: "mh-formula--ten" },
  { text: "TypeScript", className: "mh-formula--eleven" },
  { text: "React", className: "mh-formula--twelve" },
  { text: "FastAPI", className: "mh-formula--thirteen" },
  { text: "Python", className: "mh-formula--fourteen" },
  { text: "if (ready) launch()", className: "mh-formula--fifteen" },
  { text: "for (const level of levels)", className: "mh-formula--sixteen" },
  { text: "console.log(\"build\")", className: "mh-formula--seventeen" },
  { text: "import growth from \"journey\"", className: "mh-formula--eighteen" },
  { text: "class CareerPath", className: "mh-formula--nineteen" },
  { text: "git push origin main", className: "mh-formula--twenty" },
  { text: "01 → 90", className: "mh-formula--twenty-one" },
  { text: "XP++", className: "mh-formula--twenty-two" },
  { text: "</>", className: "mh-formula--twenty-three" },
  { text: "[ ]", className: "mh-formula--twenty-four" },
  { text: "{ }", className: "mh-formula--twenty-five" },
  { text: "API → UI → Proof", className: "mh-formula--twenty-six" },
];

function FormulaBackground({
  theme,
}: {
  theme: ThemeMode;
}) {
  return (
    <div
      className={`mh-formula-bg mh-formula-bg--${theme}`}
      aria-hidden="true"
    >
      <div className="mh-formula-stars mh-formula-stars--far" />
      <div className="mh-formula-stars mh-formula-stars--near" />

      <div className="mh-formula-orbit mh-formula-orbit--one">
        <span />
        <span />
        <span />
        <i />
      </div>

      <div className="mh-formula-orbit mh-formula-orbit--two">
        <span />
        <span />
        <span />
        <i />
      </div>

      {formulaBackgroundItems.map((item) => (
        <span
          key={item.className}
          className={`mh-formula ${item.className}`}
          style={{
            fontSize:
              item.text.length > 12
                ? "clamp(0.72rem, 1vw, 1.05rem)"
                : "clamp(0.52rem, 0.72vw, 0.82rem)",
            ...(theme === "light" ? { opacity: 0.56 } : {}),
          }}
        >
          {item.text}
        </span>
      ))}

      <div className="mh-formula-wave mh-formula-wave--one" />
      <div className="mh-formula-wave mh-formula-wave--two" />
      <div className="mh-formula-flare" />
    </div>
  );
}

/* =========================================================
   ANIMATED LEFT-SIDE WORD
========================================================= */

const animatedWords = [
  "real projects",
  "career proof",
  "job readiness",
  "visible progress",
];

function AnimatedHeroWord({ theme }: { theme: ThemeMode }) {
  const [index, setIndex] =
    useState(0);

  const [visible, setVisible] =
    useState(true);

  useEffect(() => {
    let timeout:
      | number
      | undefined;

    const interval =
      window.setInterval(() => {
        setVisible(false);

        timeout =
          window.setTimeout(() => {
            setIndex(
              (current) =>
                (current + 1) %
                animatedWords.length,
            );

            setVisible(true);
          }, 360);
      }, 3200);

    return () => {
      window.clearInterval(
        interval,
      );

      if (timeout) {
        window.clearTimeout(
          timeout,
        );
      }
    };
  }, []);

  return (
    <span
      className={`mh-changing ${visible
        ? "mh-changing--visible"
        : ""
        }`}
      style={{
        backgroundImage:
          theme === "dark"
            ? "linear-gradient(110deg, #9B72FF 0%, #B58CFF 34%, #C39BFF 58%, #D4AF37 82%, #F2D875 100%)"
            : "linear-gradient(110deg, #6D4ED6 0%, #8B5CF6 35%, #A855F7 60%, #D4AF37 85%, #F2D46B 100%)",

        backgroundSize: "200% 100%",
        backgroundPosition: "0% 50%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        WebkitTextStroke: "0 transparent",
        textShadow: "none",
      }}
    >
      {animatedWords[index]}
    </span>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function LearningHero() {
  const theme = useThemeMode();

  return (
    <section
      className="mh-root"
    >
      {theme === "light" && <div className="mh-light-center-wash" aria-hidden="true" />}
      <div className="mh-grid" />
      <div className="mh-glow mh-glow--left" />
      <div className="mh-glow mh-glow--right" />

      <div className="mh-inner">
        <div className="mh-content">
          <h1>
            <span className="hj-main-heading">
              Build skills
            </span>
            <br />
            <span className="hj-display-heading">that become</span>
            <br />
            <span className="hj-heading-wave  hj-display-heading">
              visible</span>{" "}
            <span className="seen-word">
              progress
            </span>

          </h1>
          <div className="hj-first-five-heading">
            <span>
              Turn ambition into career-ready proof.
            </span>
          </div>

          <div className="mh-hero-pills">
            <span>GUIDED LEARNING</span>
            <span>REAL PROJECTS</span>
            <span>CAREER-READY PROOF</span>
          </div>

          <div className="mh-actions">
            <Link
              className="mh-button mh-button--primary"
              href="/signup"
            >
              Start your journey
              <span>→</span>
            </Link>

            <Link
              className="mh-button mh-button--secondary"
              href="/roadmap"
            >
              Explore the roadmap
              <span>↗</span>
            </Link>
          </div>

        </div>

        <div className="mh-visual">
          <div
            className="mh-student-glow"
            aria-hidden="true"
          />

          {/* =========================================
      STUDENT PNG
  ========================================= */}

          <div
            className={`mh-student-scene mh-student-scene--${theme}`}
          >
            <img
              src="/images/home/student-career-clean.png"
              alt="Student building skills through guided learning and projects"
              className={`mh-student-image mh-student-image--${theme}`}
              draggable={false}
            />
          </div>

          {/* =========================================
      FLOATING CAREER UI
  ========================================= */}

          <div
            className="mh-career-ui"
            aria-hidden="true"
          >
            {/* ROADMAP PROGRESS */}

            <article className="mh-career-card mh-roadmap-card">
              <div className="mh-card-heading">
                <Route size={15} />
                <span>ROADMAP PROGRESS</span>
              </div>

              <div className="mh-roadmap-graph">
                <div className="mh-roadmap-line" />

                <span />
                <span />
                <span />
                <span />
                <span />
                <span className="mh-roadmap-last" />
              </div>

              <div className="mh-roadmap-bottom">
                <small>Level 12</small>
                <strong>XP+ 750</strong>
              </div>
            </article>

            {/* LEVEL */}

            <div className="mh-level-pill">
              <span className="mh-mini-icon">
                <Crown size={14} />
              </span>

              <div>
                <strong>Level 12</strong>
                <small>UI/UX Design</small>
              </div>
            </div>

            {/* CURRENT MISSION */}

            <article className="mh-career-card mh-mission-card">
              <span className="mh-card-icon">
                <Star size={18} />
              </span>

              <div className="mh-card-copy">
                <small>CURRENT MISSION</small>

                <strong>
                  Build a Personal Portfolio
                </strong>

                <div className="mh-mission-progress">
                  <span>
                    <i />
                  </span>

                  <b>75%</b>
                </div>
              </div>
            </article>

            {/* SKILL UNLOCKED */}

            <article className="mh-career-card mh-skill-card">
              <span className="mh-card-icon">
                <Lightbulb size={18} />
              </span>

              <div className="mh-card-copy">
                <small>SKILL UNLOCKED</small>
                <strong>Problem Solving</strong>
              </div>
            </article>

            {/* PROJECT COMPLETED */}

            <article className="mh-career-card mh-project-card">
              <span className="mh-card-icon">
                <Check size={18} />
              </span>

              <div className="mh-card-copy">
                <small>PROJECT COMPLETED</small>
                <strong>Portfolio Website</strong>

                <div className="mh-project-preview">
                  <Code2 size={21} />

                  <div>
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>
            </article>

            {/* PORTFOLIO BADGE */}

            <article className="mh-career-card mh-badge-card">
              <span className="mh-card-icon">
                <Award size={18} />
              </span>

              <div className="mh-card-copy">
                <small>PORTFOLIO BADGE</small>
                <strong>Rising Creator</strong>
              </div>
            </article>

            {/* =========================================
        FLOATING HEXAGON ICONS
    ========================================= */}

            <span className="mh-orbit-icon mh-orbit-icon--gift">
              <Gift size={22} />
            </span>

            <span className="mh-orbit-icon mh-orbit-icon--star">
              <Star size={21} />
            </span>

            <span className="mh-orbit-icon mh-orbit-icon--code">
              <Code2 size={22} />
            </span>

            <span className="mh-orbit-icon mh-orbit-icon--chart">
              <BarChart3 size={21} />
            </span>

            <span className="mh-orbit-icon mh-orbit-icon--briefcase">
              <BriefcaseBusiness size={21} />
            </span>
          </div>

          <span
            className="mh-student-spark mh-student-spark--one"
            aria-hidden="true"
          />

          <span
            className="mh-student-spark mh-student-spark--two"
            aria-hidden="true"
          />

          <span
            className="mh-student-spark mh-student-spark--three"
            aria-hidden="true"
          />
        </div>
      </div>
      {theme === "light" && <div className="mh-bottom-fade" />}

    </section>
  );
}