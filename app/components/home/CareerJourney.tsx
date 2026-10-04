"use client";

import MotionReveal from "../MotionReveal";
import { processSteps } from "./homeJourneyData";
import { useHomeJourney } from "./HomeJourneyContext";

export default function CareerJourney() {
  const {
    activeStep,
    setActiveStep,
    activeProcess,
  } = useHomeJourney();

  return (
    <MotionReveal
      as="section"
      className="hj-tracks"
      y={32}
      amount={0.08}
    >
      <div className="hj-orb hj-orb-a" />
      <div className="hj-orb hj-orb-b" />

      <div className="hj-shell">
        <div className="hj-scroll-cue" aria-hidden="true">
          <span />
          <i><b /></i>
          <span />
          <small>Scroll</small>
        </div>

        <div className="hj-intro-layout">
          <header
            className="hj-first-five-heading hj-home-heading"
            data-reveal
          >
            <h2>
              Choose the path that fits you
              <br />
              <span className="hj-heading-wave text-4xl xl:text-6xl">
                Build the proof that opens
              </span>{" "}
              <em className="text-4xl xl:text-6xl">
                doors.
              </em>
            </h2>
          </header>
        </div>

        <div className="hj-process" data-reveal>
          <div className="hj-process-line">
            <span className="hj-process-progress" />
            <i
              className={`hj-process-spark ${
                activeStep === 0
                  ? "hj-process-spark--hidden"
                  : ""
              }`}
            >
              <b />
              <b />
              <b />
            </i>
          </div>

          <div
            className="hj-process-steps"
            role="tablist"
            aria-label="MentorME career journey"
          >
            {processSteps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                role="tab"
                aria-selected={activeStep === index}
                className={
                  activeStep === index
                    ? "hj-process-step is-active"
                    : "hj-process-step"
                }
                onMouseEnter={() => setActiveStep(index)}
                onFocus={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
              >
                <span>{step.number}</span>
                <i>{step.icon}</i>
                <b>{step.title}</b>
              </button>
            ))}
          </div>

          <div className="hj-process-detail">
            <div className="hj-process-detail-icon">
              {activeProcess.icon}
            </div>

            <div>
              <small>{activeProcess.number} / 07</small>
              <h3>{activeProcess.headline}</h3>
              <p>{activeProcess.description}</p>
            </div>
          </div>
        </div>
      </div>
    </MotionReveal>
  );
}