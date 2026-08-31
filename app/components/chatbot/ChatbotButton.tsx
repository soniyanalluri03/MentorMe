"use client";

import { useState } from "react";
import {
  Bot,
  Send,
  X,
} from "lucide-react";

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mentorme-chatbot">
      {/* =========================================
          CHAT WINDOW
      ========================================== */}

      <div
        className={`mentorme-chat-window ${
          open ? "mentorme-chat-window--open" : ""
        }`}
        aria-hidden={!open}
      >
        {/* HEADER */}

        <div className="mentorme-chat-header">
          <div className="mentorme-chat-identity">
            <span className="mentorme-chat-avatar">
              <Bot
                size={21}
                strokeWidth={1.9}
              />
            </span>

            <div>
              <strong>
                MentorME Assistant
              </strong>

              <span>
                <i aria-hidden="true" />
                Online
              </span>
            </div>
          </div>

          <button
            type="button"
            className="mentorme-chat-close"
            onClick={() => setOpen(false)}
            aria-label="Close MentorME assistant"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}

        <div className="mentorme-chat-messages">
          <div className="mentorme-chat-message">
            <span className="mentorme-chat-message-avatar">
              <Bot
                size={16}
                strokeWidth={1.9}
              />
            </span>

            <div>
              <p>
                Hi! I&apos;m your MentorME
                assistant.
              </p>

              <p>
                What would you like help
                with today?
              </p>
            </div>
          </div>

          {/* QUICK ACTIONS */}

          <div className="mentorme-chat-actions">
            <button type="button">
              Career tracks
            </button>

            <button type="button">
              Explore roadmap
            </button>

            <button type="button">
              Find my next step
            </button>
          </div>
        </div>

        {/* INPUT */}

        <div className="mentorme-chat-input">
          <input
            type="text"
            placeholder="Ask MentorME..."
            aria-label="Ask MentorME"
          />

          <button
            type="button"
            aria-label="Send message"
          >
            <Send
              size={17}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>

      {/* =========================================
          FLOATING CHATBOT BUTTON
      ========================================== */}

      <button
        type="button"
        className={`mentorme-chat-trigger ${
          open
            ? "mentorme-chat-trigger--open"
            : ""
        }`}
        onClick={() =>
          setOpen((current) => !current)
        }
        aria-label={
          open
            ? "Close MentorME assistant"
            : "Open MentorME assistant"
        }
        aria-expanded={open}
      >
        <span
          className="mentorme-chat-pulse"
          aria-hidden="true"
        />

        <span
          className="mentorme-chat-orbit"
          aria-hidden="true"
        />

        <span className="mentorme-chat-trigger-icon">
          {open ? (
            <X
              size={25}
              strokeWidth={2}
            />
          ) : (
            <Bot
              size={29}
              strokeWidth={1.8}
            />
          )}
        </span>
      </button>
    </div>
  );
}