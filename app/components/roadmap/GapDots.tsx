import type { CSSProperties } from "react";

import styles from "./GapDots.module.css";
import type { GapMarker } from "./roadmapMapConfig";

export default function GapDots({
  marker,
  index,
}: {
  marker: GapMarker;
  index: number;
}) {
  return (
    <div
      className={styles.gapMarker}
      style={
        {
          "--gap-x": `${marker.x / 10}%`,
          "--gap-y": `${marker.y / 10}%`,
          "--gap-delay": `${index * 0.12}s`,
        } as CSSProperties
      }
      aria-label={marker.label}
    >
      <div aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <small>{marker.label}</small>
    </div>
  );
}
