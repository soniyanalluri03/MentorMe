"use client";

import { useState } from "react";

import styles from "./RoadmapJourney.module.css";

import { roadmapCheckpoints } from "./roadmapData";

import JourneyAside from "./JourneyAside";
import RoadmapTrack from "./RoadmapTrack";

export default function RoadmapJourney() {
  const [activeCheckpoint, setActiveCheckpoint] =
    useState(roadmapCheckpoints[0]);

  return (
    <section
      id="journey-map"
      className={styles.journeySection}
    >
      {/* =====================================================
          GLOBAL SHARED HEADING
      ===================================================== */}

      <header className="hj-first-five-heading">
        <h2>
          Follow the path.
          <br />

          <span className="hj-heading-wave text-4xl xl:text-6xl">
            Unlock the
          </span>{" "}

          <em className="text-4xl xl:text-6xl">
            proof.
          </em>
        </h2>

        <span>
          Hover over any level to see what you will
          learn and achieve. Select a level to update
          the journey panel.
        </span>
      </header>

      {/* =====================================================
          JOURNEY CONTENT
      ===================================================== */}

      <div className={styles.journeyLayout}>
        <JourneyAside
          checkpoint={activeCheckpoint}
        />

        <div className={styles.trackColumn}>
          <RoadmapTrack
            activeCheckpoint={activeCheckpoint}
            onSelect={setActiveCheckpoint}
          />
        </div>
      </div>
    </section>
  );
}