"use client";

import {
  Fragment,
  type MouseEvent,
} from "react";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

import Image from "next/image";

import {
  ArrowRight,
  Check,
  Sparkles,
  X,
} from "lucide-react";

import styles from "./CareerTransformation.module.css";

const stages = [
  {
    number: "01",
    kicker: "Where You Start",
    title: "Feeling Lost & Overwhelmed",
    image: "/images/transformation/starting-point.png",
    alt: "Indian student thoughtfully considering their learning direction",
    tone: "start",
    items: [
      "Too many career paths",
      "No clear learning plan",
      "Unsure what employers expect",
    ],
    negative: true,
  },
  {
    number: "02",
    kicker: "Where You Build",
    title: "Skills. Consistency. Momentum.",
    image: "/images/transformation/building-skills.png",
    alt: "Indian learner building technology skills on a laptop",
    tone: "build",
    items: [
      "Guided learning missions",
      "Portfolio-ready projects",
      "Mentor feedback loops",
    ],
    negative: false,
  },
  {
    number: "03",
    kicker: "Where You Arrive",
    title: "Career Ready & Opportunities",
    image: "/images/transformation/career-ready.png",
    alt: "Career-ready Indian technology professional with a portfolio",
    tone: "arrive",
    items: [
      "Proof employers can see",
      "Interview-ready confidence",
      "A roadmap for what comes next",
    ],
    negative: false,
  },
] as const;

type Stage = (typeof stages)[number];

interface StageCardProps {
  stage: Stage;
  index: number;
  reducedMotion: boolean | null;
}

function StageCard({
  stage,
  index,
  reducedMotion,
}: StageCardProps) {
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawLift = useMotionValue(0);
  const rawScale = useMotionValue(1);

  const rotateX = useSpring(rawRotateX, {
    stiffness: 190,
    damping: 20,
    mass: 0.5,
  });

  const rotateY = useSpring(rawRotateY, {
    stiffness: 190,
    damping: 20,
    mass: 0.5,
  });

  const lift = useSpring(rawLift, {
    stiffness: 210,
    damping: 20,
    mass: 0.45,
  });

  const cardScale = useSpring(rawScale, {
    stiffness: 210,
    damping: 20,
    mass: 0.45,
  });

  const handleMouseMove = (
    event: MouseEvent<HTMLElement>,
  ) => {
    if (reducedMotion) return;

    const card = event.currentTarget;
    const rectangle = card.getBoundingClientRect();

    const x =
      (event.clientX - rectangle.left) /
      rectangle.width;

    const y =
      (event.clientY - rectangle.top) /
      rectangle.height;

    rawRotateY.set((x - 0.5) * 10);
    rawRotateX.set((0.5 - y) * 8);

    card.style.setProperty(
      "--mx",
      `${(x * 100).toFixed(1)}%`,
    );

    card.style.setProperty(
      "--my",
      `${(y * 100).toFixed(1)}%`,
    );
  };

  const handleMouseEnter = () => {
    if (reducedMotion) return;

    rawLift.set(-13);
    rawScale.set(1.025);
  };

  const handleMouseLeave = (
    event: MouseEvent<HTMLElement>,
  ) => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawLift.set(0);
    rawScale.set(1);

    event.currentTarget.style.setProperty(
      "--mx",
      "50%",
    );

    event.currentTarget.style.setProperty(
      "--my",
      "50%",
    );
  };

  return (
    <motion.div
      className={styles.cardSlot}
      initial={
        reducedMotion
          ? false
          : {
            opacity: 0,
            y: 70,
            scale: 0.93,
            rotateX: 10,
          }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.82,
        delay: reducedMotion
          ? 0
          : index * 0.16,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.article
        className={`${styles.card} ${styles[stage.tone]}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          reducedMotion
            ? undefined
            : {
              rotateX,
              rotateY,
              y: lift,
              scale: cardScale,
              transformPerspective: 1400,
            }
        }
      >
        <div className={styles.imageWrap}>
          <Image
            src={stage.image}
            alt={stage.alt}
            fill
            unoptimized
            sizes="(max-width: 760px) 92vw, (max-width: 1100px) 45vw, 30vw"
          />

          <div
            className={styles.imageShade}
            aria-hidden="true"
          />

          <span className={styles.number}>
            {stage.number}
          </span>
        </div>

        <div className={styles.cardBody}>
          <p className={styles.kicker}>
            {stage.kicker}
          </p>

          <h3>{stage.title}</h3>

          <ul>
            {stage.items.map((item) => (
              <li key={item}>
                <span
                  className={
                    stage.negative
                      ? styles.negativeIcon
                      : styles.checkIcon
                  }
                  aria-hidden="true"
                >
                  {stage.negative ? (
                    <X size={14} />
                  ) : (
                    <Check size={14} />
                  )}
                </span>

                {item}
              </li>
            ))}
          </ul>
        </div>

        <span
          className={styles.cardGlow}
          aria-hidden="true"
        />
      </motion.article>
    </motion.div>
  );
}

export default function CareerTransformation() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className={styles.section}
      aria-labelledby="transformation-title"
    >
      <div
        className={styles.orbOne}
        aria-hidden="true"
      />

      <div
        className={styles.orbTwo}
        aria-hidden="true"
      />

      <div className={styles.shell}>
        <motion.header
          className={styles.heading}
          initial={
            reducedMotion
              ? false
              : {
                opacity: 0,
                y: 30,
              }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.45,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="hj-kicker">
            <Sparkles size={15} />
            YOUR JOURNEY. YOUR TRANSFORMATION.
          </div>

          <h2 id="transformation-title">
            <span className={styles.headingWave}>
              From Beginner to
            </span>{" "}
            <span className={styles.careerReady}>
              Career Ready
            </span>
          </h2>

          <div
            className={styles.titleRule}
            aria-hidden="true"
          />
          <div className="hj-first-five-heading">
            <span>
              See how clear direction, consistent
              practice, and real proof turn uncertainty
              into opportunity.
            </span>
          </div>
        </motion.header>

        <div className={styles.cards}>
          {stages.map((stage, index) => (
            <Fragment key={stage.number}>
              <StageCard
                stage={stage}
                index={index}
                reducedMotion={reducedMotion}
              />

              {index < stages.length - 1 && (
                <motion.div
                  className={
                    styles.flowConnectorWrap
                  }
                  aria-hidden="true"
                  initial={
                    reducedMotion
                      ? false
                      : {
                        opacity: 0,
                        scale: 0.5,
                        x: -12,
                      }
                  }
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.4,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: reducedMotion
                      ? 0
                      : index * 0.16 + 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span
                    className={
                      styles.flowConnector
                    }
                  >
                    <ArrowRight
                      size={18}
                      strokeWidth={2.2}
                    />
                  </span>
                </motion.div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}