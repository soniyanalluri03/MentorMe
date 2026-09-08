import { BookOpen } from "lucide-react";

import { reviews } from "./aboutData";
import styles from "./AboutReviews.module.css";

export default function AboutReviews() {
  return (
    <section
      className={styles.section}
      aria-labelledby="about-reviews-heading"
    >
      <div className={styles.content}>
        {/* =====================================================
            SHARED GLOBAL HEADING
        ===================================================== */}

        <header className="hj-first-five-heading">
          <h2 id="about-reviews-heading">
            Clear steps create
            <br />

            <span className="hj-heading-wave text-4xl xl:text-6xl">
              real
            </span>{" "}

            <em className="text-4xl xl:text-6xl">
              momentum.
            </em>
          </h2>

          <span>
            The strongest sign that a learning journey works
            is not how much content it contains. It is whether
            students know what to do next and can see what
            they have achieved.
          </span>
        </header>

        {/* =====================================================
            REVIEWS GRID
        ===================================================== */}

        <div className={styles.grid}>
          {reviews.map((review) => (
            <article
              className={styles.card}
              key={review.number}
            >
              {/* ===============================================
                  VISUAL
              =============================================== */}

              <div className={styles.visual}>
                <div className={styles.book}>
                  <BookOpen size={28} />

                  <strong>
                    me
                  </strong>

                  <small>
                    LEARN
                  </small>
                </div>

                <div className={styles.visualSteps}>
                  <span>LEARN</span>
                  <span>PRACTISE</span>
                  <span>BUILD</span>
                </div>
              </div>

              {/* ===============================================
                  REVIEW
              =============================================== */}

              <div className={styles.review}>
                <div
                  className={styles.stars}
                  aria-label="5 star review"
                >
                  ★★★★★
                </div>

                <blockquote>
                  “{review.quote}”
                </blockquote>

                <footer>
                  <span>
                    {review.number}
                  </span>

                  <div>
                    <strong>
                      {review.type}
                    </strong>

                    <small>
                      MentorMe journey
                    </small>
                  </div>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}