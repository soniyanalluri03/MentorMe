import styles from "./RoadmapExperience.module.css";
import RoadmapFinalSection from "./RoadmapFinalSection";
import RoadmapHero from "./RoadmapHero";
import RoadmapJourney from "./RoadmapJourney";
import RoadmapStats from "./RoadmapStats";

export default function RoadmapExperience() {
  return (
    <div className={styles.roadmapPage}>
      <RoadmapHero />
      <RoadmapStats />
      <RoadmapJourney />
      <RoadmapFinalSection />
    </div>
  );
}
