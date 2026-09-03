from typing import Protocol

from app.models import KnowledgeEntry
from app.schemas import ChatResponse


class LLMProvider(Protocol):
    """Future optional wording adapter; receive approved facts, never raw lead/history data.

    An implementation must preserve facts and routes and validate its result before
    adoption. The current deterministic engine deliberately does not invoke this
    boundary; no provider credentials or paid API are needed.
    """

    def generate(self, facts: KnowledgeEntry, response: ChatResponse) -> str: ...
