from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.schemas.response import Response
from app.services.company_service import CompanyService
from app.schemas.company import CompanyResponse
from app.utils.validate_user import get_current_user
from app.core.database import db
from app.logger.logger import log_message

router = APIRouter()


class CompanyAPI:
    def __init__(self):
        self.service = CompanyService()

    async def get_companies(
        self,
        session: AsyncSession = Depends(db.get_session),
        _=Depends(get_current_user),
    ):
        try:
            companies = await self.service.get_companies(db=session)
            return Response(data=companies)
        except SQLAlchemyError as e:
            log_message("error", f"Database error: {e}")
            raise HTTPException(
                status_code=500, detail="Internal server error")
        except Exception as e:
            log_message("error", f"Unexpected error: {e}")
            raise HTTPException(
                status_code=500, detail="Something went wrong!")


company_api = CompanyAPI()

router.add_api_route(
    "/",
    company_api.get_companies,
    methods=["GET"],
    response_model=Response[List[CompanyResponse]],
)
