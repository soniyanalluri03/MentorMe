"""Small, reusable phrase matcher. Context never creates lexical evidence."""
from dataclasses import dataclass

from app.utils.text import contains_phrase, normalize, similarity, tokens


@dataclass(frozen=True)
class PhraseIndex:
    phrases: tuple[str, ...]
    vocabulary: frozenset[str]

    @classmethod
    def build(cls, phrases: list[str]) -> "PhraseIndex":
        normalized = tuple(dict.fromkeys(normalize(p) for p in phrases if p))
        return cls(normalized, frozenset(tokens(" ".join(normalized))))

    def score(self, text: str, *, exact_only: bool = False) -> float:
        text = normalize(text)
        if text in self.phrases:
            return 1.0
        if exact_only:
            return 0.0
        words = tokens(text)
        if not words:
            return 0.0
        similarities = [max((similarity(w, term) for term in self.vocabulary), default=0) for w in words]
        coverage = sum(s >= .82 for s in similarities) / len(words)
        # Most meaningful words must be explained; "price of bitcoin" is not pricing.
        if coverage < .75:
            return 0.0
        fuzzy = max((similarity(text, p) for p in self.phrases), default=0)
        phrase = any(contains_phrase(text, p) for p in self.phrases)
        if fuzzy >= .84:
            return min(.94, .7 + .24 * fuzzy)
        if phrase:
            return .90 + .04 * coverage
        # Token matching tolerates reordering but requires a strong full-token match.
        if coverage == 1 and min(similarities) >= .84:
            return .78 + .1 * (sum(similarities) / len(similarities))
        return 0.0
