import { BookOpen, Sparkles } from "lucide-react";
import { reviews } from "./aboutData";
import styles from "./AboutReviews.module.css";

export default function AboutReviews() {
  return (
    <section className={styles.section} aria-labelledby="about-reviews-heading">
      <div className={styles.content}>
        <header className={styles.heading}>
          <div className={styles.kicker}>
            {/* <Sparkles size={15} />
            WHAT THE JOURNEY SHOULD FEEL LIKE */}
          </div>

          <h2 id="about-reviews-heading">
            <span className="hj-main-heading">Clear steps create</span>
            <span className={`${styles.secondaryLine} text-4xl xl:text-6xl`}>
              <span className="hj-main-heading hj-heading-wave">real</span>{" "}
              <em className="seen-word">momentum.</em>
            </span>
          </h2>

          <p>
            The strongest sign that a learning journey works is not how much
            content it contains. It is whether students know what to do next
            and can see what they have achieved.
          </p>
        </header>

        <div className={styles.grid}>
          {reviews.map((review) => (
            <article className={styles.card} key={review.number}>
              <div className={styles.visual}>
                <div className={styles.book}>
                  <BookOpen size={28} />
                  <strong>me</strong>
                  <small>LEARN</small>
                </div>

                <div className={styles.visualSteps}>
                  <span>LEARN</span>
                  <span>PRACTISE</span>
                  <span>BUILD</span>
                </div>
              </div>

              <div className={styles.review}>
                <div className={styles.stars}>★★★★★</div>

                <blockquote>“{review.quote}”</blockquote>

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
  );
}