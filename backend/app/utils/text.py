import re
import unicodedata
from difflib import SequenceMatcher

STOP_WORDS = frozenset("a an the is are was be of for to in on at and or i me my you your we our it this that do does can could would will should have has tell about please want know more with how what which there get give us guys here much need any available information explain show take open view see does not".split())

# Explicit, auditable aliases handle short misspellings without fuzzy guessing.
ALIASES = {
    "u": "you", "ur": "your", "r": "are", "pls": "please", "plz": "please",
    "wht": "what", "wat": "what", "hat": "what", "thx": "thanks",
    "hii": "hi", "hlo": "hello", "heyy": "hey", "im": "i am",
    "priscing": "pricing", "pricee": "price", "prise": "price",
    "carrer": "career", "carrers": "careers", "trak": "track",
    "singup": "signup", "signuo": "signup", "registerr": "register",
    "contcat": "contact", "porfolio": "portfolio", "projcts": "projects",
    "certficates": "certificates",
}


def normalize(text: str) -> str:
    text = unicodedata.normalize("NFKC", text).casefold().replace("’", "'")
    for source, target in (("don't", "do not"), ("what's", "what is"), ("i'm", "i am"), ("it's", "it is")):
        text = text.replace(source, target)
    text = re.sub(r"[^\w\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    text = " ".join(ALIASES.get(word, word) for word in text.split())
    for source, target in (("mentor me", "mentorme"), ("front end", "frontend"), ("back end", "backend"), ("road map", "roadmap"), ("sign up", "signup"), ("sign in", "signin"), ("log in", "login")):
        text = re.sub(rf"\b{source}\b", target, text)
    if text not in {"hi", "hello", "hey"}:
        text = re.sub(r"^(hi|hello|hey)\s+", "", text)
    return text


def tokens(text: str) -> set[str]:
    return {word for word in normalize(text).split() if word not in STOP_WORDS}


def contains_phrase(text: str, phrase: str) -> bool:
    return bool(phrase and f" {phrase} " in f" {text} ")


def similarity(left: str, right: str) -> float:
    if min(len(left), len(right)) < 4:
        return float(left == right)
    return SequenceMatcher(None, left, right).ratio()
