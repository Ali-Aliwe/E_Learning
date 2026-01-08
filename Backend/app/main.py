from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import auth, courses

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="E-Learning Platform API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(courses.router)

@app.get("/")
async def root():
    return {"message": "E-Learning Platform API", "status": "running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}