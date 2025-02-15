# LeadFlow Frontend

This repository contains the frontend application, built using **React**, **TypeScript**, **Tailwind CSS**, and **React Query**. Check out the live demo [here](https://leadflow-alpha.vercel.app/).

## 🚀 Features

- User-friendly Dashboard

- CRUD operations for Leads and Companies

- Authentication & Authorization

- Responsive UI with modern design

- Search & Filtering functionality

- Pagination & Sorting support

- Export leads to CSV

## 🛠 Tech Stack

- ReactJS (Frontend Framework)

- Vite (Build Tool)

- Tailwind CSS (Styling)

- Axios (API requests)

- React Router (Navigation)

- Redux Toolkit (State Management)

## 📦 Installation

### Prerequisites

- Node.js (v22+ recommended)

- yarn or npm

### 1️⃣ Clone the Repository

```bash
cd client
```

### 2️⃣ Install Dependencies

```bash
yarn  # or npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project root with the following:

```bash
VITE_REACT_APP_ENV=local
```

### 4️⃣ Start the Development Server

#### Run Locally

```bash
yarn dev  # or npm run dev
```

#### Run Using Docker

```bash
docker build -t leadflow .
docker run -p 5173:5173 leadflow
```

The application will be available at http://localhost:5173.

## 🔍 API Integration

The frontend communicates with the LeadFlow backend API. Ensure the backend is running before making API calls.

## 🧪 Running Tests

```bash
yarn test
```
