import ContactForm from "./ContactForm";
import ContactHero from "./ContactHero";
import ContactTypes from "./ContactTypes";

import styles from "./Contact.module.css";

export default function MainContact() {
  return (
    <main className={styles.page}>
      <ContactHero />

      <section
        className={styles.contactSection}
        aria-label="Contact MentorMe"
      >
        <div className={styles.contactLayout}>
          <ContactTypes />
          <ContactForm />
        </div>
      </section>
    </main>
  );
}