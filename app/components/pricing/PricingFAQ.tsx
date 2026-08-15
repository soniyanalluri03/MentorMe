import {
  HelpCircle,
  Sparkles,
} from "lucide-react";

import { pricingFAQs } from "./PricingData";

import styles from "./PricingFAQ.module.css";

export default function PricingFAQ() {
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

            QUESTIONS,
          ANSWERED
          </div>


          <h2>
            Frequently 

            {" "}<span className="hj-heading-wave "
            >
              asked
            </span>{" "}
<br/>
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
          ) => (
            <details
              key={
                item.question
              }
              className={
                styles.item
              }
              open={
                index === 0
              }
            >
              <summary>
                <span>
                  {String(
                    index +
                      1,
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

                <i>
                  +
                </i>
              </summary>

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
            </details>
          ),
        )}
      </div>

      <div
        className={
          styles.footer
        }
      >
        <Sparkles
          size={14}
        />

        Still have a question?

        <a
          href="/contact"
        >
          Talk to MentorMe →
        </a>
      </div>
    </section>
  );
}