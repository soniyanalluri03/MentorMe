from collections import OrderedDict
from contextlib import contextmanager
from threading import RLock
from time import monotonic
from typing import Callable, ContextManager, Iterator, Protocol
from uuid import UUID

from app.models import Session


class SessionRepository(Protocol):
    def transaction(self, session_id: UUID | None) -> ContextManager[Session]: ...
    def delete(self, session_id: UUID) -> None: ...
    def purge_expired(self) -> None: ...
    def clear(self) -> None: ...


class InMemorySessionRepository:
    """Atomic, bounded, expiring sessions for a single development worker.

    A replacement repository must preserve transaction atomicity per session.
    Unknown client IDs are never adopted: only server-generated IDs are used.
    """

    def __init__(self, ttl_seconds: int, max_sessions: int, clock: Callable[[], float] = monotonic):
        self.ttl_seconds = ttl_seconds
        self.max_sessions = max_sessions
        self.clock = clock
        self._sessions: OrderedDict[UUID, Session] = OrderedDict()
        self._lock = RLock()

    def purge_expired(self) -> None:
        with self._lock:
            now = self.clock()
            expired = [key for key, value in self._sessions.items() if now - value.updated_at >= self.ttl_seconds]
            for key in expired:
                del self._sessions[key]

    @contextmanager
    def transaction(self, session_id: UUID | None) -> Iterator[Session]:
        with self._lock:
            self.purge_expired()
            session = self._sessions.get(session_id)
            if session is None:
                while len(self._sessions) >= self.max_sessions:
                    self._sessions.popitem(last=False)
                session = Session(updated_at=self.clock())
                self._sessions[session.id] = session
            yield session
            session.updated_at = self.clock()
            self._sessions.move_to_end(session.id)

    def delete(self, session_id: UUID) -> None:
        with self._lock:
            self._sessions.pop(session_id, None)

    def clear(self) -> None:
        with self._lock:
            self._sessions.clear()
