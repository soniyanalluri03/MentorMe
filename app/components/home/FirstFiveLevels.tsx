"use client";

import Link from "next/link";
import MotionReveal from "../MotionReveal";

import {
  firstFiveLevels,
} from "./homeJourneyData";

import { CSSProperties } from "react";
import { useHomeJourney } from "./HomeJourneyContext";



export default function FirstFiveLevels() {
  const {
    activeLevel,
    setActiveLevel,
    roadmapImpact,
    setRoadmapImpact,
    setRoadmapReturning,
    selectedLevel,
  } = useHomeJourney();

  return (
    <MotionReveal
      as="section"
      className="hj-roadmap"
      x={-18}
      amount={0.07}
    >
      <div className="hj-grid-texture" />

      <div className="hj-shell">
        <header className="hj-first-five-heading" data-reveal>
          <div className="hj-kicker">
            {/* <Sparkles size={15} /> YOUR FIRST FIVE LEVELS */}
          </div>
          <h2>
            Every career begins
            <br />
            <span className="hj-heading-wave text-4xl xl:text-6xl">
              with one clear
            </span>{" "}
            <em className="text-4xl xl:text-6xl">step</em>
          </h2>
          <span>
            Complete the first five levels, create your first proof, and
            unlock the complete 90-level journey
          </span>
        </header>

        <div
          className="hj-level-journey"
          data-reveal
          style={
            {
              "--active-level": activeLevel,
            } as CSSProperties
          }
        >
          <div className="hj-level-glow hj-level-glow-a" />
          <div className="hj-level-glow hj-level-glow-b" />
          <div className="hj-level-stars" />

          <div
            className={`hj-climb-scene ${
              roadmapImpact ? "is-impacting" : ""
            }`}
          >
            <div className="hj-climb-status" aria-live="polite">
              <small>LEVEL {selectedLevel.number} / 05</small>
              <strong>{selectedLevel.title}</strong>
              <span>{selectedLevel.description}</span>
            </div>

            <Link
              href="/roadmap"
              className={`hj-climb-goal ${
                roadmapImpact ? "is-hit" : ""
              }`}
              aria-label="Open the complete MentorME roadmap"
            >
              <span className="hj-goal-label">GOAL</span>
              <strong>FULL ROADMAP</strong>
              <i className="hj-goal-ring hj-goal-ring-one" />
              <i className="hj-goal-ring hj-goal-ring-two" />
              <i className="hj-goal-pulse" />
              <b className="hj-goal-particle hj-goal-particle-1" />
              <b className="hj-goal-particle hj-goal-particle-2" />
              <b className="hj-goal-particle hj-goal-particle-3" />
              <b className="hj-goal-particle hj-goal-particle-4" />
              <b className="hj-goal-particle hj-goal-particle-5" />
              <b className="hj-goal-particle hj-goal-particle-6" />
              <b className="hj-goal-particle hj-goal-particle-7" />
              <b className="hj-goal-particle hj-goal-particle-8" />
            </Link>

            <div
              className={`hj-climb-runner ${
                roadmapImpact ? "is-goal-bound" : ""
              }`}
              aria-hidden="true"
              style={
                {
                  "--runner-step": activeLevel,
                } as CSSProperties
              }
            >
              <span>YOU</span>
              <i />
            </div>

            <div
              className="hj-climb-steps"
              role="tablist"
              aria-label="First five MentorME levels"
            >
              {firstFiveLevels.map((level, index) => (
                <button
                  key={level.number}
                  type="button"
                  role="tab"
                  aria-selected={activeLevel === index}
                  className={`hj-climb-step ${
                    activeLevel === index ? "is-active" : ""
                  } ${index < activeLevel ? "is-complete" : ""}`}
                  style={
                    {
                      "--step": index,
                      "--delay": `${index * 140}ms`,
                    } as CSSProperties
                  }
                  onMouseEnter={() => {
                    setRoadmapImpact(false);
                    setRoadmapReturning(false);
                    setActiveLevel(index);
                  }}
                  onFocus={() => {
                    setRoadmapImpact(false);
                    setRoadmapReturning(false);
                    setActiveLevel(index);
                  }}
                  onClick={() => {
                    setRoadmapImpact(false);
                    setRoadmapReturning(false);
                    setActiveLevel(index);
                  }}
                >
                  <span className="hj-climb-step-number">{level.number}</span>
                  <span className="hj-climb-step-icon">{level.icon}</span>
                  <span className="hj-climb-step-copy">
                    <b>{level.title}</b>
                    <small>{level.short}</small>
                  </span>
                  <i className="hj-step-depth" aria-hidden="true" />
                  <i className="hj-step-impact" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MotionReveal>
  );
}
