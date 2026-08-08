"use client";

import { useState } from "react";

import styles from "./RoadmapJourney.module.css";
import {
  roadmapCheckpoints,
  type RoadmapCheckpoint,
} from "./roadmapData";
import JourneyAside from "./JourneyAside";
import RoadmapTrack from "./RoadmapTrack";

export default function RoadmapJourney() {
  const [activeCheckpoint, setActiveCheckpoint] =
    useState<RoadmapCheckpoint>(roadmapCheckpoints[0]);

  return (
    <section className={styles.journeySection} id="journey-map">
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

        <RoadmapTrack
          activeCheckpoint={activeCheckpoint}
          onSelect={setActiveCheckpoint}
        />
      </div>
    </section>
  );
}
