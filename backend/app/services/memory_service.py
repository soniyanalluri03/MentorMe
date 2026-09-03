import re

from app.models import Session, Turn
from app.schemas import ChatResponse
from app.services.intent_service import PLAN_TOPICS, TRACK_TOPICS
from app.utils.validation import contains_personal_data, contains_secret

SOCIAL_TOPICS = {"greeting", "introduction", "thanks", "bye", "okay", "wellbeing", "unknown", "visitor", "privacy"}


class MemoryService:
    def __init__(self, history_limit: int):
        self.history_limit = history_limit

    def remember(self, session: Session, message: str, response: ChatResponse, private_input: bool = False) -> None:
        private = private_input or contains_personal_data(message) or contains_secret(message)
        assistant_text = response.message
        if session.visitor.name:
            assistant_text = re.sub(re.escape(session.visitor.name), "[visitor]", assistant_text, flags=re.I)
        session.history.extend([
            Turn("user", "[private input omitted]" if private else message),
            Turn("assistant", assistant_text),
        ])
        session.history[:] = session.history[-self.history_limit:]
        if response.topic not in SOCIAL_TOPICS:
            if session.current_topic != response.topic:
                session.previous_topic = session.current_topic
            session.current_intent = response.intent
            session.current_topic = response.topic
            if response.topic not in session.asked_topics:
                session.asked_topics.append(response.topic)
            session.topic_visits[response.topic] = session.topic_visits.get(response.topic, 0) + 1
        if response.topic in PLAN_TOPICS:
            plan = "free_plan" if response.topic == "free_levels" else response.topic
            if session.mentioned_plan != plan:
                session.previous_plan = session.mentioned_plan
            session.mentioned_plan = plan
        if response.topic in TRACK_TOPICS:
            session.mentioned_track = response.topic
            if response.topic not in session.interests:
                session.interests.append(response.topic)
        session.previous_actions = [action.route for action in response.actions]
        session.previous_quick_replies = response.quick_replies.copy()
        session.turn_count += 1
        session.last_response = response.model_copy(deep=True)

