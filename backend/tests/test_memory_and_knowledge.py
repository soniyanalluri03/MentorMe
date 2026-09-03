from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from uuid import uuid4

from app.core.config import Settings
from app.repositories.session_repository import InMemorySessionRepository
from app.schemas import ChatRequest
from app.services.chatbot_service import ChatbotService


def test_expiry_capacity_and_unknown_ids():
    now = [0.0]
    repository = InMemorySessionRepository(60, 2, clock=lambda: now[0])
    supplied = uuid4()
    with repository.transaction(supplied) as first:
        first_id = first.id
        assert first.id != supplied
    with repository.transaction(None) as second:
        second_id = second.id
    with repository.transaction(None):
        pass
    assert len(repository._sessions) == 2
    assert first_id not in repository._sessions
    now[0] = 61
    repository.purge_expired()
    assert len(repository._sessions) == 0
    with repository.transaction(second_id) as fresh:
        assert fresh.id != second_id


def test_bounded_history_and_concurrent_session_updates():
    repository = InMemorySessionRepository(1800, 50)
    service = ChatbotService(repository, 8)
    sid = service.chat(ChatRequest(message="Pro")).session_id
    with ThreadPoolExecutor(max_workers=4) as pool:
        responses = list(pool.map(lambda _: service.chat(ChatRequest(message="what do I get", session_id=sid)), range(10)))
    assert all(response.topic == "pro_plan" for response in responses)
    with repository.transaction(sid) as session:
        assert len(session.history) == 8
        assert session.mentioned_plan == "pro_plan"


def test_knowledge_sources_and_suggested_replies():
    service = ChatbotService(InMemorySessionRepository(1800, 500), 24)
    repo_root = Path(__file__).resolve().parents[2]
    for entry in service.retrieval.knowledge.entries:
        assert entry.sources
        for source in entry.sources:
            assert (repo_root / source).is_file(), source
        for reply in entry.related_topics:
            response = service.chat(ChatRequest(message=reply))
            assert response.topic != "unknown", (entry.id, reply)


def test_cors_settings_reject_wildcards():
    import pytest
    from pydantic import ValidationError

    for value in ("*", "https://*.example.com", "https://example.com/path", "https://user:pass@example.com"):
        with pytest.raises(ValidationError):
            Settings(cors_origins=[value])
