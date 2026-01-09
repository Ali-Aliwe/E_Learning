from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
import os

from app.database import engine, Base
from app.routes import auth, courses

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="E-Learning Platform API",
    description="Full-stack e-learning platform with React frontend and FastAPI backend",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # React dev server
        "http://localhost:8000",  # Production
        "*"  # Allow all origins in production (adjust as needed)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(auth.router)
app.include_router(courses.router)

# API routes
@app.get("/api")
async def api_root():
    return {
        "message": "E-Learning Platform API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

# Serve React static files (for production)
static_dir = Path(__file__).parent.parent / "static"

if static_dir.exists():
    # Mount static files
    app.mount("/assets", StaticFiles(directory=str(static_dir / "assets")), name="assets")
    
    # Serve index.html for all non-API routes (SPA routing)
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        # If path starts with /api, let FastAPI handle it
        if full_path.startswith("api/"):
            return {"error": "Not found"}, 404
        
        # Serve index.html for all other routes
        index_file = static_dir / "index.html"
        if index_file.exists():
            return FileResponse(index_file)
        
        return {"error": "Frontend not built"}, 404
else:
    @app.get("/")
    async def root():
        return {
            "message": "E-Learning Platform API",
            "note": "Frontend not available. Run in development mode or build frontend first.",
            "api_docs": "/docs"
        }