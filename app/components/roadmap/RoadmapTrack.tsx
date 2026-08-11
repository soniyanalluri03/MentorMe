"use client";

import type { CSSProperties } from "react";

import styles from "./RoadmapTrack.module.css";
import type { RoadmapCheckpoint } from "./roadmapData";
import {
  gapMarkers,
  trackNodes,
  trackPath,
  zoneLabels,
} from "./roadmapMapConfig";
import GapDots from "./GapDots";
import LevelCard from "./LevelCard";

interface RoadmapTrackProps {
  activeCheckpoint: RoadmapCheckpoint;
  onSelect: (checkpoint: RoadmapCheckpoint) => void;
}

export default function RoadmapTrack({
  activeCheckpoint,
  onSelect,
}: RoadmapTrackProps) {
  return (
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
          <div className={styles.mapGrid} aria-hidden="true" />

          <svg
            className={styles.trackSvg}
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className={styles.trackShadow} d={trackPath} />
            <path className={styles.trackBase} d={trackPath} />
            <path className={styles.trackStripe} d={trackPath} />
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
              selected={activeCheckpoint.level === node.level}
              onSelect={onSelect}
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
  );
}
