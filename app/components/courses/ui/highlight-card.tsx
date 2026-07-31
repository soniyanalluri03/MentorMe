"use client";

import type { ReactNode } from "react";

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
    <article className="method-highlight-card">
      <div
        className="method-highlight-card__border"
        aria-hidden="true"
      />

      <div
        className="method-highlight-card__shine"
        aria-hidden="true"
      />

      <div
        className="method-highlight-card__glow"
        aria-hidden="true"
      />

      <div className="method-highlight-card__top">
        <span className="method-highlight-card__number">
          {number}
        </span>

        <div className="method-highlight-card__icon">
          {icon}
        </div>
      </div>

      <div className="method-highlight-card__rule" />

      <div className="method-highlight-card__content">
        <h3>{title}</h3>

        {description.map((line, index) => (
          <p key={`${title}-${index}`}>
            {line}
          </p>
        ))}
      </div>

      <div
        className="method-highlight-card__footer"
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