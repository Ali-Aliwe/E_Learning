import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database import Base, get_db

# Create test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_courses.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

class TestCourseOperations:
    """Integration tests for course CRUD operations"""
    
    @classmethod
    def setup_class(cls):
        """Setup test database"""
        Base.metadata.create_all(bind=engine)
    
    @classmethod
    def teardown_class(cls):
        """Clean up test database"""
        Base.metadata.drop_all(bind=engine)
    
    def test_create_and_retrieve_course(self):
        """Test creating a course and retrieving it"""
        # Step 1: Create a new course
        course_data = {
            "title": "Advanced Python Programming",
            "instructor": "Dr. Jane Smith",
            "category": "Programming",
            "level": "Advanced",
            "duration": "60 hours",
            "price": 99.99,
            "description": "Master advanced Python concepts"
        }
        
        create_response = client.post("/api/courses/", json=course_data)
        assert create_response.status_code == 200
        created_course = create_response.json()
        assert created_course["title"] == "Advanced Python Programming"
        assert created_course["price"] == 99.99
        course_id = created_course["id"]
        
        # Step 2: Retrieve the created course
        get_response = client.get(f"/api/courses/{course_id}")
        assert get_response.status_code == 200
        retrieved_course = get_response.json()
        assert retrieved_course["id"] == course_id
        assert retrieved_course["title"] == "Advanced Python Programming"
        assert retrieved_course["instructor"] == "Dr. Jane Smith"
    
    def test_get_all_courses(self):
        """Test retrieving all courses"""
        # Create multiple courses
        courses_data = [
            {
                "title": "Web Development Basics",
                "instructor": "John Doe",
                "category": "Programming",
                "level": "Beginner",
                "duration": "30 hours",
                "price": 49.99,
                "description": "Learn web development"
            },
            {
                "title": "Data Science Fundamentals",
                "instructor": "Sarah Johnson",
                "category": "Data Science",
                "level": "Intermediate",
                "duration": "45 hours",
                "price": 79.99,
                "description": "Introduction to data science"
            }
        ]
        
        for course in courses_data:
            client.post("/api/courses/", json=course)
        
        # Retrieve all courses
        response = client.get("/api/courses/")
        assert response.status_code == 200
        all_courses = response.json()
        assert len(all_courses) >= 2
        assert isinstance(all_courses, list)