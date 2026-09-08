import { ArrowUpRight } from "lucide-react";

import { storyCards } from "./aboutData";
import styles from "./AboutStory.module.css";

export default function AboutStory() {
  return (
    <section
      className={styles.section}
      aria-labelledby="about-story-heading"
    >
      <div className={styles.content}>
        {/* =====================================================
            SHARED GLOBAL HEADING
        ===================================================== */}

        <header className="hj-first-five-heading">
          <h2 id="about-story-heading">
            We kept hearing
            <br />

            <span className="hj-heading-wave text-4xl xl:text-6xl">
              one
            </span>{" "}

            <em className="text-4xl xl:text-6xl">
              question.
            </em>
          </h2>

          <span>
            Students did not need another pile of information.
            They needed a clearer way to decide what mattered,
            take action and know they were moving forward.
          </span>
        </header>

        {/* =====================================================
            STORY CARDS
        ===================================================== */}

        <div className={styles.grid}>
          {storyCards.map((card) => (
            <article
              className={styles.card}
              key={card.number}
            >
              <div className={styles.cardTop}>
                <span>
                  {card.number}
                </span>

                <ArrowUpRight size={18} />
              </div>

              <small>
                {card.eyebrow}
              </small>

              <h3>
                {card.title}
              </h3>

              <p>
                {card.description}
              </p>

              <strong aria-hidden="true">
                {card.mark}
              </strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}