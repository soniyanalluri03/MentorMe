from pathlib import Path

from app.models import KnowledgeBase, Match, Session
from app.utils.matching import PhraseIndex


class RetrievalService:
    def __init__(self, path: Path | None = None):
        path = path or Path(__file__).resolve().parents[1] / "knowledge" / "mentorme_knowledge.json"
        self.knowledge = KnowledgeBase.model_validate_json(path.read_text(encoding="utf-8"))
        self.entries = {entry.id: entry for entry in self.knowledge.entries}
        if len(self.entries) != len(self.knowledge.entries):
            raise ValueError("Knowledge IDs must be unique")
        self._index = {entry.id: PhraseIndex.build([*entry.questions, *entry.keywords])
                       for entry in self.knowledge.entries}

    def search(self, message: str, session: Session, current_path: str) -> list[Match]:
        matches = []
        for entry in self.knowledge.entries:
            if entry.id == "unknown":
                continue
            score = self._index[entry.id].score(message, exact_only=entry.category == "conversation")
            if score < .78:
                continue
            if score < 1:
                if entry.id == session.current_topic:
                    score += .025
                if entry.route == current_path:
                    score += .005
            matches.append(Match(entry, min(score, 1)))
        return sorted(matches, key=lambda match: (match.score, match.entry.priority), reverse=True)
