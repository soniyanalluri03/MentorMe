export const publicChatRoutes = [
  "/", "/courses", "/roadmap", "/leaderboard", "/pricing", "/about", "/contact",
  "/login", "/signup", "/signup?plan=pro",
] as const;

export type ChatAction = {
  label: string;
  route: (typeof publicChatRoutes)[number];
  type: "navigate";
};
export type VisitorField = "name" | "email" | "mobile";
export type ChatResponse = {
  session_id: string;
  message: string;
  title: string | null;
  intent: string;
  topic: string;
  bullets: string[];
  highlight: string | null;
  quick_replies: string[];
  actions: ChatAction[];
  requires_input: { field: VisitorField; optional: boolean; prompt: string } | null;
  session_reset: boolean;
  visitor: { name: string | null; email_provided: boolean; mobile_provided: boolean };
  confidence: number;
};

const sessionKey = "mentorme-public-chat-session";
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function readSessionId(): string | null {
  try {
    const value = sessionStorage.getItem(sessionKey);
    return value && uuidPattern.test(value) ? value : null;
  } catch {
    return null;
  }
}

export function saveSessionId(value: string | null) {
  try {
    if (value) sessionStorage.setItem(sessionKey, value);
    else sessionStorage.removeItem(sessionKey);
  } catch {
    // Chat still works with an in-memory ID when browser storage is unavailable.
  }
}

function baseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_CHATBOT_API_URL;
  if (configured) return configured.replace(/\/$/, "");
  if (typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname)) {
    return `http://${window.location.hostname}:8000`;
  }
  throw new Error("Chatbot API URL is not configured");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function strings(value: unknown): value is string[] {
  return Array.isArray(value) && value.length <= 10 && value.every(item => typeof item === "string");
}

export function parseChatResponse(value: unknown): ChatResponse {
  if (!isRecord(value) || typeof value.session_id !== "string" || !uuidPattern.test(value.session_id)
      || typeof value.message !== "string" || typeof value.intent !== "string" || typeof value.topic !== "string"
      || !(value.title === null || typeof value.title === "string")
      || !(value.highlight === null || typeof value.highlight === "string")
      || !strings(value.bullets) || !strings(value.quick_replies) || !Array.isArray(value.actions)
      || value.actions.length > 4 || typeof value.session_reset !== "boolean") {
    throw new Error("Invalid chatbot response");
  }
  for (const action of value.actions) {
    if (!isRecord(action) || typeof action.label !== "string" || action.type !== "navigate"
        || !publicChatRoutes.some(route => route === action.route)) throw new Error("Invalid chatbot action");
  }
  const visitor = value.visitor;
  if (!isRecord(visitor) || !(visitor.name === null || typeof visitor.name === "string")
      || typeof visitor.email_provided !== "boolean" || typeof visitor.mobile_provided !== "boolean"
      || typeof value.confidence !== "number" || !Number.isFinite(value.confidence)
      || value.confidence < 0 || value.confidence > 1) {
    throw new Error("Invalid chatbot profile or confidence");
  }
  const field = value.requires_input;
  if (field !== null && (!isRecord(field) || !["name", "email", "mobile"].includes(String(field.field))
      || typeof field.prompt !== "string" || typeof field.optional !== "boolean")) {
    throw new Error("Invalid chatbot input prompt");
  }
  return value as ChatResponse;
}

export async function sendChat(message: string, sessionId: string | null, currentPath: string, signal: AbortSignal): Promise<ChatResponse> {
  const response = await fetch(`${baseUrl()}/api/chat`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, session_id: sessionId, context: { current_path: currentPath } }),
    signal: AbortSignal.any([signal, AbortSignal.timeout(15000)]),
    credentials: "omit", cache: "no-store",
  });
  if (!response.ok) throw new Error(`Chatbot request failed (${response.status})`);
  return parseChatResponse(await response.json());
}

export async function clearChatSession(sessionId: string, signal: AbortSignal): Promise<void> {
  const response = await fetch(`${baseUrl()}/api/chat/session/${encodeURIComponent(sessionId)}`, {
    method: "DELETE", signal: AbortSignal.any([signal, AbortSignal.timeout(5000)]),
    credentials: "omit", cache: "no-store",
  });
  if (!response.ok) throw new Error(`Chatbot reset failed (${response.status})`);
}

export async function startChatSession(sessionId: string | null, signal: AbortSignal): Promise<ChatResponse> {
  const response = await fetch(`${baseUrl()}/api/chat/session`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId }),
    signal: AbortSignal.any([signal, AbortSignal.timeout(15000)]),
    credentials: "omit", cache: "no-store",
  });
  if (!response.ok) throw new Error(`Chatbot session failed (${response.status})`);
  return parseChatResponse(await response.json());
}
