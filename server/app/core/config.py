from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ASYNC_DATABASE_URL: str = ""
    JWT_SECRET_KEY: str = ""
    ALLOWED_ORIGINS: list[str] = []

    class Config:
        env_file = ".env"

settings = Settings()
