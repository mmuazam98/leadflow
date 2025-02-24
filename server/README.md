# LeadFlow Backend

This repository contains the backend API, built using FastAPI and SQLAlchemy with support for PostgreSQL. Explore the API documentation [here](https://leadflow-ma8v.onrender.com/docs).

## 🚀 Features

- CRUD operations for Leads and Companies

- Advanced search and filtering

- Bulk export functionality (CSV)

- Authentication & Authorization

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

#### Run Locally

```bash
uvicorn app.main:app --reload
```

#### Run Using Docker

```bash
docker build -t leadflow-server .
docker run -p 8000:8000 --env-file .env leadflow-server
```

## 🔍 API Documentation

FastAPI provides interactive API docs:

Swagger UI: http://127.0.0.1:8000/docs

ReDoc: http://127.0.0.1:8000/redoc

## 🧪 Running Tests

```bash
PYTHONPATH=. pytest
```
