"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { team } from "./aboutData";
import styles from "./AboutTeam.module.css";

export default function AboutTeam() {
  const [activeMember, setActiveMember] =
    useState<number | null>(null);

  const toggleMember = (index: number) => {
    setActiveMember((current) =>
      current === index ? null : index
    );
  };

  return (
    <section
      className={styles.section}
      aria-labelledby="about-team-heading"
    >
      <div className={styles.content}>
        {/* =====================================================
            SHARED GLOBAL HEADING
        ===================================================== */}

        <header className="hj-first-five-heading">
          <h2 id="about-team-heading">
            Built by people who believe
            <br />

            <span className="hj-heading-wave text-4xl xl:text-6xl">
              clarity should come
            </span>{" "}

            <em className="text-4xl xl:text-6xl">
              first.
            </em>
          </h2>

          <span>
            MentorMe is being built by working IT professionals
            who understand both the technology behind modern
            products and the uncertainty students face while
            building a career.
          </span>
        </header>

        {/* =====================================================
            TEAM GRID
        ===================================================== */}

        <div className={styles.grid}>
          {team.map((member, index) => {
            const isActive =
              activeMember === index;

            return (
              <article
                key={member.name}
                className={`${styles.card} ${
                  isActive
                    ? styles.cardActive
                    : ""
                }`}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`${member.name}, ${member.role}. Select team profile`}
                onClick={() =>
                  toggleMember(index)
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    toggleMember(index);
                  }
                }}
              >
                <span
                  className={styles.cardSignal}
                  aria-hidden="true"
                />

                <div className={styles.cardInner}>
                  {/* ===========================================
                      FRONT
                  =========================================== */}

                  <div
                    className={`${styles.cardFace} ${styles.cardFront}`}
                  >
                    <div className={styles.identityPanel}>
                      <div
                        className={styles.monogram}
                        aria-hidden="true"
                      >
                        <span>
                          {member.initials}
                        </span>

                        <i />
                      </div>

                      <div className={styles.identityCopy}>
                        <small>
                          {member.role}
                        </small>

                        <h3>
                          {member.name}
                        </h3>

                        <em>
                          TEAM 0{index + 1}
                        </em>
                      </div>

                      <span
                        className={styles.selectHint}
                        aria-hidden="true"
                      >
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>

                  {/* ===========================================
                      BACK
                  =========================================== */}

                  <div
                    className={`${styles.cardFace} ${styles.cardBack}`}
                  >
                    <div className={styles.backHeader}>
                      <span>
                        {member.initials}
                      </span>

                      <div>
                        <small>
                          {member.role}
                        </small>

                        <h3>
                          {member.name}
                        </h3>
                      </div>
                    </div>

                    <div className={styles.cardBody}>
                      <small>
                        PROFILE
                      </small>

                      <p>
                        {member.bio}
                      </p>

                      <div className={styles.cardFooter}>
                        <span>
                          MentorMe team
                        </span>

                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}