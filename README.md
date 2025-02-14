# LeadFlow

Full stack application built using React and FastAPI.

## 📌 Features

- **Lead & Company Management**: Create, update, delete, and search leads & companies.

- **User Authentication**: Secure access control (if implemented).

- **Bulk Import/Export**: Easily manage leads via CSV files.

- **Asynchronous API**: Fast performance with async processing.

- **Logging & Error Handling**: Comprehensive logging for debugging.

- **Pagination & Sorting**: Optimized data retrieval.

## 🏗 Project Structure

```bash
LeadFlow/
├── client/      # Frontend (React)
├── server/      # Backend (FastAPI)
├── start.sh     # Bash script to start frontend and backend
└── README.md    # Main ReadMe

```

## 🛠 Tech Stack

| Component | Technology                                    |
| --------- | --------------------------------------------- |
| Frontend  | React, Vite, Tailwind CSS, Redux, React Query |
| Backend   | FastAPI, SQLAlchemy, PostgreSQL, Alembic      |
| Database  | PostgreSQL                                    |

## 🚀 Installation Guide

To set up the project locally, follow these steps:

### 1️⃣ Clone the Repository

```bash
git clone git@github.com:mmuazam98/leadflow.git
cd leadflow
```

### 2️⃣ Setup the Backend (FastAPI)

Follow the [Backend Setup Instructions](https://github.com/mmuazam98/leadflow/tree/main/server/README.md).

### 3️⃣ Setup the Frontend (React)

Follow the [Frontend Setup Instructions](https://github.com/mmuazam98/leadflow/tree/main/client/README.md).

### 4️⃣ Run Frontend & Backend Together

To run both the frontend and backend simultaneously, execute the following script:

```bash
chmod +x start.sh
./start.sh
```

This will:

- Install dependencies and start the React frontend.
- Install Python dependencies and start the FastAPI backend.

## 📖 Documentation

Backend API Docs: http://localhost:8000/docs

Frontend: Hosted on http://localhost:5173
