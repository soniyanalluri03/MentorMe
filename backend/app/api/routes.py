from uuid import UUID

from fastapi import APIRouter, Request, Response, status

from app.schemas import ChatRequest, ChatResponse, HealthResponse, SessionRequest
from app.services.chatbot_service import ChatbotService

router = APIRouter(prefix="/api")


def service(request: Request) -> ChatbotService:
    return request.app.state.chatbot


@router.get("/health", response_model=HealthResponse)
def health(request: Request) -> HealthResponse:
    return HealthResponse(knowledge_version=service(request).retrieval.knowledge.version)


@router.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest, request: Request) -> ChatResponse:
    return service(request).chat(payload)


@router.post("/chat/session", response_model=ChatResponse)
def start_session(payload: SessionRequest, request: Request) -> ChatResponse:
    return service(request).start_session(payload)


@router.delete("/chat/session/{session_id}", status_code=status.HTTP_204_NO_CONTENT)
def clear_session(session_id: UUID, request: Request) -> Response:
    service(request).sessions.delete(session_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

