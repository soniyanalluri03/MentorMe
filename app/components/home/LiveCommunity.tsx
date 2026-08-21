"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BriefcaseBusiness, CheckCircle2, Code2, FolderKanban, MessageCircleMore, Sparkles, Trophy } from "lucide-react";
import styles from "./LiveCommunity.module.css";

type ActivityType = "project" | "xp" | "mentor" | "milestone";
interface Activity { avatar: string; name: string; handle: string; action: string; highlight: string; meta: string; type: ActivityType; }

const activities: Activity[] = [
  { avatar: "AK", name: "Aarav K.", handle: "@aaravbuilds", action: "shipped", highlight: "a responsive portfolio", meta: "2m ago", type: "project" },
  { avatar: "SM", name: "Sanya M.", handle: "@sanyalearns", action: "earned", highlight: "+240 XP", meta: "5m ago", type: "xp" },
  { avatar: "RJ", name: "Rohan J.", handle: "@rohanjs", action: "completed", highlight: "Mentor Review", meta: "8m ago", type: "mentor" },
  { avatar: "NP", name: "Neha P.", handle: "@nehacodes", action: "unlocked", highlight: "Project Builder", meta: "12m ago", type: "milestone" },
  { avatar: "IK", name: "Ishaan K.", handle: "@ishaanui", action: "published", highlight: "a UI case study", meta: "16m ago", type: "project" },
  { avatar: "AD", name: "Ananya D.", handle: "@ananyadev", action: "reached", highlight: "Level 18", meta: "21m ago", type: "xp" },
  { avatar: "VS", name: "Vihaan S.", handle: "@vihaanstack", action: "received", highlight: "mentor approval", meta: "27m ago", type: "mentor" },
  { avatar: "MR", name: "Meera R.", handle: "@meeramakes", action: "completed", highlight: "Career Roadmap", meta: "31m ago", type: "milestone" },
  { avatar: "KB", name: "Kabir B.", handle: "@kabirbuilds", action: "shipped", highlight: "an API project", meta: "38m ago", type: "project" },
  { avatar: "TS", name: "Tara S.", handle: "@taraskills", action: "earned", highlight: "+180 XP", meta: "42m ago", type: "xp" },
  { avatar: "AV", name: "Arjun V.", handle: "@arjunlearns", action: "passed", highlight: "Skill Test 04", meta: "48m ago", type: "mentor" },
  { avatar: "ZI", name: "Zoya I.", handle: "@zoyacreates", action: "unlocked", highlight: "Interview Prep", meta: "54m ago", type: "milestone" },
];
const iconMap = { project: FolderKanban, xp: Trophy, mentor: MessageCircleMore, milestone: CheckCircle2 };
// Replace these display-only values with live backend counts when community APIs are connected.
const communityStats = [{ value: "12,400+", label: "active learners" }, { value: "38,000+", label: "projects shipped" }, { value: "91%", label: "weekly momentum" }];

function ActivityCard({
  activity,
  active,
  cardId,
}: {
  activity: Activity;
  active: boolean;
  cardId: string;
}) {
  const Icon = iconMap[activity.type];

  return (
    <article
      data-community-card-id={cardId}
      className={`${styles.card} ${active ? styles.activeCard : ""
        }`}
      tabIndex={0}
    >
      <div
        className={styles.avatar}
        aria-hidden="true"
      >
        {activity.avatar}
      </div>

      <div className={styles.cardCopy}>
        <div>
          <strong>{activity.name}</strong>
          <span>{activity.handle}</span>
        </div>

        <p>
          {activity.action}{" "}
          <b>{activity.highlight}</b>
        </p>

        <small>{activity.meta}</small>
      </div>

      <span
        className={`${styles.typeIcon} ${styles[activity.type]
          }`}
        aria-label={`${activity.type} activity`}
      >
        <Icon size={17} />
      </span>
    </article>
  );
}

export default function LiveCommunity() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [activeCardId, setActiveCardId] =
    useState("0-0");

  const reducedMotion = useReducedMotion();

  /* Detect when the section enters the screen */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        rootMargin: "120px 0px",
        threshold: 0.04,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* Automatically apply the hover effect card by card */
  useEffect(() => {
    const marquee = marqueeRef.current;

    if (
      !marquee ||
      !visible ||
      reducedMotion
    ) {
      return;
    }

    const updateCenteredCard = () => {
      const cards =
        marquee.querySelectorAll<HTMLElement>(
          "[data-community-card-id]",
        );

      if (!cards.length) return;

      const marqueeRectangle =
        marquee.getBoundingClientRect();

      const marqueeCenter =
        marqueeRectangle.left +
        marqueeRectangle.width / 2;

      let closestCardId = "";
      let closestDistance =
        Number.POSITIVE_INFINITY;

      cards.forEach((card) => {
        const cardRectangle =
          card.getBoundingClientRect();

        const cardCenter =
          cardRectangle.left +
          cardRectangle.width / 2;

        const distance = Math.abs(
          marqueeCenter - cardCenter,
        );

        if (distance < closestDistance) {
          closestDistance = distance;

          closestCardId =
            card.dataset.communityCardId ??
            "";
        }
      });

      if (closestCardId) {
        setActiveCardId((current) =>
          current === closestCardId
            ? current
            : closestCardId,
        );
      }
    };

    updateCenteredCard();

    const interval = window.setInterval(
      updateCenteredCard,
      100,
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [visible, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="community-title"
    >
      <div className={styles.shell}>
        <motion.header
          className={styles.heading}
          initial={
            reducedMotion
              ? false
              : {
                opacity: 0,
                y: 28,
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
            {/* <Sparkles size={15} />
            LIVE COMMUNITY. REAL PROGRESS. */}
          </div>


          <h2 id="community-title">
            See learners build, grow, and{" "}
            <span className={styles.waveText}>
              win—
            </span>

            <span
              className={styles.colorfulText}
            >
              together
            </span>
          </h2>
          <div className="hj-first-five-heading">
            <span>
              A living stream of projects,
              milestones, mentor feedback, and
              momentum from the Mentor Me
              community
            </span>
          </div>

        </motion.header>
      </div>

      <div className={styles.streamFrame}>
        <div
          className={styles.timeline}
          aria-hidden="true"
        >
          <span />
          <Code2 />
          <span />
          <BriefcaseBusiness />
          <span />
        </div>

        <div
          ref={marqueeRef}
          className={styles.marquee}
          aria-label="Recent learner activity"
        >
          <div
            className={`${styles.track} ${visible && !reducedMotion
                ? styles.running
                : ""
              }`}
          >
            {[0, 1].map((group) => (
              <div
                className={styles.group}
                aria-hidden={group === 1}
                key={group}
              >
                {activities.map(
                  (activity, index) => {
                    const cardId = `${group}-${index}`;

                    return (
                      <ActivityCard
                        activity={activity}
                        cardId={cardId}
                        active={
                          activeCardId === cardId
                        }
                        key={`${group}-${activity.handle}`}
                      />
                    );
                  },
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className={styles.stats}
        initial={
          reducedMotion
            ? false
            : {
              opacity: 0,
              y: 22,
            }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.7,
        }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {communityStats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}

        <p>
          <i />
          Live activity updates
        </p>
      </motion.div>
    </section>
  );
}