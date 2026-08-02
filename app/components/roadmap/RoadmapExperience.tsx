"use client";

import Link from "next/link";
import {
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";

import styles from "./RoadmapExperience.module.css";

import {
  getCheckpoint,
  roadmapCheckpoints,
  roadmapStats,
  type CheckpointType,
  type RoadmapCheckpoint,
} from "./roadmapData";

interface TrackNode {
  level: number;
  x: number;
  y: number;
}

interface GapMarker {
  label: string;
  x: number;
  y: number;
}

interface TiltSurfaceProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

interface CosmicLinkProps {
  href: string;
  children: ReactNode;
  arrow: string;
  secondary?: boolean;
}

const trackNodes: TrackNode[] = [
  { level: 1, x: 120, y: 115 },
  { level: 2, x: 300, y: 78 },
  { level: 3, x: 480, y: 125 },
  { level: 4, x: 670, y: 85 },
  { level: 5, x: 850, y: 135 },

  { level: 6, x: 790, y: 270 },
  { level: 7, x: 610, y: 308 },
  { level: 8, x: 430, y: 270 },
  { level: 9, x: 250, y: 320 },
  { level: 10, x: 100, y: 280 },

  { level: 15, x: 170, y: 438 },
  { level: 20, x: 400, y: 500 },
  { level: 30, x: 720, y: 438 },

  { level: 40, x: 850, y: 610 },
  { level: 50, x: 650, y: 690 },
  { level: 60, x: 340, y: 625 },

  { level: 70, x: 120, y: 785 },
  { level: 80, x: 400, y: 885 },
  { level: 90, x: 760, y: 810 },
];

const gapMarkers: GapMarker[] = [
  { label: "Levels 11–14", x: 125, y: 365 },
  { label: "Levels 16–19", x: 285, y: 475 },
  { label: "Levels 21–29", x: 555, y: 475 },
  { label: "Levels 31–39", x: 815, y: 525 },
  { label: "Levels 41–49", x: 755, y: 660 },
  { label: "Levels 51–59", x: 490, y: 665 },
  { label: "Levels 61–69", x: 205, y: 710 },
  { label: "Levels 71–79", x: 255, y: 840 },
  { label: "Levels 81–89", x: 585, y: 855 },
];

const zoneLabels = [
  { label: "DISCOVER", x: 75, y: 25 },
  { label: "BUILD SKILLS", x: 430, y: 190 },
  { label: "CREATE PROOF", x: 745, y: 370 },
  { label: "CAREER READY", x: 515, y: 760 },
];

const trackPath = `
  M 120 115
  C 205 28, 222 150, 300 78
  S 405 147, 480 125
  S 592 35, 670 85
  S 795 67, 850 135

  C 900 205, 872 244, 790 270
  S 690 350, 610 308
  S 510 235, 430 270
  S 330 370, 250 320
  S 150 240, 100 280

  C 40 342, 80 414, 170 438
  C 250 470, 300 500, 400 500
  C 520 500, 590 418, 720 438

  C 830 458, 900 520, 850 610
  C 800 680, 720 710, 650 690
  C 550 660, 430 600, 340 625

  C 240 660, 170 730, 120 785
  C 80 842, 230 905, 400 885
  C 540 868, 640 792, 760 810
`;

const visibleLevels = trackNodes.map((node) => node.level);

function formatLevel(level: number) {
  return String(level).padStart(2, "0");
}

function getSelectionInformation(level: number) {
  const selectedIndex = visibleLevels.indexOf(level);

  if (level <= 10) {
    return {
      range: `LEVEL ${formatLevel(level)}`,
      included: "FREE STARTER JOURNEY",
    };
  }

  const previousVisibleLevel =
    visibleLevels[selectedIndex - 1];

  const hiddenStart = previousVisibleLevel + 1;
  const hiddenEnd = level - 1;

  return {
    range: `LEVELS ${previousVisibleLevel}–${level}`,
    included:
      hiddenStart <= hiddenEnd
        ? `INCLUDES LEVELS ${hiddenStart}–${hiddenEnd}`
        : "NEXT MILESTONE",
  };
}

function TiltSurface({
  children,
  className = "",
  delay = 0,
}: TiltSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (event.pointerType === "touch") {
      return;
    }

    const surface = surfaceRef.current;

    if (!surface) {
      return;
    }

    const bounds = surface.getBoundingClientRect();

    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;

    const horizontalRatio = localX / bounds.width;
    const verticalRatio = localY / bounds.height;

    const rotateY = (horizontalRatio - 0.5) * 12;
    const rotateX = (0.5 - verticalRatio) * 10;

    surface.style.setProperty(
      "--tilt-x",
      `${rotateX}deg`,
    );

    surface.style.setProperty(
      "--tilt-y",
      `${rotateY}deg`,
    );

    surface.style.setProperty(
      "--glow-x",
      `${localX}px`,
    );

    surface.style.setProperty(
      "--glow-y",
      `${localY}px`,
    );
  }

  function resetTilt() {
    const surface = surfaceRef.current;

    if (!surface) {
      return;
    }

    surface.style.setProperty("--tilt-x", "0deg");
    surface.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <div
      className={styles.tiltAuto}
      style={
        {
          "--tilt-delay": `${delay}s`,
        } as CSSProperties
      }
    >
      <div
        ref={surfaceRef}
        className={`${styles.tiltSurface} ${className}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
      >
        {children}
      </div>
    </div>
  );
}

function CosmicLink({
  href,
  children,
  arrow,
  secondary = false,
}: CosmicLinkProps) {
  return (
    <Link
      href={href}
      className={[
        styles.cosmicButton,
        secondary ? styles.cosmicButtonSecondary : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={styles.cosmicStars} />

      <span className={styles.cosmicGlow}>
        <i />
        <i />
      </span>

      <span className={styles.cosmicButtonText}>
        <strong>{children}</strong>
        <b>{arrow}</b>
      </span>
    </Link>
  );
}

function CheckpointIcon({
  type,
}: {
  type: CheckpointType;
}) {
  if (type === "direction") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="m15.5 8.5-2.2 5-5 2.2 2.2-5 5-2.2Z" />
      </svg>
    );
  }

  if (type === "learning") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
        <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" />
      </svg>
    );
  }

  if (type === "practice") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m5 12.5 4.2 4L19 7" />
        <path d="M12 3a9 9 0 1 0 9 9" />
      </svg>
    );
  }

  if (type === "project" || type === "portfolio") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <path d="M8 6V4h8v2M3 11h18M9 11v2h6v-2" />
      </svg>
    );
  }

  if (type === "certificate") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="9" r="5" />
        <path d="m9 13-1 8 4-2 4 2-1-8" />
        <path d="m10 9 1.2 1.2L14 7.5" />
      </svg>
    );
  }

  if (type === "career") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="7" r="3" />
        <path d="M5 21a7 7 0 0 1 14 0M9 14h6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2 2.3 5.2L20 8l-4.2 3.8 1.2 5.7-5-2.9-5 2.9 1.2-5.7L4 8l5.7-.8L12 2Z" />
      <path d="M7 21h10" />
    </svg>
  );
}

function LevelCard({
  node,
  selected,
  index,
  onSelect,
}: {
  node: TrackNode;
  selected: boolean;
  index: number;
  onSelect: (checkpoint: RoadmapCheckpoint) => void;
}) {
  const checkpoint = getCheckpoint(node.level);

  const shiftX =
    node.x < 190
      ? "92px"
      : node.x > 810
        ? "-92px"
        : "0px";

  const shiftY =
    node.y < 190
      ? "112px"
      : node.y > 850
        ? "-105px"
        : "0px";

  const nodeStyle = {
    "--node-x": `${node.x / 10}%`,
    "--node-y": `${node.y / 10}%`,
    "--node-delay": `${index * 0.08}s`,
    "--expand-x": shiftX,
    "--expand-y": shiftY,
  } as CSSProperties;

  return (
    <div
      className={[
        styles.nodeSlot,
        checkpoint.free ? styles.freeNode : "",
        checkpoint.milestone ? styles.milestoneNode : "",
        selected ? styles.selectedNode : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={nodeStyle}
    >
      <button
        type="button"
        className={styles.levelCard}
        aria-label={`Level ${checkpoint.level}: ${checkpoint.title}`}
        aria-pressed={selected}
        onMouseEnter={() => onSelect(checkpoint)}
        onFocus={() => onSelect(checkpoint)}
        onClick={() => onSelect(checkpoint)}
      >
        <span className={styles.nodeFace}>
          <strong>{formatLevel(checkpoint.level)}</strong>

          {checkpoint.free && <small>FREE</small>}

          {checkpoint.milestone && (
            <i>
              <CheckpointIcon type={checkpoint.type} />
            </i>
          )}
        </span>

        <span className={styles.levelReveal}>
          <span className={styles.revealLabel}>
            {checkpoint.label}
          </span>

          <span className={styles.revealHeading}>
            <i>
              <CheckpointIcon type={checkpoint.type} />
            </i>

            <span>
              <small>
                LEVEL {formatLevel(checkpoint.level)}
              </small>

              <strong>{checkpoint.title}</strong>
            </span>
          </span>

          <span className={styles.revealDescription}>
            {checkpoint.description}
          </span>

          <span className={styles.revealOutcome}>
            <strong>WHAT YOU ACHIEVE</strong>
            <span>{checkpoint.outcome}</span>
          </span>

          <span className={styles.revealAction}>
            Selected in journey panel
            <b>→</b>
          </span>
        </span>
      </button>
    </div>
  );
}

function GapDots({
  marker,
  index,
}: {
  marker: GapMarker;
  index: number;
}) {
  return (
    <div
      className={styles.gapMarker}
      style={
        {
          "--gap-x": `${marker.x / 10}%`,
          "--gap-y": `${marker.y / 10}%`,
          "--gap-delay": `${index * 0.12}s`,
        } as CSSProperties
      }
      aria-label={marker.label}
    >
      <div aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <small>{marker.label}</small>
    </div>
  );
}

function JourneyAside({
  checkpoint,
}: {
  checkpoint: RoadmapCheckpoint;
}) {
  const selection = getSelectionInformation(checkpoint.level);

  return (
    <aside className={styles.journeyAside}>
      <TiltSurface
        className={styles.asidePanel}
        delay={0.8}
      >
        <span className={styles.asideEyebrow}>
          JOURNEY PREVIEW
        </span>

        <h2>
          Learn.
          <em>Build.</em>
          Prove.
        </h2>

        <div className={styles.levelCylinder}>
          <span>CURRENT VIEW</span>
          <strong>{selection.range}</strong>
          <small>{selection.included}</small>
          <i aria-hidden="true" />
        </div>

        <div className={styles.selectedSummary}>
          <span>SELECTED LEVEL</span>

          <strong>{formatLevel(checkpoint.level)}</strong>

          <h3>{checkpoint.title}</h3>

          <p>{checkpoint.outcome}</p>
        </div>

        <div className={styles.asideFeatures}>
          <div>
            <i>
              <CheckpointIcon type="learning" />
            </i>
            <span>Guided learning</span>
          </div>

          <div>
            <i>
              <CheckpointIcon type="project" />
            </i>
            <span>Real projects</span>
          </div>

          <div>
            <i>
              <CheckpointIcon type="certificate" />
            </i>
            <span>Career certificates</span>
          </div>

          <div>
            <i>
              <CheckpointIcon type="internship" />
            </i>
            <span>Internship opportunities</span>
          </div>
        </div>

        <CosmicLink href="/signup" arrow="→">
          Start your journey
        </CosmicLink>
      </TiltSurface>
    </aside>
  );
}

export default function RoadmapExperience() {
  const [activeCheckpoint, setActiveCheckpoint] =
    useState<RoadmapCheckpoint>(roadmapCheckpoints[0]);

  return (
    <div className={styles.roadmapPage}>
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>
            <i />
            THE MENTORME 90-LEVEL JOURNEY
            <i />
          </span>

          <h1>
            Every next step.
            <em>Already mapped.</em>
          </h1>

          <p>
            Explore the complete journey from career discovery
            to practical projects, professional certificates,
            portfolio building and internship readiness.
          </p>

          <div className={styles.heroPills}>
            <span>LEVELS 1–10 FREE</span>
            <span>FULL 90-LEVEL PREVIEW</span>
            <span>100+ OPPORTUNITIES</span>
          </div>

          <div className={styles.heroActions}>
            <CosmicLink
              href="#journey-map"
              arrow="↓"
            >
              Explore the roadmap
            </CosmicLink>

            <CosmicLink
              href="/courses"
              arrow="→"
              secondary
            >
              Choose a career track
            </CosmicLink>
          </div>
        </div>
      </section>

      <section className={styles.statsSection}>
        {roadmapStats.map((stat, index) => (
          <TiltSurface
            key={stat.title}
            className={styles.statCard}
            delay={index * 0.55}
          >
            <strong>{stat.value}</strong>

            <div>
              <h2>{stat.title}</h2>
              <p>{stat.description}</p>
            </div>

            <span>↗</span>
          </TiltSurface>
        ))}
      </section>

      <section
        className={styles.journeySection}
        id="journey-map"
      >
        <header className={styles.journeyHeader}>
          <span>YOUR ROAD TO CAREER READINESS</span>

          <h2>
            Follow the path.
            <em>Unlock the proof.</em>
          </h2>

          <p>
            Hover over any level to see what you will learn and
            achieve. Select a level to update the journey panel.
          </p>
        </header>

        <div className={styles.journeyLayout}>
          <JourneyAside checkpoint={activeCheckpoint} />

          <div className={styles.trackShell}>
            <div className={styles.trackLegend}>
              <span>
                <i className={styles.freeLegend} />
                Free starter levels
              </span>

              <span>
                <i className={styles.milestoneLegend} />
                Achievement milestones
              </span>
            </div>

            <div className={styles.trackViewport}>
              <div className={styles.trackCanvas}>
                <div
                  className={styles.mapGrid}
                  aria-hidden="true"
                />

                <svg
                  className={styles.trackSvg}
                  viewBox="0 0 1000 1000"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    className={styles.trackShadow}
                    d={trackPath}
                  />

                  <path
                    className={styles.trackBase}
                    d={trackPath}
                  />

                  <path
                    className={styles.trackStripe}
                    d={trackPath}
                  />
                </svg>

                {zoneLabels.map((zone) => (
                  <span
                    className={styles.zoneLabel}
                    key={zone.label}
                    style={
                      {
                        "--zone-x": `${zone.x / 10}%`,
                        "--zone-y": `${zone.y / 10}%`,
                      } as CSSProperties
                    }
                  >
                    {zone.label}
                  </span>
                ))}

                {gapMarkers.map((marker, index) => (
                  <GapDots
                    marker={marker}
                    index={index}
                    key={marker.label}
                  />
                ))}

                {trackNodes.map((node, index) => (
                  <LevelCard
                    node={node}
                    index={index}
                    selected={
                      activeCheckpoint.level === node.level
                    }
                    onSelect={setActiveCheckpoint}
                    key={node.level}
                  />
                ))}

                <div className={styles.finishMarker}>
                  <span>FINISH</span>
                  <strong>★</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.finalSection}>
        <article className={styles.finalCard}>
          <div className={styles.finalGrid} aria-hidden="true" />

          <div className={styles.finalOrbit} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className={styles.finalContent}>
            <div className={styles.finalIcon}>
              <CheckpointIcon type="internship" />
            </div>

            <span className={styles.finalEyebrow}>
              LEVEL 90 COMPLETED
            </span>

            <h2>
              Career ready.
              <em>Opportunity unlocked.</em>
            </h2>

            <p>
              Complete the full journey with practical skills,
              real projects, milestone certificates, portfolio
              proof and career preparation.
            </p>

            <div className={styles.finalPills}>
              <span>PORTFOLIO READY</span>
              <span>INTERVIEW READY</span>
              <span>INTERNSHIP ELIGIBLE</span>
            </div>

            <CosmicLink href="/signup" arrow="→">
              Begin at Level 01
            </CosmicLink>
          </div>
        </article>
      </section>
    </div>
  );
}