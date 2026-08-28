"use client";

import {
  useState,
} from "react";

import PricingFAQ from "./PricingFAQ";
import PricingHero from "./PricingHero";
import PricingPlans from "./PricingPlans";
import MotionReveal from "../MotionReveal";

import type {
  BillingCycle,
} from "./PricingData";

import styles from "./Pricing.module.css";

export default function Pricing() {
  const [
    billingCycle,
    setBillingCycle,
  ] =
    useState<BillingCycle>(
      "annually",
    );

  return (
    <main
      className={
        styles.pricingPage
      }
    >
      <MotionReveal as="section" y={24} amount={0.06}>
        <PricingHero />
      </MotionReveal>

      <MotionReveal as="section" x={-18}>
        <PricingPlans
          billingCycle={
            billingCycle
          }
          onBillingChange={
            setBillingCycle
          }
        />
      </MotionReveal>

      <MotionReveal as="section" x={18}>
        <PricingFAQ />
      </MotionReveal>
    </main>
  );
}
