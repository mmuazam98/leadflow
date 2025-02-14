from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional
from app.models.lead import Stage


class LeadBase(BaseModel):
    name: str
    email: EmailStr
    company_id: int
    engaged: bool = False
    stage: Stage
    last_contacted_at: Optional[datetime] = None


class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    engaged: bool = False
    stage: Stage
    last_contacted_at: Optional[datetime] = None
    company_name: Optional[str] = None
    company_id: Optional[int] = None


class LeadUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    company_name: Optional[str] = None
    company_id: Optional[int] = None
    engaged: Optional[bool] = None
    stage: Optional[Stage] = None
    last_contacted_at: Optional[datetime] = None


class BulkDeleteRequest(BaseModel):
    ids: List[int]


class LeadResponse(LeadBase):
    id: int
    company_name: str

    class Config:
        from_attributes = True  # Allows ORM conversion
