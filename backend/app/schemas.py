from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator

PublicRoute = Literal[
    "/", "/courses", "/roadmap", "/leaderboard", "/pricing", "/about", "/contact",
    "/login", "/signup", "/signup?plan=pro",
]
VisitorField = Literal["name", "email", "mobile"]


class StrictModel(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)


class ChatContext(StrictModel):
    current_path: str = Field(default="/", max_length=200, pattern=r"^/[^?#\\]*$")

    @field_validator("current_path")
    @classmethod
    def relative_path(cls, value: str) -> str:
        if value.startswith("//"):
            raise ValueError("Use a relative public path")
        return value


class ChatRequest(StrictModel):
    session_id: UUID | None = None
    message: str = Field(min_length=1, max_length=2000)
    context: ChatContext = Field(default_factory=ChatContext)

    @field_validator("message")
    @classmethod
    def meaningful_message(cls, value: str) -> str:
        if not any(not character.isspace() and character.isprintable() for character in value):
            raise ValueError("Enter a message")
        if any(ord(character) < 32 and character not in "\n\r\t" for character in value):
            raise ValueError("Unsupported control character")
        return value


class SessionRequest(StrictModel):
    session_id: UUID | None = None


class Action(StrictModel):
    label: str = Field(min_length=1, max_length=80)
    route: PublicRoute
    type: Literal["navigate"] = "navigate"


class RequiredInput(StrictModel):
    field: VisitorField
    optional: bool = True
    prompt: str


class VisitorSummary(StrictModel):
    name: str | None = None
    email_provided: bool = False
    mobile_provided: bool = False


class ChatResponse(StrictModel):
    session_id: UUID
    message: str
    intent: str
    topic: str
    title: str | None = None
    bullets: list[str] = Field(default_factory=list)
    highlight: str | None = None
    quick_replies: list[str] = Field(default_factory=list)
    actions: list[Action] = Field(default_factory=list)
    requires_input: RequiredInput | None = None
    session_reset: bool = False
    visitor: VisitorSummary = Field(default_factory=VisitorSummary)
    confidence: float = Field(default=1, ge=0, le=1)


class HealthResponse(StrictModel):
    status: Literal["ok"] = "ok"
    service: str = "mentorme-public-assistant"
    knowledge_version: str
    llm_enabled: bool = False
    storage: Literal["in-memory"] = "in-memory"
