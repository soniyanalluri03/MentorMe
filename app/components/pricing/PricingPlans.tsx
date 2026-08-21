import {
  BadgeCheck,
  Sparkles,
} from "lucide-react";

import BillingToggle from "./BillingToggle";
import PricingCard from "./PricingCard";

import {
  pricingPlans,
  type BillingCycle,
} from "./PricingData";

import styles from "./PricingPlans.module.css";

interface PricingPlansProps {
  billingCycle:
    BillingCycle;

  onBillingChange:
    (
      value:
        BillingCycle,
    ) => void;
}

export default function PricingPlans({
  billingCycle,
  onBillingChange,
}: PricingPlansProps) {
  return (
    <section
      id="pricing-plans"
      className={
        styles.section
      }
    >
      <header className="hj-first-five-heading">
                <div
                className={
                  styles.kicker
                }
              >
                {/* <BadgeCheck
            size={15}
          />
      
                 CHOOSE YOUR ACCESS */}
              </div>
             
      
              <h2>
                Different 
                
      
                {" "}<span className="hj-heading-wave "
                >
                  levels of
                </span>{" "}
      
                <em className="text-4xl xl:text-6xl">
                  support.
                </em>
              </h2>
      
                <span>
                  Choose monthly for
          flexibility or annual
          billing for the best
          value.
                </span>
       </header>

      <div
        className={
          styles.toggle
        }
      >
        <BillingToggle
          value={
            billingCycle
          }
          onChange={
            onBillingChange
          }
        />
      </div>

      <div
        className={
          styles.grid
        }
      >
        {pricingPlans.map(
          (plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billingCycle={
                billingCycle
              }
            />
          ),
        )}
      </div>

      <div
        className={
          styles.securityNote
        }
      >
        <Sparkles
          size={14}
        />

        Your progress,
        certificates and
        completed milestones
        remain connected to
        your account.
      </div>
    </section>
  );
}