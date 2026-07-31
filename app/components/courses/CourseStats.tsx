const stats = [
  {
    value: "90",
    label: "Sequential levels",
  },
  {
    value: "12+",
    label: "Portfolio projects",
  },
  {
    value: "9",
    label: "Milestone certificates",
  },
  {
    value: "1",
    label: "Career-ready portfolio",
  },
];

export default function CourseStats() {
  return (
    <section
      className="stats-wrap"
      aria-label="Career track statistics"
    >
      <div className="stats-panel">
        {stats.map((stat) => (
          <article key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}