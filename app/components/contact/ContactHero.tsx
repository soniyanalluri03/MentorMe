import {
  Mail,
  Sparkles,
} from "lucide-react";

import styles from "./ContactHero.module.css";

export default function ContactHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="contact-heading"
    >
      <div
        className={styles.orbit}
        aria-hidden="true"
      >
        <i />
        <i />
        <i />
      </div>

      <div className={styles.heroContent}>
        <header className="hj-first-five-heading">
          <div className={styles.kicker}>
            <Sparkles size={15} />
            GET IN TOUCH
          </div>

          <h2 id="contact-heading">
            Let&apos;s talk about
            <br />

            <span className="hj-heading-wave text-4xl xl:text-6xl">
              your next
            </span>{" "}

            <em className="text-4xl xl:text-6xl">
              step.
            </em>
          </h2>

          <span>
            Questions about your journey, a college
            partnership or something bigger? Start here.
          </span>
        </header>

        <div className={styles.heroBadge}>
          <Mail size={15} />
          We usually respond within 1–2 business days
        </div>
      </div>
    </section>
  );
}
