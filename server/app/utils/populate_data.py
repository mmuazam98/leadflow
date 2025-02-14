from sqlalchemy.future import select
import random
from faker import Faker
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.company import Company
from app.models.lead import Lead

fake = Faker()


async def insert_fake_companies(db: AsyncSession, num_companies: int = 100):
    """Inserts a specified number of fake companies into the database if no companies are present."""
    # Check if data exists
    result = await db.execute(select(Company.id).limit(1))
    existing_company = result.scalar()

    if existing_company:
        print("Companies already exist. Skipping seeding.")
        return
    companies = []

    for _ in range(num_companies):
        company = Company(
            name=fake.company(),
        )
        companies.append(company)

    db.add_all(companies)
    await db.commit()
    print(f"{num_companies} fake companies inserted successfully!")


async def insert_fake_leads(db: AsyncSession, num_leads: int = 500):
    """Inserts a specified number of fake leads into the database if no leads are present."""
    result = await db.execute(select(Lead.id).limit(1))
    existing_company = result.scalar()

    if existing_company:
        print("Leads already exist. Skipping seeding.")
        return
    leads = []

    for _ in range(num_leads):
        lead = Lead(
            name=fake.name(),
            email=fake.email(),
            company_id=random.randint(1, 100),
            engaged=random.choice([True, False]),
            stage=random.choice(
                ['PROSPECT', 'ENGAGED', 'NEGOTIATION', 'COMMITTED', 'CLOSED']),
            created_by=1,
            last_contacted_at=fake.date_time_between(
                start_date="-2y", end_date="now"),
            created_at=fake.date_time_between(
                start_date="-2y", end_date="now"),
            updated_at=datetime.utcnow(),
        )
        leads.append(lead)

    db.add_all(leads)
    await db.commit()
    print(f"{num_leads} fake leads inserted successfully!")
