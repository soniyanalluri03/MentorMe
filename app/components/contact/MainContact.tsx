import ContactForm from "./ContactForm";
import ContactHero from "./ContactHero";
import ContactTypes from "./ContactTypes";
import MotionReveal from "../MotionReveal";

import styles from "./Contact.module.css";

export default function MainContact() {
  return (
    <div className={styles.page}>
      {/* Hero starts directly behind the navbar */}
      <ContactHero />

      <MotionReveal y={44}>
        <section
          className={styles.contactSection}
          aria-label="Contact MentorMe"
        >
          <div className={styles.contactLayout}>
            <MotionReveal
              x={-20}
              delay={0.04}
            >
              <ContactTypes />
            </MotionReveal>

            <MotionReveal
              x={20}
              delay={0.1}
            >
              <ContactForm />
            </MotionReveal>
          </div>
        </section>
      </MotionReveal>
    </div>
  );
}