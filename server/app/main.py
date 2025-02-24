from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import logging
from app.api.v1.endpoints import leads, auth, company
from app.core.config import settings
from app.core.database import db
from app.utils.populate_data import insert_fake_companies, insert_fake_leads
from app.middleware.exceptions import catch_exceptions_middleware

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - [%(levelname)s] - [%(name)s] - %(message)s",
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler()
    ],
)

app = FastAPI(title="LeadFlow backend server!")

app.middleware('http')(catch_exceptions_middleware)


@app.on_event("startup")
async def startup_event():
    """Run when the app starts"""
    async for session in db.get_session():
        await insert_fake_companies(session)
        await insert_fake_leads(session)
        break

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(leads.router, prefix="/api/v1/leads")
app.include_router(auth.router, prefix="/api/v1/auth")
app.include_router(company.router, prefix="/api/v1/company")


@app.get("/health")
def read_root():
    return {"message": "Server is running! 🚀"}
