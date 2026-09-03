# MentorMe public chatbot — local review

Enhanced on `feature/chatbot-fastapi`. This continues the existing React chatbot and FastAPI service. No LLM, external AI API, new dependency, database, account integration, or contact-delivery service is required.

## Run locally (PowerShell)

Frontend, from the repository root:

```powershell
cd C:\Users\Jai\MentorMe
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Backend, in another terminal (the existing virtual environment is ready):

```powershell
cd C:\Users\Jai\MentorMe\backend
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload --no-access-log
```

Open http://127.0.0.1:3000. Keep one backend worker while using in-memory sessions. A backend already running with reload can be reused.

For a different frontend origin, set `CHATBOT_CORS_ORIGINS` using the format in `.env.example`. For a different API address, set `NEXT_PUBLIC_CHATBOT_API_URL` before starting/building the frontend. Hosted frontends require an explicit API URL. Local development defaults to port 8000 on localhost or 127.0.0.1.

## What changed

The assistant introduces itself and asks for an optional name. Skip, cancel, or a direct product question lets a visitor continue immediately. After the introduction, all nine initial choices are available in the existing wrapping, scrollable conversation area:

What is MentorMe? · How it works · Career tracks · Explore roadmap · Find my next step · Pricing · Start free · Talk to the team · Certificates.

The response composer occasionally uses a shared name, keeps answers short, offers deeper information on follow-ups, and adjusts project answers to the visitor's track interest. Quick replies use the same POST /api/chat path as typed questions. The existing header, launcher, input, send button, colors and themes retain their appearance. Only conversation content has new subtle progressive transitions; reduced-motion preferences are respected.

The knowledge repository now contains **75 entries across 31 categories**. The 46 existing topics remain, with expanded aliases, more conversational writing and more precise next choices.

New knowledge intents: `track_system`, `checkpoints`, `lessons`, `missions`, `challenges`, `streaks`, `certificate_milestones`, `career_toolkit`, `compare_plans`, `free_vs_pro`, `pro_vs_accelerator`, `pricing_help`, `assistance`, `signup_pro`, `exploring`, `not_sure`, `wellbeing`, `mission`, `partnerships`, `contact_hours`, `location`, and `community`, `public_access`. The `introduction` response completes the optional name flow.

## Matching and conversation routing

1. Unicode/case, whitespace, punctuation, contractions, common abbreviations and product spelling are normalized.
2. Explicit aliases cover the reported short typos, including “hat is mentor me”, “priscing”, “pro prise”, “career trak”, “signuo”, “porfolio” and “certficates”.
3. Reusable PhraseIndex matching combines exact aliases, phrases, token coverage and Python's standard-library difflib similarity.
4. At least 75% of meaningful query words must have lexical support. Context adds small boosts only after that requirement passes.
5. Weak ambiguous matches fall back instead of confidently choosing a topic. Responses expose a bounded confidence value; this is a routing score, not a calibrated probability.
6. Plan and track follow-ups, supported comparisons and optional profile controls are resolved explicitly. Unsupported policy/price promises and unrelated questions retain a grounded fallback.

The matcher does not call an LLM or download a model. The existing future LLM-provider protocol is retained.

## Memory and profile

In-memory sessions still use the replaceable SessionRepository interface, per-session transactions, bounded capacity, idle expiration and history limits.

Defaults: 500 sessions, 30-minute idle TTL, 24 history messages; browser transcript is limited to 40 messages. The browser stores only the random session ID in sessionStorage. A reload resumes the last assistant response or the current optional input prompt; it does not re-ask a completed name introduction.

A session retains:
- visitor_name, visitor_email and visitor_mobile through the typed Visitor profile;
- current_topic, previous_topic, current_intent, current_plan, previous_plan and current_career_track;
- interests, asked_topics and per-topic visit counts;
- previous_quick_replies, previous navigation actions and conversation_history;
- introduction status, lead_collection_state and current optional field;
- the last assistant response and spacing for occasional personalization.

Existing internal mentioned_plan/mentioned_track and history fields remain compatible, with properties exposing the clearer profile names. Asked topics and interests contain only known knowledge IDs.

Passwords, payment information and secret-like messages are rejected by the privacy response. Guided profile input and detected email/mobile values are omitted from history and browser contact bubbles. Personalized assistant history substitutes the name with a visitor marker. API visitor summaries expose the name plus email/mobile presence flags, rather than returning the raw email and number.

Clear chat deletes the server session. If the server cannot be reached, the browser clears its copy and explains that the server session expires automatically. Clear my details removes the profile; cancelling contact collection clears email/mobile while retaining the introduction name.

## Contact and guided choices

No email or mobile is requested at opening. Explicit requests such as Request follow-up, Contact me, Call me, Request a call, Send me details, Talk to someone or Speak to team begin optional contact collection. With a known name the flow is **email → mobile**; otherwise it is **optional name → email → mobile**. Previously supplied fields are reused, and Skip/Cancel remain available. Simple lowercase names such as jai display as Jai; existing mixed capitalization is preserved.

Email receives format validation. Mobile accepts 7–15 digits, optional leading +, spaces, parentheses, dots and hyphens. It is not restricted to ten digits. Invalid values receive conversational prompts; every field can be skipped or cancelled.

A product question interrupts collection without losing the profile already shared. The visitor can return to Talk to the team later. A completed flow truthfully confirms that details are held only in the conversation: **nothing is sent and no callback/demo is booked**. The Contact route remains the way to find the team's published channels.

Guided flows:
- Find my next step → career, learning, projects, opportunities or exploring.
- Choose a career → web/apps, data, AI interest, design or still unsure.
- Web/app interest → Frontend, Backend or UI/UX.
- Pricing help → Free, full journey, career support or an institution.
- Help choosing → Guide me here or Talk to the team.
- Contact → chat guidance, team contact or optional follow-up details.

## API

- GET `/api/health`: service, knowledge version, storage and LLM status.
- POST `/api/chat/session`: create/resume a session using optional session_id.
- POST `/api/chat`: one endpoint for typed messages and quick replies.
- DELETE `/api/chat/session/{session_id}`: remove temporary session data.

`ChatResponse` includes session_id, message, title, bullets, highlight, intent, topic, quick_replies, actions, requires_input, visitor, confidence and session_reset. requires_input retains the existing typed object shape: field (“name”, “email” or “mobile”), optional and prompt. All navigation actions are validated against actual public routes.

The existing request limits (2,000-character messages, 16 KiB bodies), exact CORS origins, no-store responses, safe validation errors and server-issued session IDs remain in place.

## Enhancement file review

These are the files changed by this enhancement, in addition to the prior uncommitted implementation:

| File (relative to repository root) | Why it changed |
| --- | --- |
| app/components/chatbot/ChatbotButton.tsx | Start/resume on opening and keep new answers readable as supporting content appears. |
| app/components/chatbot/usePublicChat.ts | Optional opening, session resume/retry, current input mode, private contact display and progressive response state. |
| app/components/chatbot/chatbotApi.ts | Typed visitor/confidence validation and the create/resume API call. |
| app/components/chatbot/ChatMessage.tsx | Render answer, supporting content and choices progressively. |
| app/styles/chatbot.css | Chatbot-only content transitions, line breaks and safe reply wrapping. |
| backend/app/models.py | Profile/context memory, visits, interests, response state and typed intent detail support. |
| backend/app/schemas.py | SessionRequest, VisitorSummary and confidence fields. |
| backend/app/api/routes.py | Add the create/resume session endpoint. |
| backend/app/utils/text.py | Reusable normalization, contractions, abbreviation and typo aliases. |
| backend/app/utils/matching.py (new) | Reusable conservative phrase/token/fuzzy scoring. |
| backend/app/utils/validation.py | Friendly validation prompts and explicit name-prefix handling. |
| backend/app/services/retrieval_service.py | Integrate the matcher and bounded context boosts. |
| backend/app/services/intent_service.py | Follow-up resolution, comparisons, guided choices and contact opt-in. |
| backend/app/services/quick_reply_service.py (new) | Full opening choices, contextual next steps and repeat-aware ordering. |
| backend/app/services/response_service.py | Short/deeper answers, track-specific project context and occasional name use. |
| backend/app/services/visitor_service.py | Separate optional name introduction from later email/mobile collection. |
| backend/app/services/memory_service.py | Retain prior topics/plans, interests, asked topics, replies and resumable responses. |
| backend/app/services/chatbot_service.py | Coordinate profile controls, direct-question interruption, privacy and resume. |
| backend/app/knowledge/mentorme_knowledge.json | 75 grounded topics, including the approved course-completion and career-support update. |
| backend/app/knowledge/README.md | Document source authority and safe handling of uncertain public details. |
| backend/tests/test_chat.py | Update existing assertions for the requested opening/contact/copy changes. |
| backend/tests/test_conversation_enhancements.py (new) | Reported typos, negative routing, profile, personalization, memory and guided-flow regressions. |
| backend/tests/chatbot_browser.cjs (new) | Repeatable browser checks for the requested themes, sizes and interactions. |
| backend/.gitignore | Ignore local browser test screenshots and reports. |
| backend/README.md | Current run commands, behavior, architecture and this review record. |

Unrelated public pages, navigation, auth pages, imagery, global styles, global animations and theme implementation were inspected only.

## Validation commands

Backend regression suite:

```powershell
cd C:\Users\Jai\MentorMe\backend
.\.venv\Scripts\python.exe -X utf8 -m pytest -q -p no:cacheprovider
```

Frontend checks and a PowerShell-compatible production build:

```powershell
cd C:\Users\Jai\MentorMe
.\node_modules\.bin\eslint.cmd app/components/chatbot
.\node_modules\.bin\tsc.cmd --noEmit --incremental false
$env:WRANGLER_LOG_PATH = '.wrangler/wrangler.log'
.\node_modules\.bin\vinext.cmd build
```

Browser checks use the bundled Playwright runtime and local Microsoft Edge, with the frontend and API running:

```powershell
cd C:\Users\Jai\MentorMe
$env:NODE_PATH = 'C:\Users\Jai\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules'
node backend/tests/chatbot_browser.cjs
```

On another machine, provide an existing Playwright installation and browser channel. The test writes ignored screenshots/report under backend/tests/.browser-artifacts and deletes its synthetic chat sessions.

Current product-update validation: all 312 backend tests pass, including 131 new cases (two upstream deprecation warnings); chatbot ESLint and production build pass. The browser regression script includes all nine starting choices, lowercase-name display and the Certificates → Milestone certificates → Course completion certificate → Internship eligibility → Course completion flow, alongside the existing interaction checks. Whole-repository TypeScript still reports the three pre-existing Cloudflare declarations (cloudflare:workers, Fetcher and D1Database) in db/index.ts and worker/index.ts. Existing unrelated auth/pricing CSS :global warnings remain. No dependency changes were made to suppress those issues.

## Small product update — 2026-09-03

The [approved facts](app/knowledge/product_updates.md) add a distinct Course Completion Certificate, startup internship eligibility, staged mentor sessions and later live interview preparation. Nine Pro milestone certificates remain. No external accreditation, exact support-unlock level or employment outcome is invented.

Six new knowledge IDs: course_completion_certificate, course_completion, mentor_sessions, interview_preparation, career_readiness and journey_unlocks. Existing certificates, certificate_milestones and internships are enriched; all earlier topics remain available. Account actions reuse /signup and /login.

Files changed for this small update only:

- app/knowledge/mentorme_knowledge.json, app/knowledge/product_updates.md, app/knowledge/README.md: approved facts, aliases, contextual choices and provenance.
- app/services/intent_service.py: contact equivalents, contextual unlock follow-ups and personal-journey routing.
- app/services/quick_reply_service.py: ninth starting choice, Certificates.
- app/services/visitor_service.py: reuse known names; optional name-first contact flow otherwise.
- app/utils/validation.py: conservative lowercase-name formatting; existing email/mobile format validation retained.
- tests/test_product_knowledge_update.py: 131 new regressions for facts, flows, account boundaries, contact triggers and validation.
- tests/test_chat.py, tests/test_conversation_enhancements.py: preserve existing tests and update the two expectations affected by the new name-first flow and additional level choices.
- tests/chatbot_browser.cjs: ninth option and certificate click-flow coverage.
- README.md: current scope and validation notes.

No frontend source, CSS, animation, page, route, dependency or configuration changed in this update. Earlier uncommitted frontend/chatbot work is preserved.

Browser validation for this update passed all four light/dark desktop/mobile combinations, including all nine initial options and the certificate click flow, plus the existing short-mobile input/scroll checks.
