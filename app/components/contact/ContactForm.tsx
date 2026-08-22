"use client";

import {
  ArrowRight,
  BadgeCheck,
  Send,
} from "lucide-react";

import { useState } from "react";

import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [sent, setSent] =
    useState(false);

  return (
    <div className={styles.formPanel}>
      <div className={styles.formHeader}>
        <div>
          <span>
            SEND A MESSAGE
          </span>

          <h3>
            Tell us what
            <br />
            you&apos;re working on.
          </h3>
        </div>

        <div className={styles.formIcon}>
          <Send
            size={24}
            strokeWidth={1.7}
          />
        </div>
      </div>

      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <div className={styles.fieldRow}>
          <label className={styles.field}>
            <span>Name</span>

            <input
              required
              type="text"
              placeholder="Your name"
            />
          </label>

          <label className={styles.field}>
            <span>Email</span>

            <input
              required
              type="email"
              placeholder="you@example.com"
            />
          </label>
        </div>

        <div className={styles.fieldRow}>
          <label className={styles.field}>
            <span>Phone</span>

            <input
              required
              type="tel"
              placeholder="+91"
            />
          </label>

          <label className={styles.field}>
            <span>I am a...</span>

            <select
              required
              defaultValue=""
            >
              <option
                value=""
                disabled
              >
                Select one
              </option>

              <option value="student">
                Student
              </option>

              <option value="educator">
                Educator
              </option>

              <option value="partner">
                Partner
              </option>

              <option value="other">
                Other
              </option>
            </select>
          </label>
        </div>

        <label className={styles.field}>
          <span>Subject</span>

          <input
            required
            type="text"
            placeholder="How can we help?"
          />
        </label>

        <label className={styles.field}>
          <span>Message</span>

          <textarea
            required
            rows={6}
            placeholder="Tell us a little more..."
          />
        </label>

        <div className={styles.formBottom}>
          <button
            type="submit"
            className="navbar-sign-in"
          >
            Send message
            <ArrowRight size={18} />
          </button>

          <span className={styles.privacy}>
            We&apos;ll only use your details to respond
            to this enquiry.
          </span>
        </div>

        {sent && (
          <div
            className={styles.success}
            role="status"
          >
            <BadgeCheck size={18} />

            <span>
              <strong>
                Message received.
              </strong>

              We&apos;ll be in touch soon.
            </span>
          </div>
        )}
      </form>
    </div>
  );
}