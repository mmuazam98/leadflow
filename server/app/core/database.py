from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from typing import AsyncGenerator
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

DATABASE_URL = settings.ASYNC_DATABASE_URL


class AsyncDatabaseSession:
    def __init__(self):
        self._engine = create_async_engine(
            DATABASE_URL,
            future=True,
            echo=True,
        )
        self._session_factory = sessionmaker(
            bind=self._engine,
            expire_on_commit=False,
            class_=AsyncSession,
        )

    async def get_session(self) -> AsyncGenerator[AsyncSession, None]:
        """Dependency function to get an async database session."""
        async with self._session_factory() as session:
            yield session


# Create a global database instance
db = AsyncDatabaseSession()
