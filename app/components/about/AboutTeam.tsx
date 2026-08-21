import { ArrowUpRight, Sparkles } from "lucide-react";
import { team } from "./aboutData";
import styles from "./AboutTeam.module.css";

export default function AboutTeam() {
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
          {team.map((member) => (
            <article className={styles.card} key={member.name}>
              <div
                className={styles.photo}
                style={{ backgroundImage: `url("${member.photo}")` }}
                role="img"
                aria-label={`${member.name} — ${member.role}`}
              >
                <span>{member.initials}</span>
              </div>

              <div className={styles.cardBody}>
                <small>{member.role}</small>
                <h3>{member.name}</h3>
                <p>{member.bio}</p>

                <div className={styles.cardFooter}>
                  <span>MentorMe team</span>
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}