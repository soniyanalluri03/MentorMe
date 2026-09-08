from app.models import KnowledgeEntry, Session
from app.utils.text import normalize

INITIAL_REPLIES = ["What is MentorMe?", "How it works", "Career tracks", "Explore roadmap",
                   "Find my next step", "Pricing", "Start free", "Talk to the team", "Certificates"]


class QuickReplyService:
    """Knowledge owns the choices; this layer adapts them to conversation memory."""

    def __init__(self, entries: dict[str, KnowledgeEntry]):
        self.entries = entries
        self.labels = {normalize(label): e.id for e in entries.values() for label in e.questions}

    def for_topic(self, topic: str, session: Session) -> list[str]:
        if topic in {"greeting", "introduction"}:
            return INITIAL_REPLIES.copy()
        if topic in {"okay", "thanks", "unknown", "wellbeing"}:
            previous = self.entries.get(session.current_topic or "")
            replies = list(previous.related_topics) if previous else INITIAL_REPLIES.copy()
            if topic == "thanks":
                replies = [*replies[:4], "I'm done"]
            elif topic == "unknown":
                replies = [*replies[:3], "Find my next step", "Talk to the team"]
        else:
            replies = list(self.entries[topic].related_topics)
        # Keep every choice available, but favor unexplored next steps on repeats.
        if session.topic_visits.get(topic, 0) and topic not in {"tracks", "pricing", "discovery", "choose_track"}:
            replies.sort(key=lambda label: self.labels.get(normalize(label)) in session.asked_topics)
        return list(dict.fromkeys(replies))
