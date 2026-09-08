import re

from app.models import Session, Visitor
from app.schemas import Action, ChatResponse, RequiredInput
from app.services.quick_reply_service import INITIAL_REPLIES
from app.utils.text import normalize
from app.utils.validation import validate_email, validate_mobile, validate_name

PROMPTS = {
    "name": "Before we get started, what should I call you?",
    "email": "What's the best email address to reach you?",
    "mobile": "And what mobile number should the team use? A country code is welcome.",
}
SKIPS = {"skip", "skip for now", "skip this", "prefer not to say", "no thanks", "no", "rather not", "i do not want to share"}
CANCELS = {"cancel", "stop", "never mind", "nevermind"}


class VisitorService:
    """Optional introduction and contact profile; never submits or books anything."""

    def introduce(self, session: Session) -> ChatResponse:
        session.visitor_step = "name"
        return ChatResponse(
            session_id=session.id, intent="greeting", topic="greeting",
            message="Hi! I'm your MentorMe Assistant 👋\nBefore we get started, what should I call you?",
            quick_replies=["Skip for now"],
            requires_input=RequiredInput(field="name", prompt=PROMPTS["name"]),
        )

    def welcome(self, session: Session, named: bool = False) -> ChatResponse:
        session.introduction_complete = True
        session.visitor_step = None
        greeting = f"Nice to meet you, {session.visitor.name}!" if named else "Happy to help!"
        if named:
            session.last_personalized_turn = session.turn_count
        return ChatResponse(
            session_id=session.id, intent="introduction", topic="introduction", title=greeting,
            message="I can help you understand MentorMe, explore career tracks, see how the roadmap works, compare plans or help you figure out your next step.",
            quick_replies=INITIAL_REPLIES.copy(),
        )

    def prompt(self, session: Session, message: str | None = None) -> ChatResponse:
        field = session.visitor_step
        assert field is not None
        return ChatResponse(
            session_id=session.id, intent="visitor_input", topic="visitor",
            message=message or PROMPTS[field],
            highlight="Optional: kept only in this conversation. Nothing is sent to the team yet. Skip or cancel anytime.",
            quick_replies=["Skip", "Cancel"],
            requires_input=RequiredInput(field=field, prompt=PROMPTS[field]),
        )

    def start(self, session: Session) -> ChatResponse:
        session.introduction_complete = True
        session.lead_collection_state = "collecting"
        if not session.visitor.name:
            session.visitor_step = "name"
            return self.prompt(session, "Sure. What should I call you? You can skip this.")
        return self.contact_details(session)

    def contact_details(self, session: Session) -> ChatResponse:
        if not session.visitor.email:
            session.visitor_step = "email"
        elif not session.visitor.mobile:
            session.visitor_step = "mobile"
        else:
            return self.complete(session)
        greeting = f"Sure, {session.visitor.name}. " if session.visitor.name else "Sure. "
        if session.visitor.name:
            session.last_personalized_turn = session.turn_count
        return self.prompt(session, greeting + PROMPTS[session.visitor_step])

    def interrupt(self, session: Session) -> None:
        session.introduction_complete = True
        session.visitor_step = None
        session.lead_collection_state = "idle"

    def cancel(self, session: Session, *, all_details: bool = False) -> ChatResponse:
        session.visitor = Visitor(name=None if all_details else session.visitor.name)
        self.interrupt(session)
        return ChatResponse(
            session_id=session.id, intent="visitor_cancelled", topic="visitor",
            message="I've cleared your details from this conversation." if all_details else "No problem. I've cleared the email and mobile details. We can keep chatting here.",
            quick_replies=INITIAL_REPLIES.copy(),
        )

    @staticmethod
    def looks_like_name(value: str) -> bool:
        text = normalize(value)
        explicit = bool(re.match(r"^(my name is|call me|i am) ", text))
        question = any(word in text.split() for word in ("what", "why", "how", "where", "when", "can", "could", "want", "need", "know", "tell", "please", "is", "are", "do", "does", "not"))
        return explicit or (not question and "?" not in value and len(text.split()) <= 3)

    def consume(self, session: Session, value: str) -> ChatResponse:
        step = session.visitor_step
        assert step is not None
        text = normalize(value)
        if step == "name":
            collecting = session.lead_collection_state == "collecting"
            if collecting and (text in CANCELS or text == "no thanks"):
                return self.cancel(session)
            if text in SKIPS | CANCELS:
                return self.contact_details(session) if collecting else self.welcome(session)
            try:
                session.visitor.name = validate_name(value)
            except ValueError as error:
                if collecting:
                    return self.prompt(session, str(error))
                response = self.introduce(session)
                response.message = str(error)
                return response
            return self.contact_details(session) if collecting else self.welcome(session, named=True)
        if text in CANCELS or text == "no thanks":
            return self.cancel(session)
        if text not in SKIPS:
            try:
                validated = validate_email(value) if step == "email" else validate_mobile(value)
            except ValueError as error:
                return self.prompt(session, str(error))
            setattr(session.visitor, step, validated)
        if step == "email" and not session.visitor.mobile:
            session.visitor_step = "mobile"
            return self.prompt(session, "Thanks. " + PROMPTS["mobile"] if text not in SKIPS else PROMPTS["mobile"])
        return self.complete(session)

    def complete(self, session: Session) -> ChatResponse:
        session.visitor_step = None
        session.lead_collection_state = "complete"
        name = f", {session.visitor.name}" if session.visitor.name else ""
        any_details = bool(session.visitor.email or session.visitor.mobile)
        message = f"Got it{name}. I have the contact details you shared for this conversation." if any_details else "That's okay. You can keep exploring without sharing contact details."
        if session.visitor.name:
            session.last_personalized_turn = session.turn_count
        return ChatResponse(
            session_id=session.id, intent="visitor_complete", topic="visitor", message=message,
            highlight="Nothing has been sent and no callback or demo is booked. You can reach the team through the Contact page.",
            quick_replies=["Guide me here", "Pricing", "Career tracks", "Clear my details"],
            actions=[Action(label="Contact Team", route="/contact")],
        )

