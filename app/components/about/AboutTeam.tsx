"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { team } from "./aboutData";
import styles from "./AboutTeam.module.css";

export default function AboutTeam() {
  const [activeMember, setActiveMember] = useState<number | null>(null);

  return (
    <section className={styles.section} aria-labelledby="about-team-heading">
      <div className={styles.content}>
        <header className={styles.heading}>
          <div className={styles.kicker}>
            {/* <Sparkles size={15} />
            THE PEOPLE BEHIND MENTORME */}
          </div>

          <h2 id="about-team-heading">
            <span className="hj-main-heading">Built by people who believe</span>
            <span className={`${styles.secondaryLine} text-4xl xl:text-6xl`}>
              <span className="hj-main-heading hj-heading-wave">clarity should come</span>{" "}
              <em className="seen-word">first.</em>
            </span>
          </h2>

          <p>
            MentorMe is being built by working IT professionals who understand
            both the technology behind modern products and the uncertainty
            students face while building a career.
          </p>
        </header>

        <div className={styles.grid}>
          {team.map((member, index) => (
            <article
              className={`${styles.card} ${
                activeMember === index ? styles.cardActive : ""
              }`}
              key={member.name}
              role="button"
              tabIndex={0}
              aria-pressed={activeMember === index}
              aria-label={`${member.name}, ${member.role}. Select team profile`}
              onClick={() =>
                setActiveMember(activeMember === index ? null : index)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveMember(activeMember === index ? null : index);
                }
              }}
            >
              <span className={styles.cardSignal} aria-hidden="true" />

              <div className={styles.cardInner}>
                <div className={`${styles.cardFace} ${styles.cardFront}`}>
                  <div className={styles.identityPanel}>
                    <div className={styles.monogram} aria-hidden="true">
                      <span>{member.initials}</span>
                      <i />
                    </div>

                    <div className={styles.identityCopy}>
                      <small>{member.role}</small>
                      <h3>{member.name}</h3>
                      <em>TEAM 0{index + 1}</em>
                    </div>

                    <span className={styles.selectHint} aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>

                <div className={`${styles.cardFace} ${styles.cardBack}`}>
                  <div className={styles.backHeader}>
                    <span>{member.initials}</span>

                    <div>
                      <small>{member.role}</small>
                      <h3>{member.name}</h3>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <small>PROFILE</small>
                    <p>{member.bio}</p>

                    <div className={styles.cardFooter}>
                      <span>MentorMe team</span>
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
