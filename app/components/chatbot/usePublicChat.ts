"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { clearChatSession, readSessionId, saveSessionId, sendChat, startChatSession, type ChatResponse, type VisitorField } from "./chatbotApi";

export type ChatMessage = { id: number; role: "user" | "assistant"; text: string; response?: ChatResponse; animate?: boolean };

const greetingResponse: ChatResponse = {
  session_id: "", title: null, intent: "greeting", topic: "greeting",
  message: "Hi! I'm your MentorMe Assistant 👋\nBefore we get started, what should I call you?",
  bullets: [], highlight: null, quick_replies: ["Skip for now"], actions: [],
  requires_input: { field: "name", optional: true, prompt: "What should I call you?" },
  session_reset: false, visitor: { name: null, email_provided: false, mobile_provided: false }, confidence: 1,
};
const greeting: ChatMessage = { id: 0, role: "assistant", text: greetingResponse.message, response: greetingResponse };

function unavailable(): ChatResponse {
  return {
    session_id: "", title: "Let's keep exploring", intent: "unavailable", topic: "unavailable",
    message: "I'm having trouble connecting right now. You can try your message again or explore MentorMe below.",
    bullets: [], highlight: null, quick_replies: [], requires_input: null, session_reset: false,
    visitor: { name: null, email_provided: false, mobile_provided: false }, confidence: 0,
    actions: [
      { label: "Career Tracks", route: "/courses", type: "navigate" },
      { label: "Roadmap", route: "/roadmap", type: "navigate" },
      { label: "Pricing", route: "/pricing", type: "navigate" },
      { label: "Contact", route: "/contact", type: "navigate" },
    ],
  };
}

export function usePublicChat(open: boolean) {
  const pathname = usePathname();
  const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
  const [isSending, setIsSending] = useState(false);
  const [requiredField, setRequiredField] = useState<VisitorField | undefined>("name");
  const sessionId = useRef<string | null>(null);
  const request = useRef<AbortController | null>(null);
  const initialized = useRef(false);
  const sequence = useRef(0);

  useEffect(() => {
    sessionId.current = readSessionId();
    return () => request.current?.abort();
  }, []);

  useEffect(() => {
    if (!open || initialized.current || request.current) return;
    const controller = new AbortController();
    request.current = controller;
    async function initialize() {
      setIsSending(true);
      try {
        const response = await startChatSession(sessionId.current, controller.signal);
        if (controller.signal.aborted) return;
        sessionId.current = response.session_id;
        saveSessionId(response.session_id);
        setRequiredField(response.requires_input?.field);
        setMessages([{ id: 0, role: "assistant", text: response.message, response }]);
        initialized.current = true;
      } catch {
        if (!controller.signal.aborted) {
          const response = unavailable();
          setMessages([{ id: 0, role: "assistant", text: response.message, response }]);
        }
      } finally {
        if (request.current === controller) {
          request.current = null;
          setIsSending(false);
        }
      }
    }
    void initialize();
    return () => {
      controller.abort();
      if (request.current === controller) request.current = null;
    };
  }, [open]);

  function append(message: Omit<ChatMessage, "id">) {
    const next = { ...message, id: ++sequence.current };
    setMessages(current => [...current.slice(-39), next]);
  }

  async function send(raw: string) {
    const message = raw.trim();
    if (!message || message.length > 2000 || request.current) return;
    const controller = new AbortController();
    request.current = controller;
    setIsSending(true);
    const privateInput = /\S+@\S+|(?:\+?\d[\s().-]*){7,}|my password is|password\s*[:=]|card number|cvv|otp is|api[_ -]?key\s*[:=]/i.test(message);
    const contactInput = (requiredField === "email" || requiredField === "mobile") && !["skip", "cancel"].includes(message.toLowerCase());
    append({ role: "user", text: privateInput ? "[Private details omitted]" : contactInput ? "[Contact response provided]" : message });
    try {
      // A failed opening request can be retried by simply sending a message.
      if (!initialized.current) {
        const session = await startChatSession(sessionId.current, controller.signal);
        if (controller.signal.aborted) return;
        sessionId.current = session.session_id;
        saveSessionId(session.session_id);
        initialized.current = true;
      }
      const response = await sendChat(message, sessionId.current, pathname || "/", controller.signal);
      if (controller.signal.aborted) return;
      sessionId.current = response.session_id;
      saveSessionId(response.session_id);
      setRequiredField(response.requires_input?.field);
      append({ role: "assistant", text: response.message, response, animate: true });
    } catch (error) {
      if (controller.signal.aborted) return;
      if (process.env.NODE_ENV === "development") console.warn("MentorMe chat connection failed", error instanceof Error ? error.message : "Unknown error");
      const response = unavailable();
      append({ role: "assistant", text: response.message, response });
    } finally {
      if (request.current === controller) {
        request.current = null;
        setIsSending(false);
      }
    }
  }

  async function clear() {
    if (request.current) return;
    const controller = new AbortController();
    request.current = controller;
    setIsSending(true);
    let notice = "";
    try {
      if (sessionId.current) await clearChatSession(sessionId.current, controller.signal);
    } catch {
      notice = "This browser chat is cleared. I couldn't reach the server to clear its session; temporary details expire automatically.";
    }
    if (controller.signal.aborted) return;
    sessionId.current = null;
    saveSessionId(null);
    initialized.current = false;
    setRequiredField("name");
    setMessages([greeting, ...(notice ? [{ id: ++sequence.current, role: "assistant" as const, text: notice }] : [])]);
    request.current = null;
    setIsSending(false);
  }

  return { messages, isSending, requiredField, send, clear };
}
