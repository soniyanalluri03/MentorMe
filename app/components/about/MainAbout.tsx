"use client";

import { motion, useReducedMotion } from "framer-motion";
import AboutHero from "./AboutHero";
import AboutOverview from "./AboutOverview";
import AboutStory from "./AboutStory";
import AboutProgress from "./AboutProgress";
import AboutTeam from "./AboutTeam";
import AboutReviews from "./AboutReviews";
import styles from "./About.module.css";

export default function MainAbout() {
  const reduceMotion = useReducedMotion();

  const sections = [
    { key: "hero", content: <AboutHero />, x: 0, y: 24 },
    { key: "overview", content: <AboutOverview />, x: -18, y: 38 },
    { key: "story", content: <AboutStory />, x: 18, y: 38 },
    { key: "progress", content: <AboutProgress />, x: -18, y: 38 },
    { key: "team", content: <AboutTeam />, x: 18, y: 38 },
    { key: "reviews", content: <AboutReviews />, x: 0, y: 42 },
  ];

  return (
    <motion.main
      className={`${styles.page} about-page`}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {sections.map((section, index) => (
        <motion.div
          className={styles.motionSection}
          key={section.key}
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: section.x,
                  y: section.y,
                  scale: 0.988,
                  filter: "blur(6px)",
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }
          }
          viewport={{ once: true, amount: index === 0 ? 0.08 : 0.14 }}
          transition={{
            duration: index === 0 ? 0.72 : 0.82,
            delay: index === 0 ? 0.08 : 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {section.content}
        </motion.div>
      ))}
    </motion.main>
  );
}
