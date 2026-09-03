import os
from pathlib import Path

from dotenv import load_dotenv
from pydantic import BaseModel, Field, field_validator


class Settings(BaseModel):
    cors_origins: list[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    session_ttl_seconds: int = Field(default=1800, ge=60, le=86400)
    max_sessions: int = Field(default=500, ge=1, le=10000)
    history_limit: int = Field(default=24, ge=2, le=100)
    cleanup_interval_seconds: int = Field(default=60, ge=1, le=300)

    @field_validator("cors_origins")
    @classmethod
    def explicit_origins(cls, values: list[str]) -> list[str]:
        from urllib.parse import urlsplit

        for value in values:
            origin = urlsplit(value)
            if (origin.scheme not in {"http", "https"} or not origin.netloc
                    or origin.path or origin.query or origin.fragment
                    or origin.username or origin.password or "*" in value):
                raise ValueError("CORS origins must be explicit HTTP(S) origins without paths")
        return values


def load_settings() -> Settings:
    load_dotenv(Path(__file__).resolve().parents[2] / ".env", override=False)
    values = {
        key: os.environ[f"CHATBOT_{key.upper()}"]
        for key in Settings.model_fields
        if f"CHATBOT_{key.upper()}" in os.environ
    }
    if "cors_origins" in values:
        values["cors_origins"] = [v.strip() for v in values["cors_origins"].split(",") if v.strip()]
    return Settings.model_validate(values)
