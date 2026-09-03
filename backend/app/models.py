from dataclasses import dataclass, field
from typing import Literal
from uuid import UUID, uuid4

from pydantic import Field

from app.schemas import Action, ChatResponse, PublicRoute, StrictModel, VisitorField


class KnowledgeEntry(StrictModel):
    id: str
    category: str
    title: str
    keywords: list[str]
    questions: list[str]
    short_answer: str
    detailed_answer: str
    bullet_points: list[str]
    related_topics: list[str]
    cta_actions: list[Action]
    route: PublicRoute | None
    priority: int
    sources: list[str]
    highlight: str | None = None
    detail_bullets: list[str] = Field(default_factory=list)


class KnowledgeBase(StrictModel):
    version: str
    entries: list[KnowledgeEntry]


class Visitor(StrictModel):
    name: str | None = Field(default=None, max_length=80)
    email: str | None = Field(default=None, max_length=254)
    mobile: str | None = Field(default=None, max_length=32)


@dataclass
class Turn:
    role: Literal["user", "assistant"]
    message: str


@dataclass
class Session:
    id: UUID = field(default_factory=uuid4)
    history: list[Turn] = field(default_factory=list)
    current_intent: str | None = None
    current_topic: str | None = None
    previous_topic: str | None = None
    mentioned_plan: str | None = None
    mentioned_track: str | None = None
    previous_plan: str | None = None
    interests: list[str] = field(default_factory=list)
    asked_topics: list[str] = field(default_factory=list)
    topic_visits: dict[str, int] = field(default_factory=dict)
    visitor: Visitor = field(default_factory=Visitor)
    visitor_step: VisitorField | None = None
    introduction_complete: bool = False
    lead_collection_state: Literal["idle", "collecting", "complete"] = "idle"
    previous_actions: list[str] = field(default_factory=list)
    previous_quick_replies: list[str] = field(default_factory=list)
    turn_count: int = 0
    last_personalized_turn: int = -10
    last_response: ChatResponse | None = None
    updated_at: float = 0

    # Keep the existing internal fields compatible with repository adapters.
    @property
    def visitor_name(self) -> str | None:
        return self.visitor.name

    @property
    def visitor_email(self) -> str | None:
        return self.visitor.email

    @property
    def visitor_mobile(self) -> str | None:
        return self.visitor.mobile

    @property
    def current_plan(self) -> str | None:
        return self.mentioned_plan

    @property
    def current_career_track(self) -> str | None:
        return self.mentioned_track

    @property
    def conversation_history(self) -> list[Turn]:
        return self.history


@dataclass(frozen=True)
class Match:
    entry: KnowledgeEntry
    score: float


@dataclass(frozen=True)
class Intent:
    name: str
    entry_id: str
    explicit_navigation: bool = False
    confidence: float = 1
    detailed: bool = False
    focus: str | None = None
