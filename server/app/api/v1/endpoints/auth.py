from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from app.schemas.user import LoginRequest, AuthResponse, RegisterRequest, UserResponse
from app.schemas.response import Response
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.user_service import UserService
from app.core.database import db
from app.utils.auth import verify_password, create_access_token, get_password_hash
from app.logger.logger import log_message

router = APIRouter()


class AuthAPI:
    def __init__(self):
        self.service = UserService()

    async def create_user(self, req: RegisterRequest, session: AsyncSession = Depends(db.get_session)) -> Response[AuthResponse]:
        try:
            existing_user = await self.service.get_user_by_email(session, req.email)
            if existing_user:
                raise HTTPException(
                    status_code=400, detail="Email already registered.")

            req.password = get_password_hash(req.password)

            created_user = await self.service.create_user(session, user_data=req)
            token = create_access_token(
                {"sub": created_user.email, "id": created_user.id})
            return Response[AuthResponse](
                data=AuthResponse(
                    token=token,
                    user=UserResponse(
                        id=created_user.id,
                        email=created_user.email,
                        name=created_user.name,
                    )
                )
            )

        except SQLAlchemyError as e:
            log_message("error", f"Database error: {e}")
            raise HTTPException(
                status_code=500, detail="Internal server error")

        except Exception as e:
            log_message("error", f"Unexpected error: {e}")
            raise HTTPException(
                status_code=500, detail="Something went wrong!")

    async def login_user(self, req: LoginRequest, session: AsyncSession = Depends(db.get_session)) -> Response[AuthResponse]:
        try:
            user = await self.service.get_user_by_email(session, req.email)
            if not user or not verify_password(req.password, user.password):
                raise HTTPException(
                    status_code=401, detail="Invalid email or password.")

            token = create_access_token({"sub": user.email, "id": user.id})

            return Response[AuthResponse](
                data=AuthResponse(
                    token=token,
                    user=UserResponse(
                        id=user.id,
                        email=user.email,
                        name=user.name,
                    )
                )
            )
        except SQLAlchemyError as e:
            log_message("error", f"Database error: {e}")
            raise HTTPException(
                status_code=500, detail="Internal server error")

        except Exception as e:
            log_message("error", f"Unexpected error: {e}")
            raise HTTPException(
                status_code=500, detail="Something went wrong!")


auth_api = AuthAPI()

router.add_api_route("/register", auth_api.create_user,
                     methods=["POST"], response_model=Response[AuthResponse])
router.add_api_route("/login", auth_api.login_user,
                     methods=["POST"], response_model=Response[AuthResponse])
