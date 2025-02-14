from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.services.user_service import *
from app.schemas.user import *
from app.core.database import db
from app.utils.auth import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_user(token: str = Depends(oauth2_scheme), session: AsyncSession = Depends(db.get_session)) -> User:
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user_id = payload.get("id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    service = UserService()
    user = await service.get_user_by_id(session, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user
