import asyncio
from contextlib import asynccontextmanager, suppress

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.types import ASGIApp, Receive, Scope, Send

from app.api.routes import router
from app.core.config import Settings, load_settings
from app.repositories.session_repository import InMemorySessionRepository
from app.services.chatbot_service import ChatbotService


class BodyLimitMiddleware:
    def __init__(self, app: ASGIApp):
        self.app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] != "http" or scope["method"] != "POST":
            await self.app(scope, receive, send)
            return
        body = bytearray()
        while True:
            event = await receive()
            if event["type"] == "http.disconnect":
                return
            body.extend(event.get("body", b""))
            if len(body) > 16384:
                await JSONResponse(status_code=413, content={"detail": "Request too large"})(scope, receive, send)
                return
            if not event.get("more_body", False):
                break

        async def replay():
            return {"type": "http.request", "body": bytes(body), "more_body": False}

        await self.app(scope, replay, send)


def create_app(settings: Settings | None = None) -> FastAPI:
    settings = settings or load_settings()
    repository = InMemorySessionRepository(settings.session_ttl_seconds, settings.max_sessions)

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        async def cleanup():
            while True:
                await asyncio.sleep(settings.cleanup_interval_seconds)
                repository.purge_expired()

        task = asyncio.create_task(cleanup())
        try:
            yield
        finally:
            task.cancel()
            with suppress(asyncio.CancelledError):
                await task
            repository.clear()

    app = FastAPI(title="MentorMe Public Assistant", version="1.0.0", lifespan=lifespan)
    app.state.chatbot = ChatbotService(repository, settings.history_limit)
    app.add_middleware(BodyLimitMiddleware)
    app.add_middleware(CORSMiddleware, allow_origins=settings.cors_origins,
                       allow_credentials=False, allow_methods=["GET", "POST", "DELETE"],
                       allow_headers=["Content-Type"])

    @app.exception_handler(RequestValidationError)
    async def validation_error(request: Request, error: RequestValidationError):
        # FastAPI's default errors can echo rejected user input. Omit it entirely.
        return JSONResponse(status_code=422, content={"detail": [
            {"loc": item["loc"], "type": item["type"], "msg": "Invalid request value"}
            for item in error.errors()
        ]})

    @app.middleware("http")
    async def private_responses(request: Request, call_next):
        response = await call_next(request)
        response.headers["Cache-Control"] = "no-store"
        response.headers["X-Content-Type-Options"] = "nosniff"
        return response

    app.include_router(router)
    return app


app = create_app()
