from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.schemas.user import UserCreate
from sqlalchemy.future import select

class UserService:
    async def create_user(self, db: AsyncSession, user_data: UserCreate):
        user = User(name=user_data.name, email=user_data.email, password=user_data.password)
        db.add(user)
        await db.commit()
        await db.refresh(user)
        return user

    async def get_users(self, db: AsyncSession):
        result = await db.execute(select(User))
        return result.scalars().all()
    
    async def get_user_by_email(self, db: AsyncSession, email: str):
        result = await db.execute(select(User).filter(User.email == email))
        user = result.scalars().first() 
        return user 
    
    async def get_user_by_id(self, db: AsyncSession, id: int):
        result = await db.execute(select(User).filter(User.id == id))
        user = result.scalars().first() 
        return user 
