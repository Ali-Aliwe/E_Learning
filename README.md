# E-Learning Platform

A full-stack e-learning platform built with React and FastAPI.

## Features

- User Authentication
- Course Browsing and Search
- Course Enrollment
- Progress Tracking
- Course Management

## Tech Stack

- Frontend: React, Tailwind CSS, Vite
- Backend: FastAPI, SQLAlchemy, SQLite
- Icons: Lucide React

## Installation

### Frontend

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

### Backend

\`\`\`bash
cd backend
python -m venv venv
source venv/bin/activate # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
\`\`\`

## License

MIT
