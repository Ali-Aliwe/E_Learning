import pytest
from pydantic import ValidationError
from app.schemas.user import UserCreate, UserLogin
from app.schemas.course import CourseCreate

class TestSchemas:
    """Unit tests for Pydantic schemas"""
    
    def test_user_create_valid(self):
        """Test valid user creation schema"""
        user_data = {
            "name": "John Doe",
            "email": "john@example.com",
            "password": "SecurePass123"
        }
        user = UserCreate(**user_data)
        
        assert user.name == "John Doe"
        assert user.email == "john@example.com"
        assert user.password == "SecurePass123"
    
    def test_user_create_invalid_email(self):
        """Test that invalid email raises validation error"""
        user_data = {
            "name": "John Doe",
            "email": "invalid-email",  # Invalid email format
            "password": "SecurePass123"
        }
        
        with pytest.raises(ValidationError) as exc_info:
            UserCreate(**user_data)
        
        assert "email" in str(exc_info.value).lower()
    
    def test_course_create_valid(self):
        """Test valid course creation schema"""
        course_data = {
            "title": "Web Development",
            "instructor": "Jane Smith",
            "category": "Programming",
            "level": "Intermediate",
            "duration": "50 hours",
            "price": 79.99,
            "description": "Learn web development"
        }
        course = CourseCreate(**course_data)
        
        assert course.title == "Web Development"
        assert course.price == 79.99
        assert course.level == "Intermediate"