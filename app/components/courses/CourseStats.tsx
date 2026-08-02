import styles from "./CourseStats.module.css";

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
      className={styles.section}
      aria-label="Career track statistics"
    >
      <div className={styles.panel}>
        <div
          className={styles.ambient}
          aria-hidden="true"
        />

        {stats.map((stat, index) => (
          <article
            className={styles.stat}
            key={stat.label}
          >
            <span
              className={styles.index}
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <strong>{stat.value}</strong>

            <span className={styles.label}>
              {stat.label}
            </span>

            <div
              className={styles.line}
              aria-hidden="true"
            />
          </article>
        ))}
      </div>
    </section>
  );
}