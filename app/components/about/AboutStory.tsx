import { ArrowUpRight, Sparkles } from "lucide-react";
import { storyCards } from "./aboutData";
import styles from "./AboutStory.module.css";

export default function AboutStory() {
  return (
    <section className={styles.section} aria-labelledby="about-story-heading">
      <div className={styles.content}>
        <header className={styles.heading}>
          <div className={styles.kicker}>
            {/* <Sparkles size={15} />
            WHY WE BUILT IT */}
          </div>

          <h2 id="about-story-heading">
            <span className="hj-main-heading">We kept hearing</span>
            <span className={`${styles.secondaryLine} text-4xl xl:text-6xl`}>
              <span className="hj-main-heading hj-heading-wave">one</span>{" "}
              <em className="seen-word">question.</em>
            </span>
          </h2>

          <p>
            Students did not need another pile of information. They needed a
            clearer way to decide what mattered, take action and know they were
            moving forward.
          </p>
        </header>

        <div className={styles.grid}>
          {storyCards.map((card) => (
            <article className={styles.card} key={card.number}>
              <div className={styles.cardTop}>
                <span>{card.number}</span>
                <ArrowUpRight size={18} />
              </div>
              <small>{card.eyebrow}</small>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <strong aria-hidden="true">{card.mark}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}