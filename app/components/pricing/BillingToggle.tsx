import type {
  BillingCycle,
} from "./PricingData";

import styles from "./BillingToggle.module.css";

interface BillingToggleProps {
  value: BillingCycle;

  onChange:
    (
      value:
        BillingCycle,
    ) => void;
}

export default function BillingToggle({
  value,
  onChange,
}: BillingToggleProps) {
  return (
    <div
      className={
        styles.wrapper
      }
      aria-label="Billing cycle"
    >
      <button
        type="button"
        className={
          value ===
          "monthly"
            ? styles.active
            : ""
        }
        onClick={() =>
          onChange(
            "monthly",
          )
        }
        aria-pressed={
          value ===
          "monthly"
        }
      >
        Monthly
      </button>

      <button
        type="button"
        className={
          value ===
          "annually"
            ? styles.active
            : ""
        }
        onClick={() =>
          onChange(
            "annually",
          )
        }
        aria-pressed={
          value ===
          "annually"
        }
      >
        Annually

        <span>
          SAVE 20%
        </span>
      </button>

      <i
        className={
          value ===
          "annually"
            ? styles.right
            : styles.left
        }
        aria-hidden="true"
      />
    </div>
  );
}