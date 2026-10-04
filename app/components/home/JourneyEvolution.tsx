"use client";

import { CSSProperties } from "react";
import MotionReveal from "../MotionReveal";

export default function JourneyEvolution() {
  return (
<MotionReveal

        as="section"

        className="hj-evolution"

        x={18}

        amount={0.07}

      >

        <div className="hj-evolution-orb hj-evolution-orb-a" />

        <div className="hj-evolution-orb hj-evolution-orb-b" />



        <div className="hj-shell">

          <header

            className="hj-first-five-heading hj-evolution-heading"

            data-reveal

          >

            <h2>

              Your journey keeps moving.

              <br />



              <span className="hj-heading-wave text-4xl xl:text-6xl">

                Every milestone unlocks

              </span>{" "}



              <em className="text-4xl xl:text-6xl">

                more.

              </em>

            </h2>



            <span>

              Follow the road from guided learning to XP, projects, mentor

              feedback, portfolio proof, and real career opportunities.

            </span>

          </header>



          <div className="hj-road-game" data-reveal>

            <div className="hj-road-game-grid" />

            <div className="hj-road-game-stars" />



            <svg

              className="hj-road-svg"

              viewBox="0 0 1500 760"

              preserveAspectRatio="none"

              aria-hidden="true"

            >

              <defs>

                <linearGradient id="hjRoadGlow" x1="0" y1="0" x2="1" y2="1">

                  <stop offset="0%" stopColor="#8f5cf7" />

                  <stop offset="52%" stopColor="#f2d875" />

                  <stop offset="100%" stopColor="#70d7ff" />

                </linearGradient>



                <filter id="hjRoadBlur" x="-30%" y="-30%" width="160%" height="160%">

                  <feGaussianBlur stdDeviation="9" />

                </filter>

              </defs>



              <path

                className="hj-road-shadow-path"

                d="M120 650

                   C260 650 310 650 390 650

                   C505 650 540 585 540 520

                   C540 450 485 420 420 420

                   C335 420 305 365 305 305

                   C305 230 370 195 470 195

                   C590 195 635 250 635 325

                   C635 410 705 450 800 450

                   C905 450 950 390 950 320

                   C950 230 1030 190 1140 190

                   C1245 190 1320 235 1370 320

                   C1400 370 1400 430 1370 500"

              />



              <path

                className="hj-road-main-path"

                d="M120 650

                   C260 650 310 650 390 650

                   C505 650 540 585 540 520

                   C540 450 485 420 420 420

                   C335 420 305 365 305 305

                   C305 230 370 195 470 195

                   C590 195 635 250 635 325

                   C635 410 705 450 800 450

                   C905 450 950 390 950 320

                   C950 230 1030 190 1140 190

                   C1245 190 1320 235 1370 320

                   C1400 370 1400 430 1370 500"

              />



              <path

                className="hj-road-center-path"

                d="M120 650

                   C260 650 310 650 390 650

                   C505 650 540 585 540 520

                   C540 450 485 420 420 420

                   C335 420 305 365 305 305

                   C305 230 370 195 470 195

                   C590 195 635 250 635 325

                   C635 410 705 450 800 450

                   C905 450 950 390 950 320

                   C950 230 1030 190 1140 190

                   C1245 190 1320 235 1370 320

                   C1400 370 1400 430 1370 500"

              />

            </svg>



            <div className="hj-road-start">

              <small>START</small>

              <strong>LEVEL 06</strong>

            </div>



            <div className="hj-road-finish">

              <i>★</i>

              <div>

                <small>CAREER READY</small>

                <strong>Internship unlocked</strong>

              </div>

              <b className="hj-road-finish-wave" aria-hidden="true" />

            </div>



            <div className="hj-road-runner" aria-hidden="true">

              <span className="hj-runner-head" />

              <span className="hj-runner-body" />

              <span className="hj-runner-arm hj-runner-arm-a" />

              <span className="hj-runner-arm hj-runner-arm-b" />

              <span className="hj-runner-leg hj-runner-leg-a" />

              <span className="hj-runner-leg hj-runner-leg-b" />

              <i className="hj-runner-glow" />



              <div className="hj-runner-float-labels">

                <b className="hj-runner-float hj-runner-float-1">TRACK CHOSEN</b>

                <b className="hj-runner-float hj-runner-float-2">MISSION STARTED</b>

                <b className="hj-runner-float hj-runner-float-3">+120 XP</b>

                <b className="hj-runner-float hj-runner-float-4">PROJECT BUILT</b>

                <b className="hj-runner-float hj-runner-float-5">MENTOR APPROVED</b>

                <b className="hj-runner-float hj-runner-float-6">PORTFOLIO +1</b>

                <b className="hj-runner-float hj-runner-float-7">INTERNSHIP UNLOCKED</b>

              </div>

            </div>



            <div className="hj-road-checkpoints">

              {[

                {

                  number: "01",

                  title: "Choose Track",

                  copy: "Pick your direction",

                  icon: "⌖",

                  reward: "TRACK CHOSEN",

                  className: "hj-road-point-1",

                },

                {

                  number: "02",

                  title: "Guided Mission",

                  copy: "Learn by doing",

                  icon: "◆",

                  reward: "MISSION STARTED",

                  className: "hj-road-point-2",

                },

                {

                  number: "03",

                  title: "Earn XP",

                  copy: "Progress becomes visible",

                  icon: "+XP",

                  reward: "+120 XP",

                  className: "hj-road-point-3",

                },

                {

                  number: "04",

                  title: "Build Project",

                  copy: "Create career proof",

                  icon: "</>",

                  reward: "PROJECT BUILT",

                  className: "hj-road-point-4",

                },

                {

                  number: "05",

                  title: "Mentor Review",

                  copy: "Improve with feedback",

                  icon: "◎",

                  reward: "MENTOR APPROVED",

                  className: "hj-road-point-5",

                },

                {

                  number: "06",

                  title: "Portfolio",

                  copy: "Show what you can do",

                  icon: "▣",

                  reward: "PORTFOLIO +1",

                  className: "hj-road-point-6",

                },

                {

                  number: "07",

                  title: "Opportunity",

                  copy: "Unlock the next door",

                  icon: "★",

                  reward: "OPPORTUNITY UNLOCKED",

                  className: "hj-road-point-7",

                },

              ].map((point, index) => (

                <article

                  key={point.number}

                  className={`hj-road-point ${point.className}`}

                  style={{ "--point-index": index } as CSSProperties}

                >

                  <span className="hj-road-point-number">{point.number}</span>

                  <i className="hj-road-point-icon">{point.icon}</i>

                  <div>

                    <strong>{point.title}</strong>

                    <small>{point.copy}</small>

                  </div>

                  <b className="hj-road-point-pulse" />

                  <b className="hj-road-point-reward">{point.reward}</b>

                </article>

              ))}

            </div>



            <div className="hj-road-progress-badge">

              <span>06 → 90</span>

              <small>THE JOURNEY CONTINUES</small>

            </div>

          </div>

        </div>

      </MotionReveal>
  );
}
