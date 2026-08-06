"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import "./HomeJourneySections.css";
import CareerTransformation from "./CareerTransformation";
import LiveCommunity from "./LiveCommunity";
import {
  CSSProperties,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";


const processSteps = [
  {
    number: "01",
    title: "Confusion",
    icon: "?",
    headline: "Name the uncertainty",
    description:
      "Start by identifying what feels unclear, what you enjoy, and what kind of future you want to build.",
  },
  {
    number: "02",
    title: "Direction",
    icon: "⌖",
    headline: "Choose a clear destination",
    description:
      "Select a career direction that fits your strengths, interests, and long-term ambition.",
  },
  {
    number: "03",
    title: "Learning",
    icon: "◇",
    headline: "Build the right skills",
    description:
      "Follow a structured sequence of concepts and guided missions instead of jumping between random resources.",
  },
  {
    number: "04",
    title: "Practice",
    icon: "</>",
    headline: "Turn knowledge into ability",
    description:
      "Apply every skill through focused challenges that make learning practical, repeatable, and measurable.",
  },
  {
    number: "05",
    title: "Projects",
    icon: "▣",
    headline: "Create work that proves it",
    description:
      "Build portfolio-ready projects that show what you can do, not only what you have completed.",
  },
  {
    number: "06",
    title: "Proof",
    icon: "✓",
    headline: "Make progress visible",
    description:
      "Collect projects, milestones, certificates, and outcomes that make your growth easy to understand.",
  },
  {
    number: "07",
    title: "Confidence",
    icon: "★",
    headline: "Move forward with confidence",
    description:
      "Reach opportunities with a clear story, demonstrated ability, and evidence that you are ready.",
  },
];

const firstFiveLevels = [
  {
    number: "01",
    title: "Fundamentals",
    short: "Learn the core concepts",
    description:
      "Build a strong foundation with the essential concepts required for your chosen career path.",
    icon: "</>",
  },
  {
    number: "02",
    title: "Guided Mission",
    short: "Apply it step by step",
    description:
      "Complete a guided practical mission that helps you use what you learned with clear support.",
    icon: "◆",
  },
  {
    number: "03",
    title: "Skill Test",
    short: "Check your understanding",
    description:
      "Take a focused skill test that confirms your understanding before moving to the next stage.",
    icon: "✓",
  },
  {
    number: "04",
    title: "Mentor Review",
    short: "Get feedback and improve",
    description:
      "Receive structured mentor feedback, correct mistakes, and strengthen the way you approach the skill.",
    icon: "◎",
  },
  {
    number: "05",
    title: "First Project",
    short: "Create your first proof",
    description:
      "Build a practical mini project that becomes your first visible piece of career-ready proof.",
    icon: "★",
  },
];

function useReveal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("hj-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return rootRef;
}

function tilt(event: MouseEvent<HTMLElement>) {
  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;

  element.style.setProperty("--rx", `${((0.5 - y) * 9).toFixed(2)}deg`);
  element.style.setProperty("--ry", `${((x - 0.5) * 11).toFixed(2)}deg`);
  element.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
  element.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
}

function resetTilt(event: MouseEvent<HTMLElement>) {
  const element = event.currentTarget;
  element.style.setProperty("--rx", "0deg");
  element.style.setProperty("--ry", "0deg");
  element.style.setProperty("--mx", "50%");
  element.style.setProperty("--my", "50%");
}

function useHomeTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const updateTheme = () => {
      setTheme(
        document.documentElement.dataset.theme === "dark"
          ? "dark"
          : "light",
      );
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

export function HomeJourneySections() {
  const rootRef = useReveal();
  const theme = useHomeTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [activeLevel, setActiveLevel] = useState(0);
  const [roadmapImpact, setRoadmapImpact] = useState(false);
  const [roadmapReturning, setRoadmapReturning] = useState(false);
  const activeProcess = processSteps[activeStep];
  const selectedLevel = firstFiveLevels[activeLevel];

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const schedule = (callback: () => void, delay: number) => {
      timer = window.setTimeout(() => {
        if (!cancelled) callback();
      }, delay);
    };

    const runCycle = (level: number) => {
      if (cancelled) return;

      if (level < firstFiveLevels.length - 1) {
        schedule(() => {
          const nextLevel = level + 1;
          setActiveLevel(nextLevel);
          runCycle(nextLevel);
        }, 2300);
        return;
      }

      schedule(() => {
        setRoadmapImpact(true);

        schedule(() => {
          setRoadmapImpact(false);
          setRoadmapReturning(true);

          schedule(() => {
            setActiveLevel(0);

            schedule(() => {
              setRoadmapReturning(false);
              runCycle(0);
            }, 260);
          }, 220);
        }, 1050);
      }, 2100);
    };

    runCycle(0);

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, []);
  const processProgress =
    processSteps.length <= 1
      ? 0
      : (activeStep / (processSteps.length - 1)) * 100;

  const sparkProgress =
    activeStep === 0 || processSteps.length <= 1
      ? 0
      : ((activeStep - 0.5) / (processSteps.length - 1)) * 100;

  return (
    <div
      className="hj-root"
      ref={rootRef}
      style={
        {
          "--process-progress": `${processProgress}%`,
          "--spark-progress": `${sparkProgress}%`,
        } as CSSProperties
      }
    >
      <motion.section
        className="hj-tracks"
        initial={{ opacity: 0, y: 42, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hj-orb hj-orb-a" />
        <div className="hj-orb hj-orb-b" />

        <div className="hj-shell">
          <div className="hj-scroll-cue" aria-hidden="true">
            <span />
            <i><b /></i>
            <span />
            <small>Scroll</small>
          </div>

          <div className="hj-intro-layout">
            <header className="hj-heading" data-reveal>
              <p>CHOOSE YOUR DIRECTION</p>
              <h2>
                <span className="hj-heading-line hj-heading-line--primary">
                  Choose the path that fits you
                </span>
                <span className="hj-heading-line hj-heading-line--secondary">
                  <span className="hj-heading-wave">Build the proof that opens</span>{" "}
                  <em>doors</em>
                </span>
              </h2>
            </header>
          </div>

          <div className="hj-process" data-reveal>
            <div className="hj-process-line">
              <span className="hj-process-progress" />
              <i
                className={`hj-process-spark ${
                  activeStep === 0 ? "hj-process-spark--hidden" : ""
                }`}
              >
                <b />
                <b />
                <b />
              </i>
            </div>

            <div className="hj-process-steps" role="tablist" aria-label="MentorME career journey">
              {processSteps.map((step, index) => (
                <button
                  key={step.title}
                  type="button"
                  role="tab"
                  aria-selected={activeStep === index}
                  className={activeStep === index ? "hj-process-step is-active" : "hj-process-step"}
                  onMouseEnter={() => setActiveStep(index)}
                  onFocus={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                >
                  <span>{step.number}</span>
                  <i>{step.icon}</i>
                  <b>{step.title}</b>
                </button>
              ))}
            </div>

            <div className="hj-process-detail">
              <div className="hj-process-detail-icon">{activeProcess.icon}</div>
              <div>
                <small>{activeProcess.number} / 07</small>
                <h3>{activeProcess.headline}</h3>
                <p>{activeProcess.description}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="hj-roadmap"
        initial={{ opacity: 0, y: 46, scale: 0.982 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.07 }}
        transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hj-grid-texture" />

        <div className="hj-shell">
          <header className="hj-first-five-heading" data-reveal>
            <p>YOUR FIRST FIVE LEVELS</p>
            <h2>
              Every career begins
              <br />

              <span className="hj-heading-wave">
                with one clear
              </span>{" "}

              <em>step</em>
            </h2>
            <span>
              Complete the first five levels, create your first proof, and
              unlock the complete 90-level journey
            </span>
          </header>

          <div
            className="hj-level-journey"
            data-reveal
            style={
              {
                "--active-level": activeLevel,
              } as CSSProperties
            }
          >
            <div className="hj-level-glow hj-level-glow-a" />
            <div className="hj-level-glow hj-level-glow-b" />
            <div className="hj-level-stars" />

            <div
              className={`hj-climb-scene ${
                roadmapImpact ? "is-impacting" : ""
              }`}
            >
              <div className="hj-climb-status" aria-live="polite">
                <small>LEVEL {selectedLevel.number} / 05</small>
                <strong>{selectedLevel.title}</strong>
                <span>{selectedLevel.description}</span>
              </div>

              <Link
                href="/roadmap"
                className={`hj-climb-goal ${
                  roadmapImpact ? "is-hit" : ""
                }`}
                aria-label="Open the complete MentorME roadmap"
              >
                <span className="hj-goal-label">GOAL</span>
                <strong>FULL ROADMAP</strong>
                <i className="hj-goal-ring hj-goal-ring-one" />
                <i className="hj-goal-ring hj-goal-ring-two" />
                <i className="hj-goal-pulse" />
                <b className="hj-goal-particle hj-goal-particle-1" />
                <b className="hj-goal-particle hj-goal-particle-2" />
                <b className="hj-goal-particle hj-goal-particle-3" />
                <b className="hj-goal-particle hj-goal-particle-4" />
                <b className="hj-goal-particle hj-goal-particle-5" />
                <b className="hj-goal-particle hj-goal-particle-6" />
                <b className="hj-goal-particle hj-goal-particle-7" />
                <b className="hj-goal-particle hj-goal-particle-8" />
              </Link>

              <div
                className={`hj-climb-runner ${
                  roadmapImpact ? "is-goal-bound" : ""
                } ${roadmapReturning ? "is-returning" : ""}`}
                aria-hidden="true"
                style={
                  {
                    "--runner-step": activeLevel,
                  } as CSSProperties
                }
              >
                <span>YOU</span>
                <i />
              </div>

              <div
                className="hj-climb-steps"
                role="tablist"
                aria-label="First five MentorME levels"
              >
                {firstFiveLevels.map((level, index) => (
                  <button
                    key={level.number}
                    type="button"
                    role="tab"
                    aria-selected={activeLevel === index}
                    className={`hj-climb-step ${
                      activeLevel === index ? "is-active" : ""
                    } ${index < activeLevel ? "is-complete" : ""}`}
                    style={
                      {
                        "--step": index,
                        "--delay": `${index * 140}ms`,
                      } as CSSProperties
                    }
                    onMouseEnter={() => {
                      setRoadmapImpact(false);
                      setRoadmapReturning(false);
                      setActiveLevel(index);
                    }}
                    onFocus={() => {
                      setRoadmapImpact(false);
                      setRoadmapReturning(false);
                      setActiveLevel(index);
                    }}
                    onClick={() => {
                      setRoadmapImpact(false);
                      setRoadmapReturning(false);
                      setActiveLevel(index);
                    }}
                  >
                    <span className="hj-climb-step-number">{level.number}</span>
                    <span className="hj-climb-step-icon">{level.icon}</span>
                    <span className="hj-climb-step-copy">
                      <b>{level.title}</b>
                      <small>{level.short}</small>
                    </span>
                    <i className="hj-step-depth" aria-hidden="true" />
                    <i className="hj-step-impact" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </motion.section>

      <motion.section
        className="hj-evolution"
        initial={{ opacity: 0, y: 46, scale: 0.982 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.07 }}
        transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hj-evolution-orb hj-evolution-orb-a" />
        <div className="hj-evolution-orb hj-evolution-orb-b" />

        <div className="hj-shell">
          <header className="hj-evolution-heading" data-reveal>
            <p>WHAT HAPPENS AFTER LEVEL FIVE?</p>
            <h2 className="hj-evolution-title">
              <span>Your journey keeps moving.</span>
              <span>
              <span className="hj-heading-wave">
                Every milestone unlocks
              </span>{" "}
              <em>more</em>
            </span>
            </h2>
            <span>
              Follow the road from guided learning to XP, projects, mentor
              feedback, portfolio proof, and real career opportunities
            </span>
          </header>

          <div className="hj-road-game" data-reveal>
            <div className="hj-road-game-grid" />
            <div className="hj-road-game-stars" />

            <svg
              className="hj-road-svg"
              viewBox="0 0 1500 760"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="hjRoadGlow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8f5cf7" />
                  <stop offset="52%" stopColor="#f2d875" />
                  <stop offset="100%" stopColor="#70d7ff" />
                </linearGradient>

                <filter id="hjRoadBlur" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="9" />
                </filter>
              </defs>

              <path
                className="hj-road-shadow-path"
                d="M120 650
                   C260 650 310 650 390 650
                   C505 650 540 585 540 520
                   C540 450 485 420 420 420
                   C335 420 305 365 305 305
                   C305 230 370 195 470 195
                   C590 195 635 250 635 325
                   C635 410 705 450 800 450
                   C905 450 950 390 950 320
                   C950 230 1030 190 1140 190
                   C1245 190 1320 235 1370 320
                   C1400 370 1400 430 1370 500"
              />

              <path
                className="hj-road-main-path"
                d="M120 650
                   C260 650 310 650 390 650
                   C505 650 540 585 540 520
                   C540 450 485 420 420 420
                   C335 420 305 365 305 305
                   C305 230 370 195 470 195
                   C590 195 635 250 635 325
                   C635 410 705 450 800 450
                   C905 450 950 390 950 320
                   C950 230 1030 190 1140 190
                   C1245 190 1320 235 1370 320
                   C1400 370 1400 430 1370 500"
              />

              <path
                className="hj-road-center-path"
                d="M120 650
                   C260 650 310 650 390 650
                   C505 650 540 585 540 520
                   C540 450 485 420 420 420
                   C335 420 305 365 305 305
                   C305 230 370 195 470 195
                   C590 195 635 250 635 325
                   C635 410 705 450 800 450
                   C905 450 950 390 950 320
                   C950 230 1030 190 1140 190
                   C1245 190 1320 235 1370 320
                   C1400 370 1400 430 1370 500"
              />
            </svg>

            <div className="hj-road-start">
              <small>START</small>
              <strong>LEVEL 06</strong>
            </div>

            <div className="hj-road-finish">
              <i>★</i>
              <div>
                <small>CAREER READY</small>
                <strong>Internship unlocked</strong>
              </div>
              <b className="hj-road-finish-wave" aria-hidden="true" />
            </div>

            <div className="hj-road-runner" aria-hidden="true">
              <span className="hj-runner-head" />
              <span className="hj-runner-body" />
              <span className="hj-runner-arm hj-runner-arm-a" />
              <span className="hj-runner-arm hj-runner-arm-b" />
              <span className="hj-runner-leg hj-runner-leg-a" />
              <span className="hj-runner-leg hj-runner-leg-b" />
              <i className="hj-runner-glow" />

              <div className="hj-runner-float-labels">
                <b className="hj-runner-float hj-runner-float-1">TRACK CHOSEN</b>
                <b className="hj-runner-float hj-runner-float-2">MISSION STARTED</b>
                <b className="hj-runner-float hj-runner-float-3">+120 XP</b>
                <b className="hj-runner-float hj-runner-float-4">PROJECT BUILT</b>
                <b className="hj-runner-float hj-runner-float-5">MENTOR APPROVED</b>
                <b className="hj-runner-float hj-runner-float-6">PORTFOLIO +1</b>
                <b className="hj-runner-float hj-runner-float-7">INTERNSHIP UNLOCKED</b>
              </div>
            </div>

            <div className="hj-road-checkpoints">
              {[
                {
                  number: "01",
                  title: "Choose Track",
                  copy: "Pick your direction",
                  icon: "⌖",
                  reward: "TRACK CHOSEN",
                  className: "hj-road-point-1",
                },
                {
                  number: "02",
                  title: "Guided Mission",
                  copy: "Learn by doing",
                  icon: "◆",
                  reward: "MISSION STARTED",
                  className: "hj-road-point-2",
                },
                {
                  number: "03",
                  title: "Earn XP",
                  copy: "Progress becomes visible",
                  icon: "+XP",
                  reward: "+120 XP",
                  className: "hj-road-point-3",
                },
                {
                  number: "04",
                  title: "Build Project",
                  copy: "Create career proof",
                  icon: "</>",
                  reward: "PROJECT BUILT",
                  className: "hj-road-point-4",
                },
                {
                  number: "05",
                  title: "Mentor Review",
                  copy: "Improve with feedback",
                  icon: "◎",
                  reward: "MENTOR APPROVED",
                  className: "hj-road-point-5",
                },
                {
                  number: "06",
                  title: "Portfolio",
                  copy: "Show what you can do",
                  icon: "▣",
                  reward: "PORTFOLIO +1",
                  className: "hj-road-point-6",
                },
                {
                  number: "07",
                  title: "Opportunity",
                  copy: "Unlock the next door",
                  icon: "★",
                  reward: "OPPORTUNITY UNLOCKED",
                  className: "hj-road-point-7",
                },
              ].map((point, index) => (
                <article
                  key={point.number}
                  className={`hj-road-point ${point.className}`}
                  style={{ "--point-index": index } as CSSProperties}
                >
                  <span className="hj-road-point-number">{point.number}</span>
                  <i className="hj-road-point-icon">{point.icon}</i>
                  <div>
                    <strong>{point.title}</strong>
                    <small>{point.copy}</small>
                  </div>
                  <b className="hj-road-point-pulse" />
                  <b className="hj-road-point-reward">{point.reward}</b>
                </article>
              ))}
            </div>

            <div className="hj-road-progress-badge">
              <span>06 → 90</span>
              <small>THE JOURNEY CONTINUES</small>
            </div>
          </div>
        </div>
      </motion.section>

      <CareerTransformation />
      <LiveCommunity />

      <motion.section
        hidden
        aria-hidden="true"
        className="hj-dashboard-section"
        initial={{ opacity: 0, y: 44, scale: 0.984 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.74, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hj-dashboard-glow hj-dashboard-glow-a" />
        <div className="hj-dashboard-glow hj-dashboard-glow-b" />

        <div className="hj-shell">
          <header className="hj-dashboard-heading" data-reveal>
            <p>YOUR PROGRESS, MADE VISIBLE</p>
            <h2>
              A dashboard that shows
              <br />
              how far you have <em>come.</em>
            </h2>
            <span>
              Levels, XP, projects, mentor reviews, streaks, and readiness—
              everything in one clear view.
            </span>
          </header>

          <div className="hj-dashboard" data-reveal>
            <div className="hj-dashboard-topbar">
              <div>
                <small>MENTORME STUDENT DASHBOARD</small>
                <strong>Frontend Developer Journey</strong>
              </div>
              <span className="hj-dashboard-status">
                <i />
                ACTIVE JOURNEY
              </span>
            </div>

            <div className="hj-dashboard-grid">
              <article className="hj-dashboard-level">
                <small>CURRENT LEVEL</small>
                <div className="hj-level-number">27</div>
                <strong>Responsive Applications</strong>
                <span>63 of 90 missions completed</span>

                <div className="hj-dashboard-progress">
                  <i />
                </div>

                <div className="hj-dashboard-progress-meta">
                  <span>Journey progress</span>
                  <b>70%</b>
                </div>
              </article>

              <article className="hj-dashboard-xp">
                <small>TOTAL XP</small>
                <strong>
                  <span className="hj-counter">4,250</span>
                  <i>XP</i>
                </strong>
                <div className="hj-xp-ring">
                  <span>+320</span>
                  <small>THIS WEEK</small>
                </div>
              </article>

              <article className="hj-dashboard-readiness">
                <small>CAREER READINESS</small>
                <div className="hj-readiness-ring">
                  <span>87%</span>
                </div>
                <strong>Interview ready</strong>
                <span>Portfolio and skills are on track.</span>
              </article>

              <article className="hj-dashboard-project">
                <div className="hj-dashboard-card-head">
                  <div>
                    <small>LATEST PROJECT</small>
                    <strong>Career Analytics Dashboard</strong>
                  </div>
                  <span>MENTOR APPROVED</span>
                </div>

                <div className="hj-project-preview">
                  <div className="hj-preview-sidebar">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="hj-preview-main">
                    <div className="hj-preview-bars">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="hj-preview-line" />
                  </div>
                </div>

                <div className="hj-project-stack">
                  <span>Next.js</span>
                  <span>TypeScript</span>
                  <span>API</span>
                  <span>Responsive UI</span>
                </div>
              </article>

              <article className="hj-dashboard-activity">
                <small>RECENT ACTIVITY</small>

                <div className="hj-activity-row">
                  <i>✓</i>
                  <div>
                    <strong>Mentor review completed</strong>
                    <span>Project quality improved to 92%</span>
                  </div>
                  <b>+120 XP</b>
                </div>

                <div className="hj-activity-row">
                  <i>★</i>
                  <div>
                    <strong>Builder badge unlocked</strong>
                    <span>Completed five practical projects</span>
                  </div>
                  <b>NEW</b>
                </div>

                <div className="hj-activity-row">
                  <i>↗</i>
                  <div>
                    <strong>Portfolio score increased</strong>
                    <span>Your profile is becoming opportunity-ready</span>
                  </div>
                  <b>92%</b>
                </div>
              </article>

              <article className="hj-dashboard-stats">
                <div>
                  <strong>9</strong>
                  <span>Projects</span>
                </div>
                <div>
                  <strong>12</strong>
                  <span>Day streak</span>
                </div>
                <div>
                  <strong>18</strong>
                  <span>Mentor reviews</span>
                </div>
                <div>
                  <strong>6</strong>
                  <span>Badges</span>
                </div>
              </article>
            </div>
          </div>

          <div className="hj-dashboard-cta" data-reveal>
            <div>
              <small>YOUR FIRST FIVE LEVELS ARE FREE</small>
              <h3>Start with one level. Build toward a career.</h3>
            </div>
            <Link href="/signup" className="hj-final-button">
              Start your journey <span>→</span>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}