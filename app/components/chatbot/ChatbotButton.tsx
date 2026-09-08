"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import { usePublicChat } from "./usePublicChat";
import {
  Bot,
  Send,
  X,
} from "lucide-react";

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, isSending, requiredField, send, clear } = usePublicChat(open);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const latestRef = useRef<HTMLDivElement>(null);
  const nearBottom = useRef(true);
  const followReveal = useRef(true);
  const revealLatest = useCallback(() => {
    const container = messagesRef.current;
    if (followReveal.current && container && latestRef.current) {
      container.scrollTop = latestRef.current.offsetTop - 12;
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    // The approved shell starts visibility-hidden during its opening transition.
    const focusTimer = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300);
    return () => window.clearTimeout(focusTimer);
  }, [open]);

  useEffect(() => {
    const container = messagesRef.current;
    if (!open || !container || !nearBottom.current) return;
    const latest = latestRef.current;
    container.scrollTop = latest && !isSending ? latest.offsetTop - 12 : container.scrollHeight;
  }, [messages, isSending, open]);

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  function submit(text: string) {
    if (!text.trim() || text.trim().length > 2000 || isSending) return;
    nearBottom.current = true;
    followReveal.current = true;
    setInput("");
    void send(text);
    inputRef.current?.focus();
  }

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
        inert={!open}
        id="mentorme-public-chat"
        role="region"
        aria-label="MentorME public assistant"
        onTransitionEnd={(event) => {
          if (open && event.target === event.currentTarget && event.propertyName === "transform"
              && document.activeElement === launcherRef.current) {
            inputRef.current?.focus({ preventScroll: true });
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.stopPropagation();
            close();
          }
        }}
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
            onClick={close}
            aria-label="Close MentorME assistant"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}

        <div className="mentorme-chat-tools">
          <button type="button" onClick={() => {
            const container = messagesRef.current;
            if (container) container.scrollTop = container.scrollHeight;
            nearBottom.current = true;
          }}>Latest messages ↓</button>
          <button type="button" disabled={isSending} onClick={() => {
            setInput("");
            nearBottom.current = true;
            void clear();
          }}>Clear chat</button>
        </div>
        <div
          className="mentorme-chat-messages"
          ref={messagesRef}
          role="log"
          aria-label="Conversation"
          aria-live="polite"
          aria-relevant="additions"
          tabIndex={0}
          onPointerDown={() => { followReveal.current = false; }}
          onWheel={() => { followReveal.current = false; }}
          onTouchMove={() => { followReveal.current = false; }}
          onKeyDown={(event) => {
            if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) followReveal.current = false;
          }}
          onScroll={() => {
            const container = messagesRef.current;
            if (container) nearBottom.current = container.scrollHeight - container.scrollTop - container.clientHeight < 70;
          }}
        >
          {messages.map((message, index) => (
            <div key={message.id} ref={index === messages.length - 1 ? latestRef : undefined}>
              <ChatMessage message={message} active={index === messages.length - 1} busy={isSending} onReply={submit} onReveal={revealLatest} />
            </div>
          ))}
          {isSending && <div className="mentorme-chat-typing" role="status">MentorME is typing<span aria-hidden="true">…</span></div>}
        </div>

        {/* INPUT */}

        <form className="mentorme-chat-input" onSubmit={(event) => {
          event.preventDefault();
          submit(input);
        }}>
          <input
            ref={inputRef}
            type="text"
            inputMode={requiredField === "email" ? "email" : requiredField === "mobile" ? "tel" : "text"}
            autoComplete="off"
            maxLength={2000}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && event.nativeEvent.isComposing) event.preventDefault();
            }}
            readOnly={isSending}
            placeholder={requiredField ? `Your ${requiredField} (optional)...` : "Ask MentorME..."}
            aria-label="Ask MentorME"
          />

          <button
            type="submit"
            disabled={isSending || !input.trim()}
            aria-label="Send message"
          >
            <Send
              size={17}
              strokeWidth={2}
            />
          </button>
        </form>
      </div>

      {/* =========================================
          FLOATING CHATBOT BUTTON
      ========================================== */}

      <button
        ref={launcherRef}
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
        aria-controls="mentorme-public-chat"
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
