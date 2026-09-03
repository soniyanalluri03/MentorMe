"""Approved product facts and conversation regressions; existing tests remain."""
import re
from uuid import UUID

import pytest
from fastapi.testclient import TestClient

from app.core.config import Settings
from app.main import create_app


@pytest.fixture
def client():
    with TestClient(create_app(Settings())) as client:
        yield client


def ask(client, message, sid=None):
    result = client.post("/api/chat", json={"message": message, "session_id": sid})
    assert result.status_code == 200, result.text
    return result.json()


def start(client):
    result = client.post("/api/chat/session", json={})
    assert result.status_code == 200
    return result.json()["session_id"]


def text(response):
    return " ".join([response["message"], *response["bullets"], response["highlight"] or ""])


QUESTIONS = {
    "certificates": "certificates;certificate;do i get certificate;do i get a certificate;is there only one certificate;how many certificates can i earn",
    "certificate_milestones": "achievement certificate;milestone certificate;milestone certificates;do i get certificates before completing the course;when are certificates unlocked",
    "course_completion_certificate": "course completion certificate;final certificate;certificate after course;what certificate do i get after completing the course;when do i receive my course certificate",
    "course_completion": "what happens after course;what happens after 90 levels;after completing course;what next after course;course completion;after completing 90 levels;after 90 levels;after course completion;after i finish;what happens at end;after completion;after finishing mentor me;what do i get after completion;what comes after course completion;what happens after i finish the course",
    "internships": "internship;internships;startup internship;internship after course;do you provide internship;am i eligible for internship;will i get internship;internship after 90 levels;career opportunities after mentor me;do you connect students with startups;are internships available;will i get internship after the course",
    "mentor_sessions": "mentor;mentor session;mentor support;when mentor unlocks;can i talk to mentor;can i talk to a mentor;live mentor;mentor guidance;do i get mentor;are mentors available;will someone guide me;are mentor sessions part of the course;do mentors help during the journey;when do mentor sessions unlock",
    "interview_preparation": "interview preparation;live interview preparation;mock interview;interview support;interview;live interview;prepare for interview;career interview;when interview support unlocks;do you prepare students for interviews;is interview preparation available;when will interview preparation unlock",
    "career_readiness": "career readiness;career preparation;what career support do i get;what happens near the end of the course",
}


@pytest.mark.parametrize("topic,message", [(topic, q) for topic, qs in QUESTIONS.items() for q in qs.split(";")])
def test_approved_product_questions(client, topic, message):
    response = ask(client, message)
    assert response["topic"] == topic
    assert response["requires_input"] is None
    assert response["confidence"] >= .78


def test_initial_choices_preserved_and_certificates_reachable(client):
    sid = start(client)
    welcome = ask(client, "Skip for now", sid)
    assert welcome["quick_replies"] == [
        "What is MentorMe?", "How it works", "Career tracks", "Explore roadmap",
        "Find my next step", "Pricing", "Start free", "Talk to the team", "Certificates",
    ]
    certificates = ask(client, welcome["quick_replies"][-1], sid)
    assert certificates["topic"] == "certificates"
    assert "nine milestone certificates" in text(certificates)
    assert "Course Completion Certificate" in text(certificates)
    assert "during" in text(certificates)
    assert "successfully" in text(ask(client, "Course completion certificate", sid))


def test_certificate_flow_and_unlock_context(client):
    response = ask(client, "Certificates")
    sid = response["session_id"]
    for label, topic in [
        ("Milestone certificates", "certificate_milestones"),
        ("How are they unlocked?", "certificate_milestones"),
        ("Course completion certificate", "course_completion_certificate"),
        ("Internship eligibility", "internships"),
    ]:
        assert label in response["quick_replies"]
        response = ask(client, label, sid)
        assert response["topic"] == topic
        assert response["requires_input"] is None
    assert "does not guarantee" in response["highlight"]


def test_completion_then_internships_and_eligibility(client):
    sid = ask(client, "Pro")["session_id"]
    completion = ask(client, "What happens after 90 levels?", sid)
    assert completion["topic"] == "course_completion"
    answer = text(completion)
    for phrase in ["Course Completion Certificate", "eligible", "startup", "Practice", "Projects",
                   "Milestone achievements", "Portfolio", "Career preparation"]:
        assert phrase in answer
    assert "not guaranteed" in completion["highlight"]
    internship = ask(client, "tell me about internship", sid)
    assert internship["topic"] == "internships"
    details = ask(client, "How eligibility works", sid)
    assert details["topic"] == "internships"
    assert "requirements" in text(details) and "availability" in text(details).lower()
    with client.app.state.chatbot.sessions.transaction(UUID(sid)) as session:
        assert session.current_topic == "internships"
        assert session.previous_topic == "course_completion"


@pytest.mark.parametrize("topic,query", [("mentor_sessions", "Mentor sessions"), ("interview_preparation", "Interview preparation")])
def test_staged_support_and_contextual_followups(client, topic, query):
    first = ask(client, query)
    sid = first["session_id"]
    assert first["topic"] == topic
    assert "unlock" in text(first)
    assert "course and progress" in text(first)
    assert {a["route"] for a in first["actions"]} == {"/signup", "/login"}
    assert not re.search(r"\blevel\s+\d+", text(first), re.I)
    detail = ask(client, "How are they unlocked?", sid)
    assert detail["topic"] == topic
    assert "first level" in text(detail) if topic == "mentor_sessions" else "later stages" in text(detail)
    personal = ask(client, "What about my course?", sid)
    assert personal["topic"] == "journey_unlocks"
    assert {a["route"] for a in personal["actions"]} == {"/signup", "/login"}


@pytest.mark.parametrize("query", [
    "What exact level do mentor sessions unlock?", "Which level unlocks interview preparation?",
    "My milestone status", "My certificate status", "Have I unlocked mentor sessions?",
    "Have I earned my certificate?", "Am I currently eligible for internships?",
])
def test_personal_unlocks_do_not_invent_account_status(client, query):
    response = ask(client, query)
    assert response["topic"] == "journey_unlocks"
    assert {a["route"] for a in response["actions"]} == {"/signup", "/login"}
    assert "course and progress" in text(response)
    assert not re.search(r"\blevel\s+\d+", text(response), re.I)


def test_related_topics_connect_product_journey(client):
    for message, required in [
        ("Projects", {"Portfolio", "Achievement certificates", "Career readiness"}),
        ("Career readiness", {"Mentor sessions", "Interview preparation", "Internship opportunities"}),
        ("90 levels", {"Checkpoints", "Certificates", "Projects", "What happens after 90 levels?", "Internship eligibility"}),
        ("Mentor sessions", {"Career readiness", "Interview preparation"}),
        ("Interview preparation", {"Career readiness", "Internship opportunities"}),
    ]:
        assert required <= set(ask(client, message)["quick_replies"])


@pytest.mark.parametrize("trigger", [
    "Request follow-up", "contact me", "call me", "team call me", "I want someone to contact me",
    "request a call", "send me details", "can the team contact me", "I need more information from team",
    "talk to someone", "speak to team",
])
def test_natural_followup_triggers_with_known_name(client, trigger):
    sid = start(client)
    ask(client, "jai", sid)
    response = ask(client, trigger, sid)
    assert response["requires_input"]["field"] == "email"
    assert response["message"] == "Sure, Jai. What's the best email address to reach you?"
    assert response["visitor"]["name"] == "Jai"


@pytest.mark.parametrize("value,expected", [
    ("jai", "Jai"), ("jayanth", "Jayanth"), ("soniya", "Soniya"),
    ("McDonald", "McDonald"), ("deVries", "deVries"), ("ANU", "ANU"),
])
def test_conservative_name_formatting(client, value, expected):
    sid = start(client)
    welcome = ask(client, value, sid)
    assert welcome["visitor"]["name"] == expected
    assert welcome["title"] == f"Nice to meet you, {expected}!"


def test_unknown_name_followup_collects_name_then_email_then_mobile(client):
    opening = ask(client, "Request follow-up")
    sid = opening["session_id"]
    assert opening["requires_input"]["field"] == "name"
    assert ask(client, "jai", sid)["requires_input"]["field"] == "email"
    assert ask(client, "jai@gmail.com", sid)["requires_input"]["field"] == "mobile"
    complete = ask(client, "+91 9876543210", sid)
    assert complete["requires_input"] is None
    assert "Nothing has been sent" in complete["highlight"]
    assert "no callback" in complete["highlight"]
    assert "verified" not in text(complete).lower()
    assert "jai@gmail.com" not in str(complete)
    with client.app.state.chatbot.sessions.transaction(UUID(sid)) as session:
        assert session.visitor.name == "Jai"
        assert session.visitor.email == "jai@gmail.com"
        assert session.visitor.mobile == "+919876543210"
        assert all("jai@gmail.com" not in turn.message and "9876543210" not in turn.message for turn in session.history)


@pytest.mark.parametrize("email", ["jai@gmail.com", "student.name@outlook.com", "user123@example.co.in"])
def test_approved_email_formats(client, email):
    sid = ask(client, "Request follow-up")["session_id"]
    ask(client, "Skip", sid)
    assert ask(client, email, sid)["requires_input"]["field"] == "mobile"


@pytest.mark.parametrize("email", ["jai", "jai@", "@gmail.com", "jai gmail.com", "jai@@gmail.com", ""])
def test_invalid_email_stays_in_collection(client, email):
    sid = ask(client, "Request follow-up")["session_id"]
    ask(client, "Skip", sid)
    if not email:
        assert client.post("/api/chat", json={"session_id": sid, "message": email}).status_code == 422
        return
    response = ask(client, email, sid)
    assert response["requires_input"]["field"] == "email"
    assert "doesn't look quite right" in response["message"]
    assert response["visitor"]["email_provided"] is False


@pytest.mark.parametrize("mobile,normalized", [
    ("9876543210", "9876543210"), ("+91 9876543210", "+919876543210"),
    ("+919876543210", "+919876543210"), ("98765 43210", "9876543210"),
])
def test_mobile_format_normalization(client, mobile, normalized):
    sid = ask(client, "Request follow-up")["session_id"]
    ask(client, "Skip", sid)
    ask(client, "Skip", sid)
    done = ask(client, mobile, sid)
    assert done["requires_input"] is None
    with client.app.state.chatbot.sessions.transaction(UUID(sid)) as session:
        assert session.visitor.mobile == normalized


@pytest.mark.parametrize("mobile", ["123", "+91", "123456", "98765abc", "++919876543210", "1234567890123456"])
def test_incomplete_mobile_is_rejected(client, mobile):
    sid = ask(client, "Request follow-up")["session_id"]
    ask(client, "Skip", sid)
    ask(client, "Skip", sid)
    response = ask(client, mobile, sid)
    assert response["requires_input"]["field"] == "mobile"
    assert "seems incomplete" in response["message"]
    assert response["visitor"]["mobile_provided"] is False


def test_skip_cancel_and_product_questions_remain_available(client):
    sid = ask(client, "Request follow-up")["session_id"]
    for expected in ["email", "mobile", None]:
        response = ask(client, "Skip", sid)
        assert (response["requires_input"] or {}).get("field") == expected
    assert ask(client, "Certificates", sid)["topic"] == "certificates"
    for steps in [[], ["Skip"], ["Skip", "jai@gmail.com"]]:
        sid = ask(client, "Request follow-up")["session_id"]
        for value in steps:
            ask(client, value, sid)
        cancelled = ask(client, "Cancel", sid)
        assert cancelled["requires_input"] is None
        assert cancelled["visitor"] == {"name": None, "email_provided": False, "mobile_provided": False}
        assert ask(client, "Mentor sessions", sid)["topic"] == "mentor_sessions"


@pytest.mark.parametrize("question", [
    "Mentor sessions", "Interview preparation", "Internship eligibility", "Contact",
    "Do not contact me", "Do not call me", "Do not email me",
])
def test_information_and_declines_do_not_collect_contact(client, question):
    sid = start(client)
    response = ask(client, question, sid)
    assert response["requires_input"] is None
