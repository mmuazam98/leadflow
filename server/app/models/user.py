from sqlalchemy import Column, Integer, String, DateTime
from app.models.base import Base
from datetime import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    name = Column(String)
    created_at = Column(DateTime(timezone=True), default=datetime.now())
    updated_at = Column(DateTime(timezone=True), default=datetime.now())
    deleted_at = Column(DateTime(timezone=True))
