"use client";

import {
  useState,
} from "react";

import {
  HelpCircle,
  Sparkles,
} from "lucide-react";

import {
  pricingFAQs,
} from "./PricingData";

import styles from "./PricingFAQ.module.css";

export default function PricingFAQ() {
  const [
    openIndex,
    setOpenIndex,
  ] = useState<
    number | null
  >(0);

  const handleToggle = (
    index: number,
  ) => {
    setOpenIndex(
      (current) =>
        current === index
          ? null
          : index,
    );
  };

  return (
    <section
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
          <HelpCircle
            size={15}
          />

          QUESTIONS, ANSWERED
        </div>

        <h2>
          Frequently{" "}

          <span className="hj-heading-wave">
            asked
          </span>{" "}

          <br />

          <em className="text-4xl xl:text-6xl">
            questions.
          </em>
        </h2>

        <span>
          Everything you need
          to know before
          choosing your
          MentorMe plan.
        </span>
      </header>

      <div
        className={
          styles.faqs
        }
      >
        {pricingFAQs.map(
          (
            item,
            index,
          ) => {
            const isOpen =
              openIndex ===
              index;

            return (
              <article
                key={
                  item.question
                }
                className={`${styles.item} ${
                  isOpen
                    ? styles.open
                    : ""
                }`}
              >
                <button
                  type="button"
                  className={
                    styles.question
                  }
                  onClick={() =>
                    handleToggle(
                      index,
                    )
                  }
                  aria-expanded={
                    isOpen
                  }
                >
                  <span
                    className={
                      styles.number
                    }
                  >
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <strong>
                    {
                      item.question
                    }
                  </strong>

                  <i
                    className={
                      styles.plus
                    }
                    aria-hidden="true"
                  >
                    +
                  </i>
                </button>

                <div
                  className={
                    styles.answerWrapper
                  }
                  aria-hidden={
                    !isOpen
                  }
                >
                  <div
                    className={
                      styles.answerInner
                    }
                  >
                    <div
                      className={
                        styles.answer
                      }
                    >
                      <p>
                        {
                          item.answer
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          },
        )}
      </div>

      <div
        className={
          styles.footer
        }
      >
        <Sparkles
          size={15}
        />

        Still have a question?

        <a href="/contact">
          Talk to MentorMe →
        </a>
      </div>
    </section>
  );
}