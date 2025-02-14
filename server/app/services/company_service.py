from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.company import Company


class CompanyService:
    async def create_company(self, db: AsyncSession, name: str):
        company = Company(
            name=name,
        )
        db.add(company)
        await db.commit()
        await db.refresh(company)
        return company

    async def get_companies(self, db: AsyncSession):
        result = await db.execute(select(Company))
        return result.scalars().all()
