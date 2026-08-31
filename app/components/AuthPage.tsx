"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Check,
  Code2,
  Compass,
  GraduationCap,
  LockKeyhole,
  Palette,
  Route,
  Sparkles,
  UserRound,
} from "lucide-react";

import { MentorMeLogo } from "./MentorMeLogo";

type AuthPageProps = {
  mode: "login" | "signup";
};

const journeySteps = [
  "CONFUSION",
  "DIRECTION",
  "SKILLS",
  "PROOF",
];

const personaOptions = [
  {
    id: "student",
    label: "College student",
    description:
      "I’m building skills alongside my degree.",
    icon: GraduationCap,
  },
  {
    id: "graduate",
    label: "Recent graduate",
    description:
      "I’m preparing to become job-ready.",
    icon: UserRound,
  },
  {
    id: "switcher",
    label: "Career switcher",
    description:
      "I’m moving toward a new career path.",
    icon: Route,
  },
  {
    id: "exploring",
    label: "Still exploring",
    description:
      "I want clarity before I commit.",
    icon: Compass,
  },
];

const goalOptions = [
  {
    id: "products",
    label: "Build digital products",
    description:
      "Interfaces, web experiences and products.",
    icon: Code2,
  },
  {
    id: "data-ai",
    label: "Work with data & AI",
    description:
      "Data, automation and intelligent systems.",
    icon: BrainCircuit,
  },
  {
    id: "design",
    label: "Design experiences",
    description:
      "UI, UX and human-centred product design.",
    icon: Palette,
  },
  {
    id: "decide",
    label: "Help me decide",
    description:
      "Show me the direction that fits me best.",
    icon: Compass,
  },
];

export function AuthPage({
  mode,
}: AuthPageProps) {
  const router = useRouter();

  const signup =
    mode === "signup";

  const [step, setStep] =
    useState(1);

  const [persona, setPersona] =
    useState("");

  const [goal, setGoal] =
    useState("");

  const [track, setTrack] =
    useState("frontend");

  const canContinue =
    step === 1
      ? Boolean(persona)
      : step === 3
        ? Boolean(goal)
        : step === 4
          ? Boolean(track)
          : true;

  function submit(
    event:
      React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      signup &&
      step < 5
    ) {
      if (!canContinue) {
        return;
      }

      setStep(
        (current) =>
          current + 1,
      );

      return;
    }

    localStorage.setItem(
      "mentor-auth",
      "true",
    );

    router.push("/dashboard");
  }

  return (
    <main className="auth-page">
      {/* =====================================================
          LEFT VISUAL
          ===================================================== */}

      <section
        className="auth-visual"
        aria-label="MentorMe journey"
      >
        <div
          className="auth-visual-grid"
          aria-hidden="true"
        />

        <div
          className="auth-orbit auth-orbit-one"
          aria-hidden="true"
        />

        <div
          className="auth-orbit auth-orbit-two"
          aria-hidden="true"
        />

        <Link
          href="/"
          className="auth-logo"
          aria-label="MentorMe home"
        >
          <MentorMeLogo />
        </Link>

        <div className="auth-visual-content">
          <div className="auth-visual-kicker">
            <Sparkles size={14} />

            90 LEVELS. ONE VISIBLE PATH.
          </div>

          <h2 className="auth-title">
            <span className="hj-main-heading">
              Your next step
            </span>

            <br />

            <span className="hj-main-heading">
            starts
            </span>{"  "}

            <em className="seen-word">
             here
            </em>

          </h2>

          <p>
            MentorMe turns uncertainty into
            a guided path of learning,
            projects, proof and career-ready
            progress.
          </p>

          <div className="auth-path">
            {journeySteps.map(
              (
                item,
                index,
              ) => (
                <div
                  className="auth-path-item"
                  key={item}
                >
                  <span>
                    {item}
                  </span>

                  {index <
                    journeySteps.length -
                    1 && (
                      <i
                        aria-hidden="true"
                      />
                    )}
                </div>
              ),
            )}
          </div>

          <div className="auth-proof-row">
            <span>
              <Check size={14} />
              First levels free
            </span>

            <span>
              <Check size={14} />
              Project-first progress
            </span>

            <span>
              <Check size={14} />
              Proof you can show
            </span>
          </div>
        </div>

        <blockquote>
          “You don&apos;t need the
          whole answer.
          <br />

          You need the{" "}
          <em>
            next clear step.
          </em>
          ”
        </blockquote>
      </section>

      {/* =====================================================
          RIGHT FORM
          ===================================================== */}

      <section className="auth-form">
        <Link
          className="auth-back"
          href="/"
        >
          <ArrowLeft size={15} />

          Back to MentorMe
        </Link>

        <form
          className="auth-form-inner"
          onSubmit={submit}
        >
          {signup ? (
            <>
              {/* =================================================
                  SIGNUP PROGRESS
                  ================================================= */}

              <div className="auth-step-header">
                <span>
                  STEP {step} OF 5
                </span>

                <div
                  className="auth-step-track"
                  aria-hidden="true"
                >
                  <b
                    style={{
                      width:
                        `${step * 20}%`,
                    }}
                  />
                </div>

                <strong>
                  {step * 20}%
                </strong>
              </div>

              {/* =================================================
                  STEP 1
                  ================================================= */}

              {step === 1 && (
                <div className="auth-step-content">
                  <div className="auth-form-kicker">
                    <Sparkles
                      size={14}
                    />
                    START WITH YOU
                  </div>

                  <h1>
                    Where are you
                    <br />

                    <em>
                      starting from?
                    </em>
                  </h1>

                  <p>
                    We&apos;ll use this
                    to shape the right
                    starting point for
                    your MentorMe
                    journey.
                  </p>

                  <div className="auth-choice-grid">
                    {personaOptions.map(
                      (
                        option,
                      ) => {
                        const Icon =
                          option.icon;

                        const selected =
                          persona ===
                          option.id;

                        return (
                          <button
                            type="button"
                            key={
                              option.id
                            }
                            className={
                              selected
                                ? "is-selected"
                                : ""
                            }
                            aria-pressed={
                              selected
                            }
                            onClick={() =>
                              setPersona(
                                option.id,
                              )
                            }
                          >
                            <span className="auth-choice-icon">
                              <Icon
                                size={
                                  19
                                }
                              />
                            </span>

                            <span>
                              <b>
                                {
                                  option.label
                                }
                              </b>

                              <small>
                                {
                                  option.description
                                }
                              </small>
                            </span>

                            <i className="auth-choice-check">
                              {selected && (
                                <Check
                                  size={
                                    14
                                  }
                                />
                              )}
                            </i>
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>
              )}

              {/* =================================================
                  STEP 2
                  ================================================= */}

              {step === 2 && (
                <div className="auth-step-content">
                  <div className="auth-form-kicker">
                    <Sparkles
                      size={14}
                    />
                    YOUR CURRENT STAGE
                  </div>

                  <h1>
                    What are you
                    <br />

                    <em>
                      learning now?
                    </em>
                  </h1>

                  <p>
                    A little context
                    helps us recommend
                    the right starting
                    level and pace.
                  </p>

                  <div className="auth-fields">
                    <label className="auth-field">
                      <span>
                        Course or degree
                      </span>

                      <input
                        required
                        placeholder="e.g. B.Tech Computer Science"
                      />
                    </label>

                    <label className="auth-field">
                      <span>
                        Current stage
                      </span>

                      <select
                        required
                        defaultValue=""
                      >
                        <option
                          value=""
                          disabled
                        >
                          Select your
                          current stage
                        </option>

                        <option>
                          First year
                        </option>

                        <option>
                          Second year
                        </option>

                        <option>
                          Third year
                        </option>

                        <option>
                          Final year
                        </option>

                        <option>
                          Graduated
                        </option>

                        <option>
                          Not currently
                          studying
                        </option>
                      </select>
                    </label>
                  </div>
                </div>
              )}

              {/* =================================================
                  STEP 3
                  ================================================= */}

              {step === 3 && (
                <div className="auth-step-content">
                  <div className="auth-form-kicker">
                    <Sparkles
                      size={14}
                    />
                    YOUR DIRECTION
                  </div>

                  <h1>
                    What do you want
                    <br />

                    to{" "}
                    <em>
                      move toward?
                    </em>
                  </h1>

                  <p>
                    You can change
                    direction later.
                    Choose what feels
                    closest to your goal
                    right now.
                  </p>

                  <div className="auth-choice-grid">
                    {goalOptions.map(
                      (
                        option,
                      ) => {
                        const Icon =
                          option.icon;

                        const selected =
                          goal ===
                          option.id;

                        return (
                          <button
                            type="button"
                            key={
                              option.id
                            }
                            className={
                              selected
                                ? "is-selected"
                                : ""
                            }
                            aria-pressed={
                              selected
                            }
                            onClick={() =>
                              setGoal(
                                option.id,
                              )
                            }
                          >
                            <span className="auth-choice-icon">
                              <Icon
                                size={
                                  19
                                }
                              />
                            </span>

                            <span>
                              <b>
                                {
                                  option.label
                                }
                              </b>

                              <small>
                                {
                                  option.description
                                }
                              </small>
                            </span>

                            <i className="auth-choice-check">
                              {selected && (
                                <Check
                                  size={
                                    14
                                  }
                                />
                              )}
                            </i>
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>
              )}

              {/* =================================================
                  STEP 4
                  ================================================= */}

              {step === 4 && (
                <div className="auth-step-content">
                  <div className="auth-form-kicker">
                    <Sparkles
                      size={14}
                    />
                    CHOOSE YOUR TRACK
                  </div>

                  <h1>
                    Start with a path
                    <br />

                    built for{" "}
                    <em>
                      proof.
                    </em>
                  </h1>

                  <p>
                    Every track turns
                    learning into visible
                    progress, projects
                    and portfolio
                    evidence.
                  </p>

                  <div className="auth-track-list">
                    <button
                      type="button"
                      className={`auth-track-card ${track ===
                          "frontend"
                          ? "is-selected"
                          : ""
                        }`}
                      onClick={() =>
                        setTrack(
                          "frontend",
                        )
                      }
                    >
                      <span className="auth-track-icon">
                        <Code2
                          size={22}
                        />
                      </span>

                      <span>
                        <b>
                          Frontend
                          Engineer
                        </b>

                        <small>
                          React • Next.js
                          • TypeScript •
                          Projects
                        </small>
                      </span>

                      <em>
                        AVAILABLE
                      </em>

                      <i>
                        <Check
                          size={15}
                        />
                      </i>
                    </button>

                    <div className="auth-track-card is-disabled">
                      <span className="auth-track-icon">
                        <BrainCircuit
                          size={22}
                        />
                      </span>

                      <span>
                        <b>
                          AI &amp; Data
                        </b>

                        <small>
                          Data • Python •
                          AI workflows
                        </small>
                      </span>

                      <em>
                        COMING SOON
                      </em>
                    </div>

                    <div className="auth-track-card is-disabled">
                      <span className="auth-track-icon">
                        <Palette
                          size={22}
                        />
                      </span>

                      <span>
                        <b>
                          UI / UX
                          Designer
                        </b>

                        <small>
                          Research •
                          Systems • Product
                          design
                        </small>
                      </span>

                      <em>
                        COMING SOON
                      </em>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================
                  STEP 5
                  ================================================= */}

              {step === 5 && (
                <div className="auth-step-content auth-unlock">
                  <div className="auth-form-kicker">
                    <Sparkles
                      size={14}
                    />
                    YOUR ROADMAP IS READY
                  </div>

                  <div className="auth-unlock-ring">
                    <span>
                      LEVEL
                    </span>

                    <strong>
                      01
                    </strong>
                  </div>

                  <h1>
                    Your first step
                    <br />

                    is{" "}
                    <em>
                      unlocked.
                    </em>
                  </h1>

                  <p>
                    Career Awareness is
                    ready. Enter your
                    dashboard and start
                    turning direction
                    into measurable
                    progress.
                  </p>

                  <div className="auth-unlock-proof">
                    <span>
                      <Check
                        size={14}
                      />
                      Level 01 unlocked
                    </span>

                    <span>
                      <Check
                        size={14}
                      />
                      Progress tracking
                      ready
                    </span>
                  </div>
                </div>
              )}

              {/* =================================================
                  SIGNUP ACTIONS
                  ================================================= */}

              <div className="auth-step-actions">
                {step > 1 && (
                  <button
                    className="auth-secondary-button"
                    type="button"
                    onClick={() =>
                      setStep(
                        (
                          current,
                        ) =>
                          current -
                          1,
                      )
                    }
                  >
                    <ArrowLeft
                      size={16}
                    />
                    Back
                  </button>
                )}

                <button
                  className="auth-primary-button"
                  type="submit"
                  disabled={
                    !canContinue
                  }
                >
                  {step === 5
                    ? "Enter my dashboard"
                    : "Continue"}

                  <ArrowRight
                    size={17}
                  />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* =================================================
                  LOGIN
                  ================================================= */}

              <div className="auth-form-kicker">
                <Sparkles size={14} />

                WELCOME BACK
              </div>

              <h1 className="auth-title">
                <span className="hj-main-heading">
              Stay on your 
                </span>
                <em className="seen-word">
                path.
                </em>
              </h1>

              <p>
                Your roadmap, progress
                and next mission are
                waiting exactly where
                you left them.
              </p>

              <div className="auth-fields auth-login-fields">
                <label className="auth-field">
                  <span>
                    Email
                  </span>

                  <input
                    required
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="auth-field">
                  <span>
                    Password
                  </span>

                  <input
                    required
                    minLength={8}
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                  />
                </label>
              </div>

              <div className="auth-form-meta">
                <label>
                  <input
                    type="checkbox"
                  />

                  <span>
                    Remember me
                  </span>
                </label>

                <Link href="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              <button
                className="auth-primary-button auth-login-button"
                type="submit"
              >
                Continue journey

                <ArrowRight
                  size={18}
                />
              </button>

              <div className="auth-security">
                <LockKeyhole
                  size={14}
                />

                Secure sign-in. Your
                progress stays synced.
              </div>

              <div className="auth-switch">
                <span>
                  New to MentorMe?
                </span>

                <Link href="/signup">
                  Start your first
                  levels free
                </Link>
              </div>
            </>
          )}
        </form>
      </section>
    </main>
  );
}