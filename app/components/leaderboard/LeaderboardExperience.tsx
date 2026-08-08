"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import styles from "./LeaderboardExperience.module.css";

import {
  currentStudent,
  leaderboardStudents,
  podiumStudents,
  rankingStudents,
  type LeaderboardStudent,
} from "./leaderboardData";

/* =========================================================
   ICONS
========================================================= */

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M13.6 2.7c.7 3.6-1.8 5.2-3 7.1-1.2 1.9-1 4.1.5 5.5-.1-2.4 1.6-4 3.4-5.7.4 2.1 2.2 3.5 2.2 6.3 0 3-2.1 5.1-5.1 5.1S6 19 6 15.7c0-4.9 4.8-7.1 7.6-13Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 19V5m0 0-6 6m6-6 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MiniTrophyIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M9 5h14v5c0 5-2.8 8.4-7 9.2C11.8 18.4 9 15 9 10V5Z"
        fill="currentColor"
      />

      <path
        d="M9 8H5v2.5C5 14 7.2 16 11 16M23 8h4v2.5C27 14 24.8 16 21 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <path
        d="M16 19v5M11 27h10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =========================================================
   HERO MOMENTUM
========================================================= */

function MomentumRunner() {
  return (
    <div className={styles.momentumTrack}>
      <div className={styles.momentumTrail} />

      <div className={styles.momentumRunner}>
        <span className={styles.runnerSparkOne} />
        <span className={styles.runnerSparkTwo} />
        <span className={styles.runnerSparkThree} />
        <span className={styles.runnerSparkFour} />

        <span className={styles.runnerIcon}>
          <MiniTrophyIcon />
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   PODIUM GLOBE
========================================================= */

function PodiumGlobe() {
  const particles = Array.from({ length: 30 });

  return (
    <div className={styles.podiumGlobe} aria-hidden="true">
      <div className={styles.globeAura} />

      <div className={styles.globeBody}>
        <span className={styles.globeLatitudeOne} />
        <span className={styles.globeLatitudeTwo} />
        <span className={styles.globeLatitudeThree} />

        <span className={styles.globeLongitudeOne} />
        <span className={styles.globeLongitudeTwo} />
        <span className={styles.globeLongitudeThree} />

        <div className={styles.globeLand}>
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className={styles.globeHighlight} />
      </div>

      <div className={`${styles.globeOrbit} ${styles.orbitOne}`}>
        <i />
      </div>

      <div className={`${styles.globeOrbit} ${styles.orbitTwo}`}>
        <i />
      </div>

      <div className={`${styles.globeOrbit} ${styles.orbitThree}`}>
        <i />
      </div>

      <div className={styles.globeEnergy} />

      {particles.map((_, index) => (
        <span
          key={index}
          className={styles.globeParticle}
          style={
            {
              "--p": index,
              "--delay": `${index * -0.25}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* =========================================================
   TROPHY
========================================================= */

function Trophy({ rank }: { rank: number }) {
  const tone =
    rank === 1
      ? styles.goldTrophy
      : rank === 2
        ? styles.silverTrophy
        : styles.bronzeTrophy;

  return (
    <div className={`${styles.trophy} ${tone}`}>
      <span className={`${styles.handle} ${styles.handleLeft}`} />
      <span className={`${styles.handle} ${styles.handleRight}`} />

      <div className={styles.cup}>
        <strong>{rank}</strong>
      </div>

      <span className={styles.stem} />
      <span className={styles.foot} />
      <span className={styles.base} />
    </div>
  );
}

/* =========================================================
   TOP THREE
========================================================= */

function PodiumItem({
  student,
}: {
  student: LeaderboardStudent;
}) {
  const launchX =
    student.rank === 1
      ? "0px"
      : student.rank === 2
        ? "320px"
        : "-320px";

  return (
    <article
      className={`${styles.podiumItem} ${
        student.rank === 1 ? styles.firstPlace : ""
      }`}
      style={
        {
          "--launch-x": launchX,
          "--launch-delay":
            student.rank === 1
              ? "0.15s"
              : student.rank === 2
                ? "0.55s"
                : "0.9s",
        } as CSSProperties
      }
    >
      <div className={styles.trophyArrival}>
        <Trophy rank={student.rank} />
      </div>

      <div
        className={`${styles.podiumCard} ${
          student.rank === 1
            ? styles.podiumCardFirst
            : student.rank === 2
              ? styles.podiumCardSecond
              : styles.podiumCardThird
        }`}
      >
        <div className={styles.cardTopPlane} />

        <span className={styles.cardRankNumber}>
          {student.rank}
        </span>

        <div className={styles.podiumProfileRow}>
          <div className={styles.topAvatar}>
            {student.initials}
          </div>

          <div className={styles.profileIdentity}>
            <strong>{student.name}</strong>
            <span>{student.track}</span>
          </div>

          <strong className={styles.profileXp}>
            {student.xp.toLocaleString()} XP
          </strong>
        </div>

        <div className={styles.profileMeta}>
          <span>LV {student.level}</span>

          <span>
            <FlameIcon />
            {student.streak} DAYS
          </span>
        </div>

        <div className={styles.cardRankWatermark}>
          {student.rank}
        </div>

        <span className={styles.cardLeftEdge} />
        <span className={styles.cardRightEdge} />

        <div className={styles.cardReflection} />
        <div className={styles.cardBottomGlow} />
      </div>
    </article>
  );
}

/* =========================================================
   LIVE RANKING
========================================================= */

interface RankingBoardProps {
  activeRank: number;
  onActiveChange: (
    student: LeaderboardStudent,
  ) => void;
}

function RankingBoard({
  activeRank,
  onActiveChange,
}: RankingBoardProps) {
  const viewportRef =
    useRef<HTMLDivElement | null>(null);

  const rowRefs =
    useRef<Record<number, HTMLDivElement | null>>({});

  const activeIndex = useMemo(
    () =>
      Math.max(
        0,
        rankingStudents.findIndex(
          (student) =>
            student.rank === activeRank,
        ),
      ),
    [activeRank],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      const nextIndex =
        activeIndex >= rankingStudents.length - 1
          ? 0
          : activeIndex + 1;

      onActiveChange(rankingStudents[nextIndex]);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [activeIndex, onActiveChange]);

  useEffect(() => {
    const viewport = viewportRef.current;

    const row = rowRefs.current[activeRank];

    if (!viewport || !row) return;

    const target =
      row.offsetTop -
      viewport.clientHeight / 2 +
      row.clientHeight / 2;

    viewport.scrollTo({
      top: Math.max(0, target),
      behavior: "smooth",
    });
  }, [activeRank]);

  return (
    <div className={styles.rankingBoard}>
      <div
        ref={viewportRef}
        className={styles.rankingViewport}
      >
        <div className={styles.centerFocus} />

        <div className={styles.rankingTrack}>
          {rankingStudents.map((student) => {
            const active =
              student.rank === activeRank;

            return (
              <div
                key={student.rank}
                ref={(element) => {
                  rowRefs.current[student.rank] =
                    element;
                }}
                className={`${styles.rankRow} ${
                  active
                    ? styles.rankRowActive
                    : ""
                } ${
                  student.isCurrentUser
                    ? styles.currentUser
                    : ""
                }`}
              >
                <strong className={styles.rowRank}>
                  {String(student.rank).padStart(
                    2,
                    "0",
                  )}
                </strong>

                <div className={styles.rowAvatar}>
                  {student.initials}
                </div>

                <div className={styles.rowIdentity}>
                  <div>
                    <strong>{student.name}</strong>

                    {student.isCurrentUser && (
                      <span
                        className={styles.youBadge}
                      >
                        YOU
                      </span>
                    )}
                  </div>

                  <span>{student.track}</span>
                </div>

                <div className={styles.rowJourney}>
                  <span>
                    LEVEL {student.level}
                  </span>

                  <small>{student.stage}</small>
                </div>

                <span className={styles.rowStreak}>
                  <FlameIcon />
                  {student.streak}
                </span>

                <strong className={styles.rowXP}>
                  {student.xp.toLocaleString()} XP
                </strong>

                <div className={styles.rowEnergy} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ACHIEVEMENT
========================================================= */

function AchievementCard({
  student,
}: {
  student: LeaderboardStudent;
}) {
  return (
    <aside
      key={student.rank}
      className={styles.achievementCard}
    >
      <span className={styles.liveAchievement}>
        LIVE ACHIEVEMENT
      </span>

      <div className={styles.achievementVisual}>
        <div className={styles.achievementSun} />

        <div className={styles.achievementAvatar}>
          {student.initials}
        </div>

        <SparkIcon />

        <div className={styles.achievementMountains}>
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className={styles.achievementContent}>
        <span>{student.stage}</span>

        <strong>{student.badge}</strong>

        <p>{student.badgeDescription}</p>

        <div className={styles.unlockInfo}>
          <span>UNLOCKED</span>

          <strong>{student.unlock}</strong>
        </div>
      </div>

      <div className={styles.achievementGlow} />
    </aside>
  );
}

/* =========================================================
   FINAL CARD
========================================================= */

function DynamicStat({
  label,
  value,
  delay,
}: {
  label: string;
  value: string;
  delay: string;
}) {
  return (
    <div
      className={styles.dynamicStat}
      style={
        {
          "--delay": delay,
        } as CSSProperties
      }
    >
      <span>{label}</span>

      <div>
        <strong>{value}</strong>
        <i />
      </div>
    </div>
  );
}

function MomentumCard({
  student,
}: {
  student: LeaderboardStudent;
}) {
  return (
    <section className={styles.finalSection}>
      <div className={styles.finalCard}>
        <div className={styles.finalOrb}>
          <span />
          <span />
          <span />

          <strong>{student.initials}</strong>
        </div>

        <div className={styles.finalCopy}>
          <span className={styles.sectionEyebrow}>
            YOUR NEXT MOVE
          </span>

          <small key={student.rank}>
            NOW WATCHING · {student.name}
          </small>

          <h2>
            Your rank is not your finish line.
            <em>Your next level is.</em>
          </h2>

          <p>
            Progress keeps moving. Complete the next
            mission, unlock the next opportunity and let
            your proof move you upward.
          </p>
        </div>

        <div
          key={`stats-${student.rank}`}
          className={styles.finalStats}
        >
          <DynamicStat
            label="CURRENT"
            value={`#${String(
              student.rank,
            ).padStart(2, "0")}`}
            delay="0s"
          />

          <DynamicStat
            label="LEVEL"
            value={String(student.level)}
            delay="0.12s"
          />

          <DynamicStat
            label="STREAK"
            value={`${student.streak}D`}
            delay="0.24s"
          />

          <div className={styles.stageStrip}>
            <span>{student.stage}</span>

            <strong>{student.unlock}</strong>
          </div>
        </div>

        <div className={styles.finalBorderLight} />
      </div>
    </section>
  );
}

/* =========================================================
   PAGE
========================================================= */

export function LeaderboardExperience() {
  const [activeStudent, setActiveStudent] =
    useState(currentStudent);

  return (
    <main className={styles.page}>
      <div className={styles.pageGrid} />
      <div className={styles.pageGlowOne} />
      <div className={styles.pageGlowTwo} />

      {/* HERO */}

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1>
            <span>Momentum deserves</span>
            <em>to be seen.</em>
          </h1>

          <p>
            Every mission, project and level leaves a
            signal. Build proof, earn XP and watch
            consistent effort become visible momentum.
          </p>

          <div className={styles.heroPills}>
            <span>
              <SparkIcon />
              WEEKLY XP
            </span>

            <span>
              <FlameIcon />
              ACTIVE STREAKS
            </span>

            <span>
              <ArrowIcon />
              LIVE RANKING
            </span>
          </div>

          <div className={styles.heroMomentum}>
            <div className={styles.momentumLabels}>
              <span>YOUR MOMENTUM</span>

              <strong>RISING</strong>
            </div>

            <MomentumRunner />
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}

      <section className={styles.leaderSection}>
        <div className={styles.centerHeading}>
          <h2>
            <span>Top learners.</span>

            <em>Built by consistency.</em>
          </h2>

          <p>
            Consistency creates momentum. Momentum creates
            proof.
          </p>
        </div>

        <div className={styles.podiumZone}>
          <PodiumGlobe />

          <div className={styles.podiumScene}>
            {podiumStudents.map((student) => (
              <PodiumItem
                key={student.rank}
                student={student}
              />
            ))}
          </div>

          {/* ATTACHED DIRECTLY TO PODIUM */}

          <div className={styles.attachedBoard}>
            <div className={styles.liveBoardTitle}>
              <h3>
                <span>Keep moving.</span>

                <em>Keep climbing.</em>
              </h3>

              <div className={styles.liveBadge}>
                <i />
                LIVE
              </div>
            </div>

            <div className={styles.boardContent}>
              <RankingBoard
                activeRank={activeStudent.rank}
                onActiveChange={setActiveStudent}
              />

              <AchievementCard
                student={activeStudent}
              />
            </div>
          </div>
        </div>
      </section>

      <MomentumCard student={activeStudent} />
    </main>
  );
}