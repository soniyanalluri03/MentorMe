"use client";

import {
  useState,
} from "react";

import PricingFAQ from "./PricingFAQ";
import PricingHero from "./PricingHero";
import PricingPlans from "./PricingPlans";

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
      <PricingHero />

      <PricingPlans
        billingCycle={
          billingCycle
        }
        onBillingChange={
          setBillingCycle
        }
      />

      <PricingFAQ />
    </main>
  );
}