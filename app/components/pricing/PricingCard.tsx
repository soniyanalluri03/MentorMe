import Link from "next/link";

import {
  ArrowRight,
  Check,
  Crown,
  Sparkles,
  X,
} from "lucide-react";

import type {
  BillingCycle,
  PricingPlan,
} from "./PricingData";

import styles from "./PricingCard.module.css";

interface PricingCardProps {
  plan:
    PricingPlan;

  billingCycle:
    BillingCycle;
}

function formatPrice(
  value: number,
) {
  return new Intl.NumberFormat(
    "en-IN",
  ).format(value);
}

export default function PricingCard({
  plan,
  billingCycle,
}: PricingCardProps) {
  const Icon =
    plan.icon;

  const price =
    billingCycle ===
    "monthly"
      ? plan.monthlyPrice
      : plan.annualPrice;

  const monthlyEquivalent =
    billingCycle ===
      "annually" &&
    typeof plan.annualPrice ===
      "number" &&
    plan.annualPrice > 0
      ? Math.round(
          plan.annualPrice /
            12,
        )
      : null;

  return (
    <article
  className={`${styles.card} ${
    plan.featured
      ? styles.featured
      : ""
  } ${
    plan.comingSoon
      ? styles.comingSoonCard
      : ""
  }`}
>
      {plan.badge && (
        <div
          className={
            styles.popular
          }
        >
          <Crown
            size={14}
          />

          {plan.badge}
        </div>
      )}

      <div
        className={
          styles.top
        }
      >
        <div
          className={
            styles.icon
          }
        >
          <Icon
            size={21}
            strokeWidth={
              1.7
            }
          />
        </div>

        <span
          className={
            styles.eyebrow
          }
        >
          {plan.eyebrow}
        </span>

        <h3>
          {plan.name}
        </h3>

        <p>
          {
            plan.description
          }
        </p>
      </div>

      <div className={styles.price}>
  {plan.comingSoon ? (
    <div className={styles.launchBlock}>
      <span className={styles.launchStatus}>
        <Sparkles size={13} />
        Launching soon
      </span>

      <strong className={styles.launchTitle}>
        Career guidance,
        <br />
        built around you.
      </strong>

      <p className={styles.launchDescription}>
        Mentor sessions, interview preparation and
        career support are coming next.
      </p>
    </div>
  ) : plan.startingFrom ? (
    <div className={styles.coursePrice}>
      <span className={styles.priceLabel}>
        Starting from
      </span>

      <div className={styles.coursePriceRow}>
        <div className={styles.courseAmount}>
          <small>₹</small>

          <strong>
            {formatPrice(plan.startingFrom)}
          </strong>
        </div>

        <span className={styles.courseSuffix}>
          / course
        </span>
      </div>

      <div className={styles.accessDuration}>
        6 months access
      </div>
    </div>
  ) : price === null ? (
    <div className={styles.customPrice}>
      <strong>
        Custom
      </strong>

      <span>
        {plan.priceSuffix}
      </span>
    </div>
  ) : (
    <>
      <div>
        <small>₹</small>

        <strong>
          {formatPrice(price)}
        </strong>
      </div>

      {price > 0 && (
        <span>
          {billingCycle === "monthly"
            ? "/ month"
            : "/ year"}
        </span>
      )}

      {monthlyEquivalent && (
        <p>
          ≈ ₹
          {formatPrice(monthlyEquivalent)}
          /month
        </p>
      )}

      {billingCycle === "annually" &&
        plan.annualSaving && (
          <b>
            {plan.annualSaving}
          </b>
        )}
    </>
  )}
</div>
      <div
        className={
          styles.levelAccess
        }
      >
        {plan.levelAccess}
      </div>

      <div
        className={
          styles.divider
        }
      />

      <div
        className={
          styles.featureTitle
        }
      >
        What&apos;s included
      </div>

      <ul
        className={
          styles.features
        }
      >
        {plan.features.map(
          (feature) => (
            <li
              key={
                feature.label
              }
              className={
                !feature.included
                  ? styles.disabled
                  : feature.highlight
                    ? styles.highlight
                    : ""
              }
            >
              <span>
                {feature.included ? (
                  <Check
                    size={14}
                  />
                ) : (
                  <X
                    size={13}
                  />
                )}
              </span>

              {
                feature.label
              }
            </li>
          ),
        )}
      </ul>

      <div
        className={
          styles.bottom
        }
      >
        {plan.comingSoon ? (
  <div
    className={
      styles.comingSoonButton
    }
  >
    <span>
      Coming soon
    </span>

    <Sparkles size={16} />
  </div>
) : (
  <Link
    href={plan.href}
    className={
      plan.featured
        ? styles.primaryButton
        : styles.secondaryButton
    }
  >
    {plan.cta}

    <ArrowRight
      size={17}
    />
  </Link>
)}

        {plan.note && (
          <small>
            {plan.note}
          </small>
        )}
      </div>
    </article>
  );
}