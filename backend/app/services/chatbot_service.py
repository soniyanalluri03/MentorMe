from app.models import Session
from app.repositories.session_repository import SessionRepository
from app.schemas import ChatRequest, ChatResponse, SessionRequest, VisitorSummary
from app.services.intent_service import IntentService
from app.services.memory_service import MemoryService
from app.services.response_service import ResponseService
from app.services.retrieval_service import RetrievalService
from app.services.visitor_service import CANCELS, SKIPS, VisitorService
from app.utils.text import normalize
from app.utils.validation import contains_personal_data, contains_secret


class ChatbotService:
    def __init__(self, sessions: SessionRepository, history_limit: int):
        self.sessions = sessions
        self.retrieval = RetrievalService()
        self.intents = IntentService()
        self.responses = ResponseService(self.retrieval)
        self.memory = MemoryService(history_limit)
        self.visitors = VisitorService()

    @staticmethod
    def profile(session: Session) -> VisitorSummary:
        return VisitorSummary(name=session.visitor.name, email_provided=bool(session.visitor.email),
                              mobile_provided=bool(session.visitor.mobile))

    def start_session(self, request: SessionRequest) -> ChatResponse:
        with self.sessions.transaction(request.session_id) as session:
            if not session.introduction_complete:
                response = self.visitors.introduce(session)
            elif session.last_response:
                response = session.last_response.model_copy(deep=True)
            else:
                response = self.visitors.welcome(session)
            response.visitor = self.profile(session)
            response.session_reset = request.session_id is not None and request.session_id != session.id
            return response

    def chat(self, request: ChatRequest) -> ChatResponse:
        with self.sessions.transaction(request.session_id) as session:
            was_private = session.visitor_step is not None
            text = normalize(request.message)
            matches = self.retrieval.search(request.message, session, request.context.current_path)
            intent = self.intents.resolve(request.message, session, matches)
            if contains_secret(request.message):
                response = ChatResponse(session_id=session.id, intent="privacy", topic="privacy",
                                        message="Please keep passwords, payment details and verification codes out of chat. I can help with public MentorMe information.",
                                        quick_replies=["Sign In", "Contact team"])
            elif text in {"clear my details", "delete my details", "forget my details"}:
                response = self.visitors.cancel(session, all_details=True)
            elif session.visitor_step and text in SKIPS | CANCELS:
                response = self.visitors.consume(session, request.message)
            elif text in {"do not contact me", "do not call me", "do not email me"}:
                response = self.visitors.cancel(session)
            elif intent.entry_id == "callback" and not session.visitor_step:
                response = self.visitors.start(session)
            elif session.visitor_step == "name":
                if intent.entry_id == "callback":
                    response = self.visitors.start(session)
                elif intent.entry_id == "greeting":
                    response = self.visitors.introduce(session)
                elif intent.entry_id != "unknown" or not self.visitors.looks_like_name(request.message):
                    self.visitors.interrupt(session)
                    response = self.responses.compose(intent, session)
                else:
                    response = self.visitors.consume(session, request.message)
            elif session.visitor_step:
                question = text.startswith(("what ", "how ", "why ", "where ", "do you ", "can i "))
                if (intent.entry_id not in {"unknown", "callback", "greeting", "thanks", "bye", "okay"} or question) and not contains_personal_data(request.message):
                    self.visitors.interrupt(session)
                    response = self.responses.compose(intent, session)
                else:
                    response = self.visitors.consume(session, request.message)
            elif text in {"cancel", "skip", "skip for now"}:
                response = self.visitors.cancel(session)
            elif contains_personal_data(request.message):
                response = ChatResponse(session_id=session.id, intent="privacy", topic="privacy",
                                        message="You don't need to share personal details to explore MentorMe. If you'd like, we can prepare optional contact details for this session.",
                                        quick_replies=["Request a callback", "Career tracks", "Pricing"])
            elif intent.entry_id == "greeting" and not session.introduction_complete:
                response = self.visitors.introduce(session)
            else:
                session.introduction_complete = True
                response = self.responses.compose(intent, session)
            response.session_reset = request.session_id is not None and request.session_id != session.id
            response.visitor = self.profile(session)
            self.memory.remember(session, request.message, response, was_private)
            return response

