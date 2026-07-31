"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, X } from "lucide-react";
import styles from "./CareerTransformation.module.css";

const stages = [
  {
    number: "01",
    kicker: "Where You Start",
    title: "Feeling Lost & Overwhelmed",
    image: "/images/transformation/starting-point.png",
    alt: "Indian student thoughtfully considering their learning direction",
    tone: "start",
    items: ["Too many career paths", "No clear learning plan", "Unsure what employers expect"],
    negative: true,
  },
  {
    number: "02",
    kicker: "Where You Build",
    title: "Skills. Consistency. Momentum.",
    image: "/images/transformation/building-skills.png",
    alt: "Indian learner building technology skills on a laptop",
    tone: "build",
    items: ["Guided learning missions", "Portfolio-ready projects", "Mentor feedback loops"],
  },
  {
    number: "03",
    kicker: "Where You Arrive",
    title: "Career Ready & Opportunities",
    image: "/images/transformation/career-ready.png",
    alt: "Career-ready Indian technology professional with a portfolio",
    tone: "arrive",
    items: ["Proof employers can see", "Interview-ready confidence", "A roadmap for what comes next"],
  },
] as const;

export default function CareerTransformation() {
  const reducedMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="transformation-title">
      <div className={styles.orbOne} aria-hidden="true" />
      <div className={styles.orbTwo} aria-hidden="true" />
      <div className={styles.shell}>
        <motion.header
          className={styles.heading}
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>YOUR JOURNEY. YOUR TRANSFORMATION.</p>
          <h2 id="transformation-title">
            From Beginner to <span>Career Ready</span>
          </h2>
          <div className={styles.titleRule} aria-hidden="true" />
          <p className={styles.subtitle}>
            See how clear direction, consistent practice, and real proof turn uncertainty into opportunity.
          </p>
        </motion.header>

        <div className={styles.cards}>
          {stages.map((stage, index) => (
            <motion.article
              className={`${styles.card} ${styles[stage.tone]}`}
              key={stage.number}
              initial={reducedMotion ? false : { opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: reducedMotion ? 0 : index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.imageWrap}>
                <Image src={stage.image} alt={stage.alt} fill unoptimized sizes="(max-width: 760px) 92vw, (max-width: 1100px) 45vw, 30vw" />
                <div className={styles.imageShade} />
                <span className={styles.number}>{stage.number}</span>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.kicker}>{stage.kicker}</p>
                <h3>{stage.title}</h3>
                <ul>
                  {stage.items.map((item) => (
                    <li key={item}>
                      <span className={stage.negative ? styles.negativeIcon : styles.checkIcon} aria-hidden="true">
                        {stage.negative ? <X size={14} /> : <Check size={14} />}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {index < stages.length - 1 && <div className={styles.connector} aria-hidden="true"><ArrowRight /></div>}
            </motion.article>
          ))}
        </div>

        <motion.div className={styles.cta} initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.65 }}>
          <Sparkles aria-hidden="true" />
          <div><strong>Your career transformation starts with one clear next step.</strong><span>Build skills, proof, and momentum with Mentor Me.</span></div>
          <Link href="/courses">Start your journey <ArrowRight size={18} /></Link>
        </motion.div>
      </div>
    </section>
  );
}
