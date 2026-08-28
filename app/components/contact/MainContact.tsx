import ContactForm from "./ContactForm";
import ContactHero from "./ContactHero";
import ContactTypes from "./ContactTypes";
import MotionReveal from "../MotionReveal";

import styles from "./Contact.module.css";

export default function MainContact() {
  return (
    <main className={styles.page}>
      <MotionReveal y={24} amount={0.06}>
        <ContactHero />
      </MotionReveal>

      <MotionReveal y={44}>
        <section
          className={styles.contactSection}
          aria-label="Contact MentorMe"
        >
          <div className={styles.contactLayout}>
            <MotionReveal x={-20} delay={0.04}>
              <ContactTypes />
            </MotionReveal>

            <MotionReveal x={20} delay={0.1}>
              <ContactForm />
            </MotionReveal>
          </div>
        </section>
      </MotionReveal>
    </main>
  );
}
