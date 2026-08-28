"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type MotionRevealProps = {
  children: ReactNode;
  as?: "div" | "section";
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
  amount?: number;
  "aria-labelledby"?: string;
};

export default function MotionReveal({
  children,
  as = "div",
  className,
  delay = 0,
  x = 0,
  y = 42,
  amount = 0.14,
  "aria-labelledby": ariaLabelledby,
}: MotionRevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = as === "section" ? motion.section : motion.div;

  return (
    <Component
      className={className}
      aria-labelledby={ariaLabelledby}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x,
              y,
              scale: 0.988,
              filter: "blur(6px)",
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
      }
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.82,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  );
}
