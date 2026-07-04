# Bit-2-Bramha — HR Management System

A full-stack HR Management System built for the Odoo Hackathon, covering employee authentication, attendance tracking, leave & payroll management, and analytics dashboards.

## Team — Bit2Bramha

| Member | Module |
|---|---|
| Swagat | Authentication + Backend Core (Employee module) |
| Member 2 | Attendance |
| Member 3 | Leave + Payroll |
| Member 4 | Dashboard + Reports + Project Configuration |

## Tech Stack

**Backend**
- Node.js + Express
- PostgreSQL (via Knex.js query builder)
- JWT-based authentication

**Frontend**
- React (Vite)
- Tailwind CSS

## Project Structure

```
Bit-2-Bramha/
│
├── backend/
│   ├── package.json
│   ├── knexfile.js
│   ├── .env.example
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── database/
│       ├── middleware/
│       ├── utils/
│       └── modules/
│           ├── auth/
│           ├── employee/
│           ├── attendance/
│           ├── leave/
│           ├── payroll/
│           └── reports/
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── layouts/
│       ├── context/
│       └── modules/
│           ├── attendance/
│           ├── leave/
│           ├── payroll/
│           ├── dashboard/
│           └── reports/
│
├── database/
├── scripts/
└── README.md
```

## Features

- **Authentication** — Secure login/signup with JWT, role-based access control
- **Employee Management** — Employee records, profiles, and onboarding
- **Attendance** — Daily attendance tracking and history
- **Leave Management** — Leave requests, approvals, and balance tracking
- **Payroll** — Salary calculation and payroll processing
- **Dashboard** — Real-time analytics and summary views
- **Reports** — Exportable reports across attendance, leave, and payroll data

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` with your local PostgreSQL credentials and JWT secret, then run migrations:

```bash
npx knex migrate:latest
```

Start the backend server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` (default Vite port) and the backend typically on `http://localhost:5000` — check `.env.example` for the exact configured port.

## Environment Variables

See `backend/.env.example` for the required variables (database connection, JWT secret, port, etc.). Never commit your actual `.env` file — it's excluded via `.gitignore`.

## Contributing (Team Workflow)

Each member worked on an isolated module to avoid merge conflicts:

```bash
git pull origin main
git add <your-module-path>
git commit -m "Your module description"
git push origin main
```

## License

This project was built for academic/hackathon purposes as part of the Odoo Hackathon.
