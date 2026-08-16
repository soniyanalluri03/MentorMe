"use client";

import React from "react";

const team = [
  {
    role: "FOUNDER",
    name: "Nalluri Soniya",
    initials: "NS",
    photo: "/team/nalluri-soniya.png",
    bio:
      "Founder of MentorMe and a working IT professional with hands-on experience across frontend, backend, databases and modern frameworks. She created the vision for MentorMe after seeing how often students struggle to connect learning with a clear career direction. She leads product thinking, the learning experience and the technical foundation, keeping MentorMe focused on practical growth students can understand, build and prove.",
  },
  {
    role: "CO-FOUNDER",
    name: "Talluri Jayanth",
    initials: "TJ",
    photo: "/team/talluri-jayanth.png",
    bio:
      "Co-Founder and working IT professional with experience across frontend, backend, databases, real-time production systems, AI chatbots, LLMs and applied AI. He helped turn the MentorMe idea into a structured product by shaping the architecture, building core features and connecting practical learning with modern AI-driven experiences. His focus is making the platform useful, scalable and relevant to real technical careers.",
  },
  {
    role: "CHIEF EXECUTIVE OFFICER",
    name: "Dondamuri Sumanth",
    initials: "DS",
    photo: "/team/dondamuri-sumanth.png",
    bio:
      "CEO and working IT professional with practical experience across frontend, backend and databases. He works closely with the founding team on development, implementation and code while also contributing to execution and product decisions. He helps carry MentorMe from idea to delivery by keeping technical quality, usability and long-term growth aligned.",
  },
];

const reviews = [
  {
    number: "01",
    type: "STUDENT",
    quote:
      "MentorMe helped me stop jumping between random courses. I finally understood what deserved my attention and what I should work on next.",
  },
  {
    number: "02",
    type: "LEARNER",
    quote:
      "The journey feels achievable because progress is broken into useful steps. I can see what I have completed and where I am going next.",
  },
  {
    number: "03",
    type: "STUDENT",
    quote:
      "Learning finally leads somewhere. I practise, build something useful and leave each stage with proof of what I can actually do.",
  },
];

export function AboutExperience() {
  return (
    <main className="about-experience">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="mm-about-hero">
        <div className="mm-about-shell">
          <h1 className="mm-about-hero__headline">
            Stop scrolling <em>Start building your future</em>
          </h1>

          <div className="mm-faded-copy mm-about-hero__statement">
            MentorMe turns career uncertainty into a clear path of skills,
            practice, projects and visible progress — so you always know what
            to do next.
          </div>

          <div className="mm-career-flow">
            <div className="mm-career-stage mm-career-stage--muted">
              <span>01</span>
              <strong>CONFUSED</strong>
            </div>

            <div className="mm-career-connector">
              <i />
            </div>

            <div className="mm-career-stage">
              <span>02</span>
              <strong>DIRECTION</strong>
            </div>

            <div className="mm-career-connector">
              <i />
            </div>

            <div className="mm-career-stage mm-career-stage--focus">
              <span>03</span>
              <strong>SKILLS</strong>
            </div>

            <div className="mm-career-connector">
              <i />
            </div>

            <div className="mm-career-stage">
              <span>04</span>
              <strong>PROOF</strong>
            </div>

            <div className="mm-career-connector">
              <i />
            </div>

            <div className="mm-career-stage mm-career-stage--ready">
              <span>05</span>
              <strong>READY</strong>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CAREER JOURNEY
      ====================================================== */}

      <section className="mm-about-section mm-overview-section">
        <div className="mm-about-shell mm-overview-shell">
          <div className="mm-overview-layout">
            <div className="mm-overview-copy">
              <h2 className="mm-overview-title mm-gold-wave-heading">
                A career journey{" "}
                <em>with a next step</em>
              </h2>

              <div className="mm-faded-copy mm-overview-statement">
                There is already enough content on the internet. MentorMe helps
                you focus on what actually matters by connecting direction,
                learning, practice, projects and proof into one guided journey.
              </div>
            </div>

            <div className="mm-skills-open">
              <div className="mm-skills-open__glow" />

              <div className="mm-skills-orbit mm-skills-orbit--outer" />
              <div className="mm-skills-orbit mm-skills-orbit--middle" />
              <div className="mm-skills-orbit mm-skills-orbit--inner" />

              <div className="mm-skills-core">
                <small>YOUR</small>
                <strong>SKILLS</strong>
                <em>grow here</em>
              </div>

              <div className="mm-skill-float mm-skill-float--learn">
                <span>⌁</span>
                Learn
              </div>

              <div className="mm-skill-float mm-skill-float--practice">
                <span>⌘</span>
                Practice
              </div>

              <div className="mm-skill-float mm-skill-float--projects">
                <span>◇</span>
                Projects
              </div>

              <div className="mm-skill-float mm-skill-float--direction">
                <span>◎</span>
                Direction
              </div>

              <div className="mm-skill-float mm-skill-float--proof">
                <span>✓</span>
                Proof
              </div>

              <div className="mm-skill-float mm-skill-float--growth">
                <span>↗</span>
                Growth
              </div>

              <span className="mm-skill-particle mm-skill-particle--1" />
              <span className="mm-skill-particle mm-skill-particle--2" />
              <span className="mm-skill-particle mm-skill-particle--3" />
              <span className="mm-skill-particle mm-skill-particle--4" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY WE BUILT IT
      ====================================================== */}

      <section className="mm-about-section mm-story-section">
        <div className="mm-about-shell">
          <div className="mm-story-heading">
            <h2>We kept hearing one question</h2>

            <div className="mm-story-question">
              “What should I <em>do next?</em>”
            </div>

            <div className="mm-faded-copy mm-story-intro">
              Students did not need another pile of information. They needed a
              clearer way to decide what mattered, take action and know they
              were moving forward.
            </div>
          </div>

          <div className="mm-sticky-wall">
            <div className="mm-wall-line mm-wall-line--one" />
            <div className="mm-wall-line mm-wall-line--two" />

            <article className="mm-sticky-note mm-sticky-note--one">
              <span className="mm-note-pin" />

              <small>THE OLD LOOP</small>

              <h3>
                Save
                <br />
                Search
                <br />
                Start again
              </h3>

              <p>
                More tabs. More playlists. More information — but still no
                clear direction.
              </p>

              <span className="mm-note-scribble">?</span>
            </article>

            <article className="mm-sticky-note mm-sticky-note--two">
              <span className="mm-note-pin" />

              <small>THE REAL PROBLEM</small>

              <h3>Information was never the missing piece</h3>

              <p>
                Students needed sequence — a simple answer to what should come
                next.
              </p>

              <span className="mm-note-scribble">→</span>
            </article>

            <article className="mm-sticky-note mm-sticky-note--three">
              <span className="mm-note-pin" />

              <small>THE MENTORME IDEA</small>

              <h3>Make the next useful step obvious</h3>

              <p>
                Learn something useful. Practise it. Build with it. Prove it.
                Then keep moving.
              </p>

              <span className="mm-note-scribble">✓</span>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROGRESS
      ====================================================== */}

      <section className="mm-about-section mm-progress-section">
        <div className="mm-about-shell">
          <div className="mm-progress-heading">
            <h2 className="mm-gold-wave-heading">
              Small steps <em>Real momentum</em>
            </h2>

            <div className="mm-faded-copy mm-progress-copy">
              Careers are not built in one giant leap. Progress happens when
              one useful action is repeated until knowledge becomes skill,
              skill becomes proof and proof becomes confidence.
            </div>
          </div>

          <div className="mm-progress-animation">
            <div className="mm-progress-now">
              <div className="mm-progress-caption">
                <strong>START SMALL</strong>
                <span>One useful action today.</span>
              </div>

              <div className="mm-drop-zone">
                <span className="mm-water-drop mm-water-drop--1" />
                <span className="mm-water-drop mm-water-drop--2" />
                <span className="mm-water-drop mm-water-drop--3" />
                <span className="mm-water-drop mm-water-drop--4" />
                <span className="mm-water-drop mm-water-drop--5" />

                <div className="mm-progress-jar">
                  <div className="mm-progress-jar__rim" />

                  <div className="mm-progress-liquid">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="mm-progress-jar__shine" />

                  <strong>1%</strong>
                </div>
              </div>

              <p>Small enough to start.</p>
            </div>

            <div className="mm-progress-flow">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="mm-progress-later">
              <div className="mm-progress-caption">
                <strong>KEEP GOING</strong>
                <span>Let useful work compound.</span>
              </div>

              <div className="mm-overflow-scene">
                <div className="mm-overflow-jars">
                  <div className="mm-mini-jar mm-mini-jar--1">
                    <i />
                    <b className="mm-jar-overflow mm-jar-overflow--left" />
                    <b className="mm-jar-overflow mm-jar-overflow--right" />
                  </div>

                  <div className="mm-mini-jar mm-mini-jar--2">
                    <i />
                    <b className="mm-jar-overflow mm-jar-overflow--left" />
                    <b className="mm-jar-overflow mm-jar-overflow--right" />
                  </div>

                  <div className="mm-mini-jar mm-mini-jar--3">
                    <i />
                    <b className="mm-jar-overflow mm-jar-overflow--left" />
                    <b className="mm-jar-overflow mm-jar-overflow--right" />
                  </div>

                  <div className="mm-mini-jar mm-mini-jar--4">
                    <i />
                    <b className="mm-jar-overflow mm-jar-overflow--left" />
                    <b className="mm-jar-overflow mm-jar-overflow--right" />
                  </div>

                  <div className="mm-mini-jar mm-mini-jar--5">
                    <i />
                    <b className="mm-jar-overflow mm-jar-overflow--left" />
                    <b className="mm-jar-overflow mm-jar-overflow--right" />
                  </div>
                </div>

                <span className="mm-falling-overflow mm-falling-overflow--1" />
                <span className="mm-falling-overflow mm-falling-overflow--2" />
                <span className="mm-falling-overflow mm-falling-overflow--3" />
                <span className="mm-falling-overflow mm-falling-overflow--4" />

                <div className="mm-overflow-puddle" />
              </div>

              <strong className="mm-momentum-word">Momentum</strong>

              <p className="mm-momentum-copy">
                Small actions become visible progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TEAM
      ====================================================== */}

      <section className="mm-about-section mm-team-section">
        <div className="mm-about-shell">
          <div className="mm-team-heading">
            <h2 className="mm-gold-wave-heading">
              Built by people who believe{" "}
              <em>clarity should come first</em>
            </h2>

            <div className="mm-faded-copy mm-team-intro">
              MentorMe is being built by working IT professionals who understand both
              the technology behind modern products and the uncertainty students face
              while building a career. We combine software development, real-world
              production experience and practical learning into one goal: make every
              next step clearer, more useful and easier to prove.
            </div>
          </div>

          <div className="mm-team-grid">
            {team.map((member) => (
              <article className="mm-profile-card" key={member.name}>
                <span className="mm-profile-mark">✦</span>
                <div className="mm-profile-pic">
                  <div className="mm-profile-photo-wrap">
                    <span className="mm-profile-fallback">
                      {member.initials}
                    </span>

                    <div
                      className="mm-profile-photo"
                      role="img"
                      aria-label={`${member.name} — ${member.role}`}
                      style={{
                        backgroundImage: `url("${member.photo}")`,
                      }}
                    />
                  </div>
                </div>

                <div className="mm-profile-bottom">
                  <div className="mm-profile-content">
                    <small className="mm-profile-role">
                      {member.role}
                    </small>

                    <span className="mm-profile-name">
                      {member.name}
                    </span>

                    <span className="mm-profile-about">
                      {member.bio}
                    </span>
                  </div>

                  <div className="mm-profile-bottom-row">
                    <div className="mm-profile-bottom-identity">
                      <small>{member.role}</small>
                      <strong>{member.name}</strong>
                    </div>

                    <span className="mm-profile-arrow">
                      ↗
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          REVIEWS
      ====================================================== */}

      <section className="mm-about-section mm-reviews-section">
        <div className="mm-about-shell">
          <div className="mm-reviews-heading">
            <h2 className="mm-gold-wave-heading">
              Clear steps create{" "}
              <em>real momentum</em>
            </h2>

            <div className="mm-faded-copy mm-reviews-intro">
              The strongest sign that a learning journey works is not how much
              content it contains. It is whether students know what to do next
              and can see what they have achieved.
            </div>
          </div>

          <div className="mm-review-grid">
            {reviews.map((review) => (
              <article
                className="mm-review-card"
                key={review.number}
              >
                <div className="mm-study-visual">
                  <div className="mm-study-book">
                    <div className="mm-study-book__spine" />

                    <div className="mm-study-book__cover">
                      <span>me</span>
                      <small>LEARN</small>
                    </div>
                  </div>

                  <div className="mm-study-card mm-study-card--one">
                    <span>01</span>
                    <strong>LEARN</strong>
                    <i />
                    <i />
                  </div>

                  <div className="mm-study-card mm-study-card--two">
                    <span>02</span>
                    <strong>PRACTISE</strong>
                    <i />
                    <i />
                  </div>

                  <div className="mm-study-card mm-study-card--three">
                    <span>03</span>
                    <strong>BUILD</strong>
                    <i />
                    <i />
                  </div>

                  <div className="mm-study-pencil" />
                </div>

                <div className="mm-review-content">
                  <div className="mm-review-stars">
                    ★★★★★
                  </div>

                  <blockquote>
                    “{review.quote}”
                  </blockquote>

                  <footer>
                    <span>{review.number}</span>

                    <div>
                      <strong>{review.type}</strong>
                      <small>MentorMe journey</small>
                    </div>
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
