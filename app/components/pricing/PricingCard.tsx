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
  plan: PricingPlan;
  billingCycle: BillingCycle;
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
  const Icon = plan.icon;

  const price =
    billingCycle === "monthly"
      ? plan.monthlyPrice
      : plan.annualPrice;

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
      {/* ===================================================
          TOP ROW
          Icon + badge
          =================================================== */}

      <div
        className={
          styles.cardTopRow
        }
      >
        <div
          className={
            styles.icon
          }
        >
          <Icon
            size={20}
            strokeWidth={1.8}
          />
        </div>

        {plan.badge && (
          <div
            className={`${styles.popular} ${
              plan.comingSoon
                ? styles.soonBadge
                : ""
            }`}
          >
            {plan.comingSoon ? (
              <Sparkles
                size={13}
              />
            ) : (
              <Crown
                size={14}
              />
            )}

            {plan.badge}
          </div>
        )}
      </div>

      {/* ===================================================
          PLAN INFORMATION
          =================================================== */}

      <div
        className={
          styles.top
        }
      >
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
          {plan.description}
        </p>
      </div>

      {/* ===================================================
          PRICE
          =================================================== */}

      <div
        className={
          styles.price
        }
      >
        {plan.comingSoon ? (
          <div
            className={
              styles.launchBlock
            }
          >
            <strong
              className={
                styles.launchTitle
              }
            >
              Career support
              <br />
              is on the way.
            </strong>

            <p
              className={
                styles.launchDescription
              }
            >
              Mentor guidance,
              interview preparation
              and portfolio support.
            </p>
          </div>
        ) : plan.startingFrom ? (
          <div
            className={
              styles.coursePrice
            }
          >
            <span
              className={
                styles.priceLabel
              }
            >
              Starting from
            </span>

            <div
              className={
                styles.coursePriceRow
              }
            >
              <div
                className={
                  styles.courseAmount
                }
              >
                <small>
                  ₹
                </small>

                <strong>
                  {formatPrice(
                    plan.startingFrom,
                  )}
                </strong>
              </div>

              <span
                className={
                  styles.courseSuffix
                }
              >
                / course
              </span>
            </div>
          </div>
        ) : price === null ? (
          <div
            className={
              styles.customPrice
            }
          >
            <strong>
              Custom
            </strong>

            <span>
              {plan.priceSuffix}
            </span>
          </div>
        ) : (
          <div
            className={
              styles.standardPrice
            }
          >
            <div>
              <small>
                ₹
              </small>

              <strong>
                {formatPrice(
                  price,
                )}
              </strong>
            </div>

            {price > 0 && (
              <span>
                {billingCycle ===
                "monthly"
                  ? "/ month"
                  : "/ year"}
              </span>
            )}
          </div>
        )}
      </div>

      {/* ===================================================
          ACCESS INFORMATION
          =================================================== */}

      {plan.startingFrom ? (
        <div
          className={
            styles.accessRow
          }
        >
          <div
            className={
              styles.accessDuration
            }
          >
            6 months access
          </div>

          <div
            className={
              styles.levelAccess
            }
          >
            {plan.levelAccess}
          </div>
        </div>
      ) : (
        <div
          className={
            styles.levelAccess
          }
        >
          {plan.levelAccess}
        </div>
      )}

      <div
        className={
          styles.divider
        }
      />

      {/* ===================================================
          FEATURES
          =================================================== */}

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

              {feature.label}
            </li>
          ),
        )}
      </ul>

      {/* ===================================================
          BUTTON
          =================================================== */}

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

            <Sparkles
              size={15}
            />
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