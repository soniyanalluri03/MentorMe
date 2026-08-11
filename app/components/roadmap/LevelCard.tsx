"use client";

import type { CSSProperties } from "react";

import styles from "./LevelCard.module.css";
import {
  getCheckpoint,
  type RoadmapCheckpoint,
} from "./roadmapData";
import {
  formatLevel,
  type TrackNode,
} from "./roadmapMapConfig";
import { CheckpointIcon } from "./RoadmapUI";

interface LevelCardProps {
  node: TrackNode;
  selected: boolean;
  index: number;
  onSelect: (checkpoint: RoadmapCheckpoint) => void;
}

export default function LevelCard({
  node,
  selected,
  index,
  onSelect,
}: LevelCardProps) {
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
