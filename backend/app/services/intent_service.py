import re

from app.models import Intent, Match, Session
from app.utils.text import contains_phrase, normalize, tokens

PLAN_TOPICS = {"free_plan", "free_levels", "pro_plan", "career_accelerator", "enterprise"}
TRACK_TOPICS = {"frontend", "backend", "design", "data", "ai"}
FOLLOW_UPS = {"how much is it", "how much", "what does it cost", "how much does it cost", "what do i get", "what is included", "what do i get with it", "tell me more", "tell me more about it", "more details", "details", "explain fully", "and then", "is it available", "what about it", "what will i learn", "what will i learn here", "what is included in it"}
PRICE_FOLLOW_UPS = {"cost", "price", "how much", "how much is it", "what does it cost", "how much does it cost"}
DETAIL_PHRASES = ("tell me more", "explain fully", "details", "in detail", "what do i get", "what is included")


class IntentService:
    def resolve(self, message: str, session: Session, matches: list[Match]) -> Intent:
        text = normalize(message)
        navigation = bool(re.search(r"\b(open|show|take me|go to|navigate|view)\b", text))
        detailed = any(contains_phrase(text, phrase) for phrase in DETAIL_PHRASES)
        def result(topic: str, confidence: float = 1) -> Intent:
            focus = "price" if any(contains_phrase(text, word) for word in ("price", "cost", "how much")) else None
            return Intent("navigation" if navigation else topic, topic, navigation, confidence, detailed, focus)
        # These policies are not published. A plan name must not hide the unknown request.
        unsupported = ("refund", "refunds", "discount", "coupon", "scholarship", "gst", "tax", "salary", "accreditation number", "launch date", "release date")
        if any(contains_phrase(text, word) for word in unsupported):
            return result("unknown", 0)
        # Explicit opt-in requests start contact collection; questions about contact
        # channels or a plan remain informational until the visitor chooses it.
        if text in {"talk to the team", "talk to team", "talk to mentorme", "ask the team", "request follow up", "request followup", "request demo", "request a demo", "book a demo", "arrange a demo", "contact me", "call me", "team call me", "i want someone to contact me", "request a call", "send me details", "can the team contact me", "i need more information from team", "talk to someone", "speak to team"}:
            return result("callback")
        if text in {"can someone help me choose", "can someone help me choose a plan", "personalized guidance", "i want personalized guidance", "i need more assistance", "more assistance from the team"}:
            return result("assistance")
        if text in {"guide me here", "chat with me"}:
            return result("pricing_help" if session.current_plan or session.current_topic == "assistance" else "discovery")
        if text in {"what will i learn", "what will i learn here"} and session.mentioned_track:
            return result(session.mentioned_track)
        if contains_phrase(text, "free") and any(contains_phrase(text, word) for word in ("levels", "level", "access details")):
            return result("free_levels")
        # Resolve cross-topic entitlement questions using the named plan's full card.
        named_plans = {"pro": "pro_plan", "free": "free_plan", "enterprise": "enterprise", "career accelerator": "career_accelerator"}
        mentioned = [topic for phrase, topic in named_plans.items() if contains_phrase(text, phrase)]
        comparing = any(contains_phrase(text, word) for word in ("compare", "vs", "versus", "difference", "better"))
        if comparing:
            if "career_accelerator" in mentioned and "pro_plan" in mentioned:
                return result("pro_vs_accelerator")
            if "free_plan" in mentioned and "pro_plan" in mentioned:
                return result("free_vs_pro")
            if text in {"compare plans", "compare all plans", "plan comparison"}:
                return result("compare_plans")
        if text in {"choose pro", "start pro", "join pro"}:
            return result("signup_pro")
        if text in {"is there a free option", "is there a free plan", "any free option", "do you have a free option"}:
            return result("free_plan")
        if "pro_plan" in mentioned and contains_phrase(text, "free") and not comparing:
            return result("pro_plan")
        if contains_phrase(text, "upgrade") or contains_phrase(text, "change plans"):
            return result("upgrade")
        if mentioned and any(contains_phrase(text, word) for word in ("cost", "price", "how much", "per month", "free", "include", "included", "offer", "get", "certificates", "projects", "sessions")):
            # Require retrieval evidence as well: a plan name cannot legitimize
            # unrelated wording (e.g. "Pro price of bitcoin").
            entitlement_words = {"free", "plan", "pro", "enterprise", "career", "accelerator", "cost", "price", "per", "month", "offer", "include", "included", "certificates", "certificate", "projects", "project", "sessions", "mentor", "live", "guide", "levels", "missions", "assessments"}
            if tokens(text) <= entitlement_words or (matches and any(m.entry.id == mentioned[0] for m in matches)):
                return result(mentioned[0], matches[0].score if matches else .95)
        if any(contains_phrase(text, word) for word in ("price", "cost", "how much")) and any(contains_phrase(text, word) for word in ("frontend", "backend", "track", "course")):
            if tokens(text) <= {"price", "cost", "frontend", "backend", "track", "course", "per", "month", "pro", "plan"}:
                return result("pro_plan")
        unlock_topics = {"certificate_milestones", "mentor_sessions", "interview_preparation"}
        if text in {"how are they unlocked", "when do they unlock", "how do they unlock", "when does it unlock"} and session.current_topic in unlock_topics:
            return result(session.current_topic)
        if text in {"what about my course", "what about my progress", "what about my unlocks"} and session.current_topic in unlock_topics | {"course_completion", "course_completion_certificate", "internships"}:
            return result("journey_unlocks")
        if any(contains_phrase(text, phrase) for phrase in ("exact unlock", "exact level", "which level", "what level", "my unlock", "my milestone status", "my certificate status", "have i unlocked", "have i earned")) and any(contains_phrase(text, term) for term in ("mentor", "sessions", "interview", "certificate", "milestone", "unlock", "unlocks")):
            return result("journey_unlocks")
        if text in FOLLOW_UPS and session.current_topic:
            if session.current_topic in PLAN_TOPICS:
                return result(session.current_topic)
            if text not in PRICE_FOLLOW_UPS:
                return result(session.current_topic)
        if text in PRICE_FOLLOW_UPS and session.current_topic in PLAN_TOPICS and session.mentioned_plan:
            return result(session.mentioned_plan)
        if text in {"is it free", "can i try it", "can i try first"}:
            if session.current_topic in PLAN_TOPICS and session.current_topic != "free_levels":
                return result(session.current_topic)
            return result("free_plan")
        if text in {"what is included", "what do i get", "what do i get with it"}:
            return result("pricing_help")
        if not matches or matches[0].score < .78:
            return result("unknown", 0)
        # Exact aliases are authoritative. Weak ties ask for clarification instead
        # of confidently selecting an unrelated intent.
        if len(matches) > 1 and matches[0].score < .9 and matches[0].score - matches[1].score < .015:
            return result("unknown", matches[0].score - .25)
        topic = matches[0].entry.id
        return result(topic, matches[0].score)
