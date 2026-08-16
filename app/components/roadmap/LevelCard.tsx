"use client";

import type {
  CSSProperties,
} from "react";

import styles from "./LevelCard.module.css";

import {
  getCheckpoint,
  type RoadmapCheckpoint,
} from "./roadmapData";

import {
  formatLevel,
  type TrackNode,
} from "./roadmapMapConfig";

import {
  CheckpointIcon,
} from "./RoadmapUI";


interface LevelCardProps {
  node:
    TrackNode;

  selected:
    boolean;

  index:
    number;

  variant:
    | "purple"
    | "gold";

  onSelect: (
    checkpoint:
      RoadmapCheckpoint,
  ) => void;
}


export default function LevelCard({
  node,
  selected,
  index,
  variant,
  onSelect,
}: LevelCardProps) {
  const checkpoint =
    getCheckpoint(
      node.level,
    );


  /* =======================================================
     KEEP EXPANDED CARD INSIDE MAP
     ======================================================= */

  const shiftX =
    node.x < 190
      ? "108px"
      : node.x > 810
        ? "-108px"
        : "0px";


  const shiftY =
    node.y < 300
      ? "108px"
      : node.y > 760
        ? "-112px"
        : "0px";


  const nodeStyle = {
    "--node-x":
      `${node.x / 10}%`,

    "--node-y":
      `${node.y / 10}%`,

    "--node-delay":
      `${index * 0.08}s`,

    "--expand-x":
      shiftX,

    "--expand-y":
      shiftY,
  } as CSSProperties;


  return (
    <div
      className={[
        styles.nodeSlot,

        checkpoint.free
          ? styles.freeNode
          : "",

        checkpoint.milestone
          ? styles.milestoneNode
          : "",

        variant === "purple"
          ? styles.purpleVariant
          : styles.goldVariant,

        selected
          ? styles.selectedNode
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        nodeStyle
      }
    >
      <button
        type="button"
        className={
          styles.levelCard
        }
        aria-label={
          `Level ${checkpoint.level}: ${checkpoint.title}`
        }
        aria-pressed={
          selected
        }
        onMouseEnter={() =>
          onSelect(
            checkpoint,
          )
        }
        onFocus={() =>
          onSelect(
            checkpoint,
          )
        }
        onClick={() =>
          onSelect(
            checkpoint,
          )
        }
      >
        {/* ===============================================
            CLOSED CIRCLE

            Top checkpoint icon removed.
            =============================================== */}

        <span
          className={
            styles.nodeFace
          }
        >
          <strong>
            {formatLevel(
              checkpoint.level,
            )}
          </strong>

          {checkpoint.free && (
            <small>
              FREE
            </small>
          )}
        </span>


        {/* ===============================================
            EXPANDED CARD
            =============================================== */}

        <span
          className={
            styles.levelReveal
          }
        >
          <span
            className={
              styles.revealTop
            }
          >
            <span
              className={
                styles.revealLabel
              }
            >
              {
                checkpoint.label
              }
            </span>

            <span
              className={
                styles.revealLevel
              }
            >
              LEVEL{" "}
              {formatLevel(
                checkpoint.level,
              )}
            </span>
          </span>


          <span
            className={
              styles.revealHeading
            }
          >
            {/* Icon stays in expanded card */}

            <i>
              <CheckpointIcon
                type={
                  checkpoint.type
                }
              />
            </i>

            <strong>
              {
                checkpoint.title
              }
            </strong>
          </span>


          <span
            className={
              styles.revealDescription
            }
          >
            {
              checkpoint.description
            }
          </span>


          <span
            className={
              styles.revealOutcome
            }
          >
            <span
              className={
                styles.outcomeTitle
              }
            >
              WHAT YOU ACHIEVE
            </span>

            <span
              className={
                styles.outcomeCopy
              }
            >
              {
                checkpoint.outcome
              }
            </span>
          </span>
        </span>
      </button>
    </div>
  );
}