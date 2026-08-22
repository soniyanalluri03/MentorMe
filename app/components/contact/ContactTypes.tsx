import {
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

import {
  FiArrowUpRight,
} from "react-icons/fi";

import {
  HiSparkles,
} from "react-icons/hi2";

import { contactTypes } from "./contactData";

import styles from "./ContactTypes.module.css";

export default function ContactTypes() {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      href: "#",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "#",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      href: "#",
    },
    {
      name: "Twitter / X",
      icon: FaXTwitter,
      href: "#",
    },
  ];

  return (
    <aside className={styles.panel}>
      <div className={styles.panelTop}>
        <div className={styles.panelKicker}>
          <HiSparkles size={14} />

          START WITH THE RIGHT TEAM
        </div>

        <h3>
          What can we
          <br />
          help with?
        </h3>

        <p>
          Choose the conversation that best matches
          what you need. We&apos;ll make sure it reaches
          the right people.
        </p>
      </div>

      <div className={styles.list}>
        {contactTypes.map((item) => {
          const Icon = item.icon;

          return (
            <article
              className={styles.item}
              key={item.number}
            >
              <div className={styles.number}>
                {item.number}
              </div>

              <div className={styles.icon}>
                <Icon size={19} />
              </div>

              <div className={styles.copy}>
                <strong>
                  {item.title}
                </strong>

                <span>
                  {item.description}
                </span>
              </div>

              <FiArrowUpRight
                className={styles.arrow}
                size={18}
              />
            </article>
          );
        })}
      </div>

      {/* SOCIAL MEDIA */}
      <div className={styles.socialSection}>
        <div className={styles.socialHeading}>
          <span>CONNECT WITH US</span>

          <div className={styles.socialLine} />
        </div>

        <div className={styles.socialLinks}>
          {socialLinks.map((social) => {
            const SocialIcon = social.icon;

            return (
              <a
                key={social.name}
                href={social.href}
                className={styles.socialLink}
                aria-label={social.name}
                title={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon size={18} />
              </a>
            );
          })}
        </div>
      </div>
    </aside>
  );
}