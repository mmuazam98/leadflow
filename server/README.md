# LeadFlow Backend

This repository contains the backend API, built using FastAPI and SQLAlchemy with support for PostgreSQL.

## 🚀 Features

- CRUD operations for Leads and Companies

- Advanced search and filtering

- Bulk import/export functionality (CSV)

- Authentication & Authorization (optional, if implemented)

- Async database operations for better performance

- Logging & error handling

- Pagination & sorting support

## 🛠 Tech Stack

- FastAPI (Backend Framework)

- SQLAlchemy + Alembic (Database ORM & Migrations)

- PostgreSQL (Database)

- Pydantic (Data validation & serialization)

- Pytest (Testing framework)

## 📦 Installation

### Prerequisites

- Python 3.9+

- PostgreSQL

### 1️⃣ Clone the Repository

```bash
cd server
```

### 2️⃣ Set Up a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Configure Environment Variables

Create a .env file in the project root with the following:

```
ASYNC_DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/leadflow_db
SECRET_KEY=your-secret-key
ALLOWED_ORIGINS=["http://localhost:5173"]
```

### 5️⃣ Run Database Migrations

```bash
alembic upgrade head
```

### 6️⃣ Start the Server

```bash
uvicorn app.main:app --reload
```

## 🔍 API Documentation

FastAPI provides interactive API docs:

Swagger UI: http://127.0.0.1:8000/docs

ReDoc: http://127.0.0.1:8000/redoc
