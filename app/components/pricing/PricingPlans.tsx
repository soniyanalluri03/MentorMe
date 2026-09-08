import { Sparkles } from "lucide-react";

import BillingToggle from "./BillingToggle";
import PricingCard from "./PricingCard";

import {
  pricingPlans,
  type BillingCycle,
} from "./PricingData";

import styles from "./PricingPlans.module.css";

interface PricingPlansProps {
  billingCycle: BillingCycle;

  onBillingChange: (
    value: BillingCycle
  ) => void;
}

export default function PricingPlans({
  billingCycle,
  onBillingChange,
}: PricingPlansProps) {
  return (
    <section
      id="pricing-plans"
      className={styles.section}
      aria-labelledby="pricing-plans-heading"
    >
      {/* =====================================================
          SHARED GLOBAL HEADING
      ===================================================== */}

      <header className="hj-first-five-heading">
        <h2 id="pricing-plans-heading">
          Different{" "}

          <span className="hj-heading-wave text-4xl xl:text-6xl">
            levels of
          </span>{" "}

          <em className="text-4xl xl:text-6xl">
            support.
          </em>
        </h2>

        <span>
          Choose monthly for flexibility or annual billing
          for the best value.
        </span>
      </header>

      {/* =====================================================
          BILLING TOGGLE
      ===================================================== */}

      <div className={styles.toggle}>
        <BillingToggle
          value={billingCycle}
          onChange={onBillingChange}
        />
      </div>

      {/* =====================================================
          PRICING CARDS
      ===================================================== */}

      <div className={styles.grid}>
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            billingCycle={billingCycle}
          />
        ))}
      </div>

      {/* =====================================================
          SECURITY / PROGRESS NOTE
      ===================================================== */}

      <div className={styles.securityNote}>
        <Sparkles size={14} />

        <span>
          Your progress, certificates and completed
          milestones remain connected to your account.
        </span>
      </div>
    </section>
  );
}