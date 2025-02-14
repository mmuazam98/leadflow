from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum, func
from app.models.base import Base
from enum import Enum as PyEnum


class Stage(str, PyEnum):
    PROSPECT = "PROSPECT"
    ENGAGED = "ENGAGED"
    NEGOTIATION = "NEGOTIATION"
    COMMITTED = "COMMITTED"
    CLOSED = "CLOSED"


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    engaged = Column(Boolean, default=False)
    stage = Column(Enum(Stage), nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    last_contacted_at = Column(DateTime(timezone=True), nullable=True)

    created_at = Column(DateTime(timezone=True),
                        nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False,
                        server_default=func.now(), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)
