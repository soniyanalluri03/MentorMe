import re


def validate_name(value: str) -> str:
    value = re.sub(r"^(my name is|call me|i am|i'm)\s+", "", value.strip(), flags=re.I)
    if not 1 <= len(value) <= 80 or not any(c.isalpha() for c in value) or len(value.split()) > 5:
        raise ValueError("What name would you like me to use? A short name is fine, or choose Skip for now.")
    if any(not (c.isalpha() or c in " .'-’") for c in value):
        raise ValueError("Please use letters, spaces, apostrophes or hyphens for your name, or choose Skip.")
    # Only format a wholly lowercase, single-word name; preserve mixed case.
    return value[0].upper() + value[1:] if value.isalpha() and value.islower() else value


def validate_email(value: str) -> str:
    value = value.strip()
    if len(value) > 254 or value.count("@") != 1:
        raise ValueError("That email doesn't look quite right. Could you check it once? You can also skip.")
    local, domain = value.rsplit("@", 1)
    labels = domain.split(".")
    if (not 1 <= len(local) <= 64 or not re.fullmatch(r"[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+", local)
            or local.startswith(".") or local.endswith(".") or ".." in local
            or len(labels) < 2 or len(labels[-1]) < 2
            or any(not re.fullmatch(r"[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?", label) for label in labels)):
        raise ValueError("That email doesn't look quite right. Could you check it once? You can also skip.")
    return f"{local}@{domain.lower()}"


def validate_mobile(value: str) -> str:
    value = value.strip()
    digits = re.sub(r"\D", "", value)
    if not re.fullmatch(r"\+?[0-9 ()\-.]+", value) or not 7 <= len(digits) <= 15:
        raise ValueError("That number seems incomplete. Could you send it again? Use 7–15 digits; a country code is welcome. You can also skip.")
    return ("+" if value.startswith("+") else "") + digits


def contains_personal_data(value: str) -> bool:
    return bool(re.search(r"\S+@\S+|(?:\+?\d[\s().-]*){7,}", value))


def contains_secret(value: str) -> bool:
    return bool(re.search(r"\b(?:my password is|password\s*[:=]|card number|cvv|otp is|api[_ -]?key\s*[:=])", value, re.I))
