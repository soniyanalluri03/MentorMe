"use client";
import type { ReactNode } from "react";
import styles from "./highlight-card.module.css";
interface HighlightCardProps {
  number: string;
  title: string;
  description: string[];
  icon?: ReactNode;
}
export default function HighlightCard({
  number,
  title,
  description,
  icon,
}: HighlightCardProps) {
  return (
    <article className={styles.card}>
      <div
        className={styles.border}
        aria-hidden="true"
      />

      <div
        className={styles.shine}
        aria-hidden="true"
      />

      <div
        className={styles.glow}
        aria-hidden="true"
      />

      <div className={styles.top}>
        <span className={styles.number}>
          {number}
        </span>

        <div className={styles.icon}>
          {icon}
        </div>
      </div>

      <div
        className={styles.rule}
        aria-hidden="true"
      />

      <div className={styles.content}>
        <h3>{title}</h3>

        {description.map((line, index) => (
          <p key={`${title}-${index}`}>
            {line}
          </p>
        ))}
      </div>

      <div
        className={styles.footer}
        aria-hidden="true"
      >
        <span />
        <i />
        <i />
        <i />
      </div>
    </article>
  );
}