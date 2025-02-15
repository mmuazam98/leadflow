from fastapi import APIRouter, Depends, HTTPException, Query, Path, status
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from pydantic import ValidationError
from typing import List
import logging
from datetime import datetime
from app.schemas.response import Response, ResponseWithMeta
from app.schemas.lead import LeadResponse, LeadCreate, BulkDeleteRequest, LeadUpdate
from app.services.lead_service import LeadService
from app.services.company_service import CompanyService
from app.core.database import db
from app.dependencies.auth import get_current_user
from app.utils.generate_csv import generate_csv

router = APIRouter()


class LeadsAPI:
    def __init__(self):
        self.lead_service = LeadService()
        self.company_service = CompanyService()
        self.logger = logging.getLogger(__name__)

    async def create_lead(
        self,
        req: LeadCreate,
        session: AsyncSession = Depends(db.get_session),
        current_user=Depends(get_current_user),
    ) -> Response[LeadResponse]:
        try:
            if req.company_id is None and req.company_name:
                new_company = await self.company_service.create_company(
                    session, req.company_name
                )
                req.company_id = new_company.id
            lead = await self.lead_service.create_lead(
                db=session, lead_data=req, created_by=current_user.id
            )
            return Response(data=lead)

        except ValidationError as e:
            self.logger.error(f"Validation error: {e}")
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=e.errors())
        except SQLAlchemyError as e:
            self.logger.error(f"Database error: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
        except Exception as e:
            self.logger.error(f"Unexpected error: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Something went wrong!",
            )

    async def update_lead(
        self,
        req: LeadUpdate,
        id: int = Path(..., title="Lead ID"),
        session: AsyncSession = Depends(db.get_session),
        _=Depends(get_current_user),
    ) -> Response[LeadResponse]:
        try:
            if req.company_id is None and req.company_name:
                new_company = await self.company_service.create_company(
                    session, req.company_name
                )
                req.company_id = new_company.id
            lead = await self.lead_service.update_lead(
                db=session, lead_id=id, lead_data=req
            )
            if not lead:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail=f"Lead with ID {id} not found")
            return Response(data=lead)

        except ValidationError as e:
            self.logger.error(f"Validation error: {e}")
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=e.errors())
        except HTTPException as e:
            raise e
        except SQLAlchemyError as e:
            self.logger.error(f"Database error: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
        except Exception as e:
            self.logger.error(f"Unexpected error: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Something went wrong!",
            )

    async def get_leads(
        self,
        session: AsyncSession = Depends(db.get_session),
        _=Depends(get_current_user),
        limit: int = Query(10, alias="limit", ge=1, le=100),
        offset: int = Query(0, alias="offset", ge=0),
        sort_by: str = Query(default="created_at", alias="sortBy"),
        order: str = Query(default="desc", alias="order"),
        query: str = Query(default="", alias="query"),
    ) -> ResponseWithMeta[List[LeadResponse]]:
        try:
            leads = await self.lead_service.get_leads(db=session, limit=limit, offset=offset, sort_by=sort_by, order=order, query=query)
            total_count = await self.lead_service.get_total_count(db=session, query=query)
            total_pages = (total_count + limit - 1) // limit
            return ResponseWithMeta(
                data=leads,
                meta={
                    "total_count": total_count,
                    "limit": limit,
                    "offset": offset,
                    "total_pages": total_pages
                }
            )
        except SQLAlchemyError as e:
            self.logger.error(f"Database error: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
        except Exception as e:
            self.logger.error(f"Unexpected error: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong!")

    async def delete_lead(
            self,
            session: AsyncSession = Depends(db.get_session),
            _=Depends(get_current_user),
            id: int = Path(..., title="Lead ID"),
    ) -> Response:
        try:
            success = await self.lead_service.delete_lead(db=session, id=id)
            if not success:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail=f"Lead with ID {id} not found")
            return Response(data="Lead deleted successfully!")
        except HTTPException as e:
            raise e
        except SQLAlchemyError as e:
            self.logger.error(f"Database error: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
        except Exception as e:
            self.logger.error(f"Unexpected error: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong!")

    async def bulk_delete(
            self,
            req: BulkDeleteRequest,
            session: AsyncSession = Depends(db.get_session),
            _=Depends(get_current_user),
    ) -> Response:
        try:
            success = await self.lead_service.bulk_delete(db=session, ids=req.ids)
            if not success:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong!")
            return Response(data="Leads deleted successfully!")

        except ValidationError as e:
            self.logger.error(f"Validation error: {e}")
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=e.errors())
        except SQLAlchemyError as e:
            self.logger.error(f"Database error: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
        except Exception as e:
            self.logger.error(f"Unexpected error: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong!")

    async def get_lead_by_id(
            self,
            id: int = Path(..., title="Lead ID"),
            session: AsyncSession = Depends(db.get_session),
            _=Depends(get_current_user),
    ) -> Response[LeadResponse]:
        try:
            lead = await self.lead_service.get_lead_by_id(db=session, id=id)
            if not lead:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail=f"Lead with ID {id} not found")
            return Response(data=lead)

        except HTTPException as e:
            raise e
        except SQLAlchemyError as e:
            self.logger.error(f"Database error: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
        except Exception as e:
            self.logger.error(f"Unexpected error: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong!")

    async def export_leads_data(
        self,
        session: AsyncSession = Depends(db.get_session),
        _=Depends(get_current_user)
    ):
        try:
            total_count = await self.lead_service.get_total_count(db=session)
            leads = await self.lead_service.get_leads(db=session, limit=total_count, offset=0)
            csv_content = generate_csv(leads)
            return StreamingResponse(
                content=csv_content,
                media_type="text/csv",
                headers={
                    "Content-Disposition": f"attachment; filename=leads_{datetime.now().strftime('%Y%m%d%H%M%S')}.csv"
                },
            )
        except Exception as e:
            self.logger.error(f"Unexpected error: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong!")


leads_api = LeadsAPI()

router.add_api_route(
    "/",
    leads_api.get_leads,
    methods=["GET"],
    response_model=ResponseWithMeta[List[LeadResponse]],
)

router.add_api_route(
    "/export",
    leads_api.export_leads_data,
    methods=["GET"],
    response_model=Response,
)

router.add_api_route(
    "/{id}",
    leads_api.get_lead_by_id,
    methods=["GET"],
    response_model=Response[LeadResponse],
)

router.add_api_route(
    "/", leads_api.create_lead, methods=["POST"], response_model=Response[LeadResponse]
)
router.add_api_route(
    "/{id}", leads_api.update_lead, methods=["PUT"], response_model=Response[LeadResponse]
)
router.add_api_route(
    "/bulk", leads_api.bulk_delete, methods=["DELETE"], response_model=Response
)
router.add_api_route(
    "/{id}", leads_api.delete_lead, methods=["DELETE"], response_model=Response
)
