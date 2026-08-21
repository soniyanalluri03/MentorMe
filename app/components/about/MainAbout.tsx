import AboutHero from "./AboutHero";
import AboutOverview from "./AboutOverview";
import AboutStory from "./AboutStory";
import AboutProgress from "./AboutProgress";
import AboutTeam from "./AboutTeam";
import AboutReviews from "./AboutReviews";
import styles from "./About.module.css";

export default function MainAbout() {
  return (
    <main className="about-page">
      <AboutHero />
      <AboutOverview />
      <AboutStory />
      <AboutProgress />
      <AboutTeam />
      <AboutReviews />
    </main>
  );
}