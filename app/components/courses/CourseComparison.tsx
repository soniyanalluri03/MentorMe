export default function CourseComparison() {
  return (
    <section className="comparison section-shell">
      <div className="comparison__heading">
        <div className="section-kicker">
          A DIFFERENT LEARNING EXPERIENCE
        </div>

        <h2>
          Not another content library.{" "}
          <span>A system that moves you.</span>
        </h2>
      </div>

      <div className="comparison-grid">
        <article className="compare-card compare-card--old">
          <div className="compare-card__label">
            TRADITIONAL COURSE PLATFORM
          </div>

          <blockquote>
            “What video should I watch next?”
          </blockquote>

          <div className="flow flow--muted">
            <span>Watch</span>
            <i>→</i>
            <span>Watch more</span>
            <i>→</i>
            <span>Certificate</span>
          </div>

          <ul>
            <li>Unclear learning sequence</li>
            <li>Progress measured by watch time</li>
            <li>Little practical accountability</li>
            <li>Certificates without enough evidence</li>
          </ul>
        </article>

        <article className="compare-card compare-card--mentor">
          <div
            className="compare-card__border"
            aria-hidden="true"
          />

          <div className="compare-card__label">
            MENTORME CAREER SYSTEM
          </div>

          <blockquote>
            “What outcome should I complete next?”
          </blockquote>

          <div className="flow">
            <span>Learn</span>
            <i>→</i>
            <span>Practice</span>
            <i>→</i>
            <span>Build</span>
            <i>→</i>
            <span>Prove</span>
          </div>

          <ul>
            <li>One structured level at a time</li>
            <li>Practice after every important concept</li>
            <li>Projects that demonstrate capability</li>
            <li>A portfolio that grows with your progress</li>
          </ul>
        </article>
      </div>
    </section>
  );
}