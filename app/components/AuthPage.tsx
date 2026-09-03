"use client";
import { MentorMeLogo } from "./MentorMeLogo";
import courseHeroStyles from "./courses/CoursesHero.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ArrowIcon } from "./MentorIcons";

import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  User,
} from "lucide-react";


type AuthPageProps = {
  mode: "login" | "signup";
};

const journeySteps = [
  "CONFUSION",
  "DIRECTION",
  "SKILLS",
  "PROOF",
  "READY",
];

export function AuthPage({
  mode,
}: AuthPageProps) {
  const router = useRouter();

  const signup = mode === "signup";

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  function submit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

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
            90 LEVELS. ONE VISIBLE PATH.
          </div>

          <h2 className="auth-title">
            <span className="hj-main-heading">
              Your next step
            </span>

            <br />

            <span className=" text-4xl xl:text-6xl hj-main-heading hj-heading-wave">
              Starts
            </span>{" "}

            <em className="seen-word text-4xl xl:text-6xl">
              here
            </em>
          </h2>

          <div className="auth-course-description">
            <span className={courseHeroStyles.heroDescription}>
              From uncertainty to career-ready progress.
            </span>
          </div>

          {/* =================================================
              JOURNEY
          ================================================= */}

          <div className="auth-path">
            {journeySteps.map(
              (item, index) => (
                <div
                  className="auth-path-item"
                  key={item}
                >
                  <span>{item}</span>

                  {index <
                    journeySteps.length -
                    1 && (
                      <span
                        className="auth-path-connector"
                        aria-hidden="true"
                      >
                        <i />

                        <ArrowIcon
                          size={14}
                        />
                      </span>
                    )}
                </div>
              ),
            )}
          </div>

          {/* =================================================
              PILLS
          ================================================= */}

          <div className="auth-hero-pills">
            <span className="hj-highlight-pill hj-highlight-pill--gold auth-fixed-pill">
              First levels free
            </span>

            <span className="hj-highlight-pill hj-highlight-pill--purple auth-fixed-pill">
              Project-first progress
            </span>

            <span className="hj-highlight-pill hj-highlight-pill--blue auth-fixed-pill">
              Proof you can show
            </span>
          </div>
        </div>

        {/* ===================================================
            QUOTE
        =================================================== */}

        <blockquote>
          “You don&apos;t need the whole
          answer.
          <br />
          You need the{" "}
          <em>next clear step.</em>”
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
                  SIGNUP
              ================================================= */}

              <div className="auth-form-kicker">
                <Sparkles size={15} />
                WELCOME TO MENTORME
              </div>

              <h1 className="auth-title">
                <span className="hj-main-heading">
                  Create your account
                </span>

                <br />

                {/* <em className="seen-word">
                  Start your journey.
                </em> */}
              </h1>

              {/* <p>
                Your roadmap, progress and next
                mission are waiting exactly where
                you need them.
              </p> */}

              {/* =================================================
                  SIGNUP FIELDS
              ================================================= */}

              <div className="auth-fields auth-login-fields">
                {/* FULL NAME */}

                <label className="auth-field">
                  <span>FULL NAME</span>

                  <div className="auth-input-wrap">
                    <User
                      className="auth-input-icon"
                      size={19}
                    />

                    <input
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Enter your full name"
                    />
                  </div>
                </label>

                {/* EMAIL */}

                <label className="auth-field">
                  <span>EMAIL ADDRESS</span>

                  <div className="auth-input-wrap">
                    <Mail
                      className="auth-input-icon"
                      size={19}
                    />

                    <input
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                    />
                  </div>
                </label>

                {/* PASSWORD */}

                <label className="auth-field">
                  <span>PASSWORD</span>

                  <div className="auth-input-wrap">
                    <LockKeyhole
                      className="auth-input-icon"
                      size={19}
                    />

                    <input
                      required
                      minLength={8}
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="new-password"
                      placeholder="Create a strong password"
                    />

                    <button
                      type="button"
                      className="auth-password-toggle"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      onClick={() =>
                        setShowPassword(
                          (current) =>
                            !current,
                        )
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </label>

                {/* CONFIRM PASSWORD */}

                <label className="auth-field">
                  <span>
                    CONFIRM PASSWORD
                  </span>

                  <div className="auth-input-wrap">
                    <LockKeyhole
                      className="auth-input-icon"
                      size={19}
                    />

                    <input
                      required
                      minLength={8}
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="new-password"
                      placeholder="Confirm your password"
                    />

                    <button
                      type="button"
                      className="auth-password-toggle"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      onClick={() =>
                        setShowConfirmPassword(
                          (current) =>
                            !current,
                        )
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </label>
              </div>

              {/* =================================================
                  REMEMBER + FORGOT
              ================================================= */}

              <div className="auth-form-meta">
                <label>
                  <input type="checkbox" />

                  <span>
                    Remember me
                  </span>
                </label>

                <Link href="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              {/* =================================================
                  CREATE ACCOUNT
              ================================================= */}

              <button
                type="submit"
                className="auth-primary-button auth-login-button"
              >
                Create my account

                <ArrowRight size={21} />
              </button>

              {/* =================================================
                  SECURITY
              ================================================= */}

              <div className="auth-security">
                <LockKeyhole size={14} />

                Secure sign-up. Your progress
                stays synced.
              </div>

              {/* =================================================
                  SIGN IN
              ================================================= */}

              <div className="auth-switch">
                <span>
                  Already have an account?
                </span>

                <Link href="/login">
                  Sign in
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* =================================================
                  LOGIN
              ================================================= */}

              <div className="auth-form-kicker">
                <Sparkles size={15} />
                WELCOME BACK
              </div>

              <h1 className="auth-title">
                <span className="hj-main-heading">
                  Stay on your
                </span>{" "}

                <em className="seen-word">
                  path.
                </em>
              </h1>

              <p>
                Your roadmap, progress and next
                mission are waiting exactly where
                you left them.
              </p>

              {/* =================================================
                  LOGIN FIELDS
              ================================================= */}

              <div className="auth-fields auth-login-fields">
                {/* EMAIL */}

                <label className="auth-field">
                  <span>EMAIL ADDRESS</span>

                  <div className="auth-input-wrap">
                    <Mail
                      className="auth-input-icon"
                      size={19}
                    />

                    <input
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                    />
                  </div>
                </label>

                {/* PASSWORD */}

                <label className="auth-field">
                  <span>PASSWORD</span>

                  <div className="auth-input-wrap">
                    <LockKeyhole
                      className="auth-input-icon"
                      size={19}
                    />

                    <input
                      required
                      minLength={8}
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="current-password"
                      placeholder="Enter your password"
                    />

                    <button
                      type="button"
                      className="auth-password-toggle"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      onClick={() =>
                        setShowPassword(
                          (current) =>
                            !current,
                        )
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </label>
              </div>

              {/* =================================================
                  LOGIN META
              ================================================= */}

              <div className="auth-form-meta">
                <label>
                  <input type="checkbox" />

                  <span>
                    Remember me
                  </span>
                </label>

                <Link href="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              {/* =================================================
                  LOGIN BUTTON
              ================================================= */}

              <button
                type="submit"
                className="auth-primary-button auth-login-button"
              >
                Continue journey

                <ArrowRight size={19} />
              </button>

              {/* =================================================
                  SECURITY
              ================================================= */}

              <div className="auth-security">
                <LockKeyhole size={14} />

                Secure sign-in. Your progress
                stays synced.
              </div>

              {/* =================================================
                  SIGNUP LINK
              ================================================= */}

              <div className="auth-switch">
                <span>
                  New to MentorMe?
                </span>

                <Link href="/signup">
                  Create your account
                </Link>
              </div>
            </>
          )}
        </form>
      </section>
    </main>
  );
}