import { useEffect, useState } from "react";
import Link from "next/link";
import { Bot } from "lucide-react";
import { type ChatMessage as Message } from "./usePublicChat";

type Props = { message: Message; active: boolean; busy: boolean; onReply: (text: string) => void; onReveal: () => void };

export default function ChatMessage({ message, active, busy, onReply, onReveal }: Props) {
  const [stage, setStage] = useState(message.animate ? 0 : 2);
  useEffect(() => {
    if (!message.animate) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bullets = window.setTimeout(() => setStage(1), reducedMotion ? 0 : 110);
    const choices = window.setTimeout(() => setStage(2), reducedMotion ? 0 : 260);
    return () => { window.clearTimeout(bullets); window.clearTimeout(choices); };
  }, [message.animate]);

  useEffect(() => {
    if (active && message.animate) onReveal();
  }, [active, message.animate, stage, onReveal]);

  if (message.role === "user") {
    return <div className="mentorme-chat-user"><span className="mentorme-chat-sr-only">You: </span>{message.text}</div>;
  }
  const response = message.response;
  const replies = response?.quick_replies ?? [];
  return (
    <div className="mentorme-chat-turn" aria-busy={stage < 2}>
      <div className={`mentorme-chat-message ${message.animate ? "mentorme-chat-arrive" : ""}`}>
        <span className="mentorme-chat-message-avatar" aria-hidden="true"><Bot size={16} strokeWidth={1.9} /></span>
        <div>
          <span className="mentorme-chat-sr-only">MentorME Assistant: </span>
          {response?.session_reset && <p className="mentorme-chat-note">Your previous session expired or was cleared. We&apos;re starting fresh.</p>}
          {response?.title && <h3 className="mentorme-chat-answer-title">{response.title}</h3>}
          <p className="mentorme-chat-answer-text">{message.text}</p>
          {stage >= 1 && (
            <div className={message.animate ? "mentorme-chat-arrive" : undefined}>
              {!!response?.bullets.length && <ul className="mentorme-chat-bullets">{response.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
              {response?.highlight && <p className="mentorme-chat-highlight">{response.highlight}</p>}
            </div>
          )}
        </div>
      </div>
      {stage >= 2 && !!response?.actions.length && (
        <div className={`mentorme-chat-route-actions ${message.animate ? "mentorme-chat-arrive" : ""}`} aria-label="Suggested pages">
          {response.actions.map(action => <Link key={action.route} href={action.route}>{action.label}<span aria-hidden="true"> ↗</span></Link>)}
        </div>
      )}
      {stage >= 2 && active && !!replies.length && (
        <div className={`mentorme-chat-actions ${message.animate ? "mentorme-chat-arrive" : ""}`} aria-label="Suggested questions">
          {replies.map(reply => <button type="button" key={reply} onClick={() => onReply(reply)} disabled={busy}>{reply}</button>)}
        </div>
      )}
    </div>
  );
}
