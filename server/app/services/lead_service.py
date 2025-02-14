from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException
from sqlalchemy import asc, desc
from sqlalchemy.sql import func, update, or_
from sqlalchemy.future import select
from app.models.lead import Lead
from app.models.company import Company
from app.schemas.lead import LeadCreate, LeadResponse, LeadUpdate
from datetime import datetime


class LeadService:
    async def create_lead(self, db: AsyncSession, lead_data: LeadCreate, created_by: int):
        lead = Lead(
            name=lead_data.name,
            email=lead_data.email,
            company_id=lead_data.company_id,
            engaged=lead_data.engaged,
            stage=lead_data.stage,
            last_contacted_at=lead_data.last_contacted_at,
            created_by=created_by
        )
        db.add(lead)
        await db.commit()
        await db.refresh(lead)

        result = await db.execute(select(Company.name).where(Company.id == lead.company_id))
        company_name = result.scalar_one_or_none()

        return LeadResponse(
            id=lead.id,
            name=lead.name,
            email=lead.email,
            engaged=lead.engaged,
            stage=lead.stage,
            last_contacted_at=lead.last_contacted_at,
            company_id=lead.company_id,
            company_name=company_name,
        )

    async def update_lead(self, db: AsyncSession, lead_id: int, lead_data: LeadUpdate):
        result = await db.execute(select(Lead).filter(Lead.id == lead_id, Lead.deleted_at.is_(None)))
        lead = result.scalars().first()

        if not lead:
            raise HTTPException(
                status_code=400, detail=f"Lead with the ID:{lead_id} not found")

        update_fields = lead_data.dict(exclude_unset=True)
        for key, value in update_fields.items():
            setattr(lead, key, value)

        lead.updated_at = datetime.utcnow()
        await db.commit()
        await db.refresh(lead)

        result = await db.execute(select(Company.name).where(Company.id == lead.company_id))
        company_name = result.scalar_one_or_none()

        return LeadResponse(
            id=lead.id,
            name=lead.name,
            email=lead.email,
            engaged=lead.engaged,
            stage=lead.stage,
            last_contacted_at=lead.last_contacted_at,
            company_id=lead.company_id,
            company_name=company_name,
        )

    async def get_leads(self, db: AsyncSession, limit: int, offset: int, sort_by: str = "created_at", order: str = "desc", query: str = ""):
        sort_columns = {
            "name": Lead.name,
            "company_name": Company.name,
            "stage": Lead.stage,
            "engaged": Lead.engaged,
            "created_at": Lead.created_at
        }

        sort_column = sort_columns.get(sort_by, Lead.created_at)
        order_by_clause = asc(sort_column) if order.lower(
        ) == "asc" else desc(sort_column)

        stmt = (
            select(
                Lead.id,
                Lead.name,
                Lead.email,
                Lead.engaged,
                Lead.stage,
                Lead.last_contacted_at,
                Lead.created_at,
                Lead.updated_at,
                Company.id.label("company_id"),
                Company.name.label("company_name")
            )
            .join(Company, Lead.company_id == Company.id, isouter=True)
            .where(Lead.deleted_at.is_(None))
        )

        # If query is provided, filter by name, email, or company_name
        if query:
            stmt = stmt.where(
                or_(
                    Lead.name.ilike(f"%{query}%"),
                    Lead.email.ilike(f"%{query}%"),
                    Company.name.ilike(f"%{query}%")
                )
            )

        stmt = stmt.order_by(order_by_clause).limit(limit).offset(offset)

        result = await db.execute(stmt)
        leads = result.all()

        return [
            LeadResponse(
                id=lead.id,
                name=lead.name,
                email=lead.email,
                engaged=lead.engaged,
                stage=lead.stage,
                last_contacted_at=lead.last_contacted_at,
                created_at=lead.created_at,
                company_id=lead.company_id,
                company_name=lead.company_name,
            )
            for lead in leads
        ]

    async def get_total_count(self, db: AsyncSession, query: str = ""):
        stmt = select(func.count(Lead.id)).where(Lead.deleted_at.is_(None))

        if query:  # Apply search filter only when query is not empty
            stmt = (
                stmt.join(Company, Lead.company_id == Company.id, isouter=True)
                .where(
                    or_(
                        Lead.name.ilike(f"%{query}%"),
                        Lead.email.ilike(f"%{query}%"),
                        Company.name.ilike(f"%{query}%")
                    )
                )
            )

        result = await db.execute(stmt)
        total_count = result.scalar_one()
        return total_count

    async def delete_lead(self, db: AsyncSession, id: int):
        result = await db.execute(
            update(Lead)
            .where(Lead.id == id)
            .values(deleted_at=datetime.utcnow())
        )
        await db.commit()
        return True if result.rowcount else False

    async def bulk_delete(self, db: AsyncSession, ids: list[int]):
        result = await db.execute(
            update(Lead)
            .where(Lead.id.in_(ids))
            .values(deleted_at=datetime.utcnow())
        )
        await db.commit()
        return True if result.rowcount else False
