"use client";

import type {
  CSSProperties,
} from "react";

import styles from "./RoadmapTrack.module.css";

import {
  roadmapCheckpoints,
  type RoadmapCheckpoint,
} from "./roadmapData";

import GapDots from "./GapDots";
import LevelCard from "./LevelCard";


interface RoadmapTrackProps {
  activeCheckpoint:
    RoadmapCheckpoint;

  onSelect: (
    checkpoint:
      RoadmapCheckpoint,
  ) => void;
}


interface TrackNode {
  level: number;
  x: number;
  y: number;
}


/* =========================================================
   MAP COORDINATE SYSTEM

   SVG:
   width  = 1000
   height = 620

   LevelCard / GapDots internally use:
   x / 10 %
   y / 10 %

   So Y values must be converted from the 620 SVG
   coordinate system into their 1000-based percentage system.
   ========================================================= */

const SVG_HEIGHT = 620;

const POSITION_BASE = 1000;

const convertY = (
  y: number,
) =>
  (y / SVG_HEIGHT) *
  POSITION_BASE;


/* =========================================================
   3 ROW SNAKE ROAD

   ROW 1 →
   ROW 2 ←
   ROW 3 →
   FINISH
   ========================================================= */

const referenceTrackPath = `
  M 110 150

  H 850

  C 900 150
    930 180
    930 230

  V 250

  C 930 300
    900 330
    850 330

  H 110

  C 60 330
    35 365
    35 415

  V 425

  C 35 475
    65 510
    115 510

  H 935
`;


/* =========================================================
   EXACTLY 5 LEVELS PER ROW

   IMPORTANT:
   Keep these Y coordinates identical to the SVG path.

   Row 1 = 150
   Row 2 = 330
   Row 3 = 510
   ========================================================= */

const referenceNodePositions:
  Record<
    number,
    {
      x: number;
      y: number;
    }
  > = {

  /* =======================================================
     ROW 1 →
     01 02 03 04 05
     ======================================================= */

  1: {
    x: 110,
    y: 150,
  },

  2: {
    x: 295,
    y: 150,
  },

  3: {
    x: 480,
    y: 150,
  },

  4: {
    x: 665,
    y: 150,
  },

  5: {
    x: 850,
    y: 150,
  },


  /* =======================================================
     ROW 2 ←

     VISUAL:
     40 30 20 15 10

     PROGRESSION:
     10 → 15 → 20 → 30 → 40
     ======================================================= */

  10: {
    x: 850,
    y: 330,
  },

  15: {
    x: 665,
    y: 330,
  },

  20: {
    x: 480,
    y: 330,
  },

  30: {
    x: 295,
    y: 330,
  },

  40: {
    x: 110,
    y: 330,
  },


  /* =======================================================
     ROW 3 →
     50 60 70 80 90
     ======================================================= */

  50: {
    x: 110,
    y: 510,
  },

  60: {
    x: 295,
    y: 510,
  },

  70: {
    x: 480,
    y: 510,
  },

  80: {
    x: 665,
    y: 510,
  },

  90: {
    x: 850,
    y: 510,
  },
};


/* =========================================================
   DISPLAY ORDER
   ========================================================= */

const roadmapDisplayOrder = [
  1,
  2,
  3,
  4,
  5,

  10,
  15,
  20,
  30,
  40,

  50,
  60,
  70,
  80,
  90,
];


/* =========================================================
   BUILD TRACK NODES

   HERE is the important fix.

   x remains untouched because both systems use width 1000.

   y is converted:
   SVG 620 → LevelCard 1000 base.
   ========================================================= */

const referenceTrackNodes:
  TrackNode[] =
  roadmapDisplayOrder
    .filter((level) =>
      roadmapCheckpoints.some(
        (checkpoint) =>
          checkpoint.level ===
          level,
      ),
    )
    .map((level) => {
      const position =
        referenceNodePositions[
          level
        ];

      return {
        level,

        x:
          position.x,

        y:
          convertY(
            position.y,
          ),
      };
    });


/* =========================================================
   GAP LABELS

   Coordinates here stay in the SVG 620 system first.
   They are converted below before being passed to GapDots.
   ========================================================= */

const referenceGapMarkers = [
  /* 05 → 10 */

  {
    label:
      "Levels 6–9",

    x: 915,
    y: 240,
  },


  /* ROW 2 */

  {
    label:
      "Levels 11–14",

    x: 755,
    y: 375,
  },

  {
    label:
      "Levels 16–19",

    x: 570,
    y: 375,
  },

  {
    label:
      "Levels 21–29",

    x: 385,
    y: 375,
  },

  {
    label:
      "Levels 31–39",

    x: 200,
    y: 375,
  },


  /* 40 → 50 */

  {
    label:
      "Levels 41–49",

    x: 60,
    y: 425,
  },


  /* ROW 3 */

  {
    label:
      "Levels 51–59",

    x: 200,
    y: 555,
  },

  {
    label:
      "Levels 61–69",

    x: 385,
    y: 555,
  },

  {
    label:
      "Levels 71–79",

    x: 570,
    y: 555,
  },

  {
    label:
      "Levels 81–89",

    x: 755,
    y: 555,
  },
];


/* =========================================================
   CONVERT GAP MARKER Y POSITIONS

   Same reason as nodes:
   GapDots expects y as a 1000-based percentage coordinate.
   ========================================================= */

const positionedGapMarkers =
  referenceGapMarkers.map(
    (marker) => ({
      ...marker,

      y:
        convertY(
          marker.y,
        ),
    }),
  );


/* =========================================================
   ZONE LABELS

   Zone labels are rendered directly here,
   so we can use the real SVG height of 620.

   No conversion required.
   ========================================================= */

const referenceZoneLabels = [
  {
    label:
      "DISCOVER",

    x: 110,
    y: 55,
  },

  {
    label:
      "BUILD SKILLS",

    x: 480,
    y: 240,
  },

  {
    label:
      "CREATE PROOF",

    x: 295,
    y: 420,
  },

  {
    label:
      "CAREER READY",

    x: 665,
    y: 420,
  },
];


/* =========================================================
   COMPONENT
   ========================================================= */

export default function RoadmapTrack({
  activeCheckpoint,
  onSelect,
}: RoadmapTrackProps) {
  return (
    <div
      className={
        styles.trackShell
      }
    >
      {/* ================================================
          LEGEND
          ================================================ */}

      {/* <div
        className={
          styles.trackLegend
        }
      >
        <span>
          <i
            className={
              styles.freeLegend
            }
          />

          Free starter levels
        </span>

        <span>
          <i
            className={
              styles.milestoneLegend
            }
          />

          Achievement milestones
        </span>
      </div> */}


      {/* ================================================
          MAP
          ================================================ */}

      <div
        className={
          styles.trackViewport
        }
      >
        <div
          className={
            styles.trackCanvas
          }
        >
          <div
            className={
              styles.mapGlow
            }
            aria-hidden="true"
          />


          {/* ============================================
              ROAD
              ============================================ */}

          <svg
            className={
              styles.trackSvg
            }
            viewBox="0 0 1000 620"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className={
                styles.trackShadow
              }
              d={
                referenceTrackPath
              }
            />

            <path
              className={
                styles.trackBase
              }
              d={
                referenceTrackPath
              }
            />

            <path
              className={
                styles.trackStripe
              }
              d={
                referenceTrackPath
              }
            />
          </svg>


          {/* ============================================
              ZONE LABELS
              ============================================ */}

          {referenceZoneLabels.map(
            (zone) => (
              <span
                className={
                  styles.zoneLabel
                }
                key={
                  zone.label
                }
                style={
                  {
                    "--zone-x":
                      `${zone.x / 10}%`,

                    "--zone-y":
                      `${zone.y / 6.2}%`,
                  } as CSSProperties
                }
              >
                {
                  zone.label
                }
              </span>
            ),
          )}


          {/* ============================================
              GAP LABELS
              ============================================ */}

          {positionedGapMarkers.map(
            (
              marker,
              index,
            ) => (
              <GapDots
                marker={
                  marker
                }
                index={
                  index
                }
                key={
                  marker.label
                }
              />
            ),
          )}


          {/* ============================================
              LEVELS
              ============================================ */}

        {referenceTrackNodes.map(
  (
    node,
    index,
  ) => {
    const columnIndex =
      index % 5;

    const variant =
      columnIndex % 2 === 0
        ? "purple"
        : "gold";

    return (
      <LevelCard
        key={node.level}
        node={node}
        index={index}
        variant={variant}
        selected={
          activeCheckpoint.level ===
          node.level
        }
        onSelect={
          onSelect
        }
      />
    );
  },
)}


          {/* ============================================
              FINISH
              ============================================ */}

          <div
            className={
              styles.finishMarker
            }
          >
            <strong>
              ★
            </strong>

            <span>
              FINISH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}