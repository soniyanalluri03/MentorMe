"use client";

import Link from "next/link";
import {
  useRef,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";

import styles from "./RoadmapUI.module.css";
import type { CheckpointType } from "./roadmapData";

interface TiltSurfaceProps {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  delay?: number;
}

interface CosmicLinkProps {
  href: string;
  children: ReactNode;
  arrow: string;
  secondary?: boolean;
  className?: string;
}

export function TiltSurface({
  children,
  className = "",
  wrapperClassName = "",
  delay = 0,
}: TiltSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (event.pointerType === "touch") {
      return;
    }

    const surface = surfaceRef.current;

    if (!surface) {
      return;
    }

    const bounds = surface.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const horizontalRatio = localX / bounds.width;
    const verticalRatio = localY / bounds.height;
    const rotateY = (horizontalRatio - 0.5) * 12;
    const rotateX = (0.5 - verticalRatio) * 10;

    surface.style.setProperty("--tilt-x", `${rotateX}deg`);
    surface.style.setProperty("--tilt-y", `${rotateY}deg`);
    surface.style.setProperty("--glow-x", `${localX}px`);
    surface.style.setProperty("--glow-y", `${localY}px`);
  }

  function resetTilt() {
    const surface = surfaceRef.current;

    if (!surface) {
      return;
    }

    surface.style.setProperty("--tilt-x", "0deg");
    surface.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <div
      className={`${styles.tiltAuto} ${wrapperClassName}`.trim()}
      style={
        {
          "--tilt-delay": `${delay}s`,
        } as CSSProperties
      }
    >
      <div
        ref={surfaceRef}
        className={`${styles.tiltSurface} ${className}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
      >
        {children}
      </div>
    </div>
  );
}

export function CosmicLink({
  href,
  children,
  arrow,
  secondary = false,
  className = "",
}: CosmicLinkProps) {
  return (
    <Link
      href={href}
      className={[
        styles.cosmicButton,
        secondary ? styles.cosmicButtonSecondary : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={styles.cosmicStars} />

      <span className={styles.cosmicGlow}>
        <i />
        <i />
      </span>

      <span className={styles.cosmicButtonText}>
        <strong>{children}</strong>
        <b>{arrow}</b>
      </span>
    </Link>
  );
}

export function CheckpointIcon({
  type,
}: {
  type: CheckpointType;
}) {
  if (type === "direction") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="m15.5 8.5-2.2 5-5 2.2 2.2-5 5-2.2Z" />
      </svg>
    );
  }

  if (type === "learning") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
        <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" />
      </svg>
    );
  }

  if (type === "practice") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m5 12.5 4.2 4L19 7" />
        <path d="M12 3a9 9 0 1 0 9 9" />
      </svg>
    );
  }

  if (type === "project" || type === "portfolio") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <path d="M8 6V4h8v2M3 11h18M9 11v2h6v-2" />
      </svg>
    );
  }

  if (type === "certificate") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="9" r="5" />
        <path d="m9 13-1 8 4-2 4 2-1-8" />
        <path d="m10 9 1.2 1.2L14 7.5" />
      </svg>
    );
  }

  if (type === "career") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="7" r="3" />
        <path d="M5 21a7 7 0 0 1 14 0M9 14h6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2 2.3 5.2L20 8l-4.2 3.8 1.2 5.7-5-2.9-5 2.9 1.2-5.7L4 8l5.7-.8L12 2Z" />
      <path d="M7 21h10" />
    </svg>
  );
}
