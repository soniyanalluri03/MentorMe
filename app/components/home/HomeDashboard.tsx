"use client";

import Link from "next/link";

export default function HomeDashboard() {
  return (
<section

        hidden

        aria-hidden="true"

        className="hj-dashboard-section"

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

      </section>
  );
}
