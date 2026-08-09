import styles from "./JourneyAside.module.css";
import type { RoadmapCheckpoint } from "./roadmapData";
import {
  formatLevel,
  getSelectionInformation,
} from "./roadmapMapConfig";
import {
  CheckpointIcon,
  CosmicLink,
  TiltSurface,
} from "./RoadmapUI";
import Link from "next/link";
export default function JourneyAside({
  checkpoint,
}: {
  checkpoint: RoadmapCheckpoint;
}) {
  const selection = getSelectionInformation(checkpoint.level);

  return (
    <aside className={styles.journeyAside}>
      <TiltSurface
        className={styles.asidePanel}
        wrapperClassName={styles.journeyTilt}
        delay={0.8}
      >
        <span className={styles.asideEyebrow}>
          JOURNEY PREVIEW
        </span>

        <h2>
          Learn.
          <em>Build.</em>
          Prove.
        </h2>

        <div className={styles.levelCylinder}>
          <span>CURRENT VIEW</span>
          <strong>{selection.range}</strong>
          <small>{selection.included}</small>
          <i aria-hidden="true" />
        </div>

        <div className={styles.selectedSummary}>
          <span>SELECTED LEVEL</span>
          <strong>{formatLevel(checkpoint.level)}</strong>
          <h3>{checkpoint.title}</h3>
          <p>{checkpoint.outcome}</p>
        </div>

        <div className={styles.asideFeatures}>
          <div>
            <i>
              <CheckpointIcon type="learning" />
            </i>
            <span>Guided learning</span>
          </div>

          <div>
            <i>
              <CheckpointIcon type="project" />
            </i>
            <span>Real projects</span>
          </div>

          <div>
            <i>
              <CheckpointIcon type="certificate" />
            </i>
            <span>Career certificates</span>
          </div>

          <div>
            <i>
              <CheckpointIcon type="internship" />
            </i>
            <span>Internship opportunities</span>
          </div>
        </div>

        <Link
          href="/signup"
          className="navbar-sign-in"
        >
          Start your journey
        </Link>
      </TiltSurface>
    </aside>
  );
}
