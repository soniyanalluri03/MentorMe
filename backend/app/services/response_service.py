from app.models import Intent, Session
from app.schemas import ChatResponse
from app.services.retrieval_service import RetrievalService
from app.services.quick_reply_service import QuickReplyService


class ResponseService:
    def __init__(self, retrieval: RetrievalService):
        self.retrieval = retrieval
        self.quick_replies = QuickReplyService(retrieval.entries)

    def compose(self, intent: Intent, session: Session) -> ChatResponse:
        entry = self.retrieval.entries[intent.entry_id]
        actions = entry.cta_actions[:2]
        if not intent.explicit_navigation and actions and [action.route for action in actions] == session.previous_actions:
            actions = []
        message = entry.short_answer
        visits = session.topic_visits.get(entry.id, 0)
        detailed = intent.detailed or visits % 2 == 1
        bullets = entry.bullet_points[:4]
        if detailed:
            message = entry.detailed_answer
            bullets = (entry.detail_bullets or entry.bullet_points)[:4]
        if intent.focus == "price" and entry.id == "pro_plan":
            message = "Pro starts from ₹2,000 per course with six months access. The price varies by career track." if visits == 0 else "For Pro, pricing starts at ₹2,000 per course and includes six months of access. Your career track determines the final price."
        elif intent.focus == "price" and entry.id in {"free_plan", "career_accelerator", "enterprise"}:
            message = entry.short_answer
        if entry.id == "roadmap" and session.mentioned_track:
            track = self.retrieval.entries[session.mentioned_track]
            message = f"For your interest in {track.title}, the 90-level roadmap shows how you move from direction to skills, projects and career readiness. You can explore the next milestones at your own pace."
        if entry.id == "projects" and session.mentioned_track:
            track = self.retrieval.entries[session.mentioned_track]
            examples = {"frontend": "The Frontend preview shows a responsive dashboard as an example of portfolio proof.",
                        "backend": "The Backend preview shows a production API milestone as an example.",
                        "design": "The UI/UX preview shows a product case study as an example."}
            message = f"For {track.title}, exact track project assignments are not published yet. {examples.get(track.id, 'The full journey connects practical projects with portfolio proof.')}"
        if session.visitor.name and session.turn_count - session.last_personalized_turn >= 4:
            if entry.id == "thanks":
                message = f"You're welcome, {session.visitor.name}! Want to explore anything else?"
            else:
                proper_start = message.startswith(("MentorMe", "Pro", "Free", "Frontend", "Backend", "Career", "Enterprise", "UI/UX", "I ", "I'm", "I’m"))
                addressed = message if proper_start else message[0].lower() + message[1:]
                message = f"{session.visitor.name}, {addressed}"
            session.last_personalized_turn = session.turn_count
        return ChatResponse(
            session_id=session.id, intent=intent.name, topic=entry.id,
            title=entry.title, message=message, bullets=bullets,
            highlight=entry.highlight, quick_replies=self.quick_replies.for_topic(entry.id, session), actions=actions,
            confidence=intent.confidence,
        )
