import pytest
from app.models.course import Course
from app.database import Base, engine

class TestCourseModel:
    """Unit tests for Course model"""
    
    @classmethod
    def setup_class(cls):
        """Setup test database"""
        Base.metadata.create_all(bind=engine)
    
    def test_course_creation(self):
        """Test creating a course instance"""
        course = Course(
            title="Python Programming",
            instructor="John Doe",
            category="Programming",
            level="Beginner",
            duration="40 hours",
            students=0,
            rating=0.0,
            price=49.99,
            description="Learn Python from scratch"
        )
        
        assert course.title == "Python Programming"
        assert course.instructor == "John Doe"
        assert course.category == "Programming"
        assert course.level == "Beginner"
        assert course.price == 49.99
    
    def test_course_default_values(self):
        """Test course default values"""
        course = Course(
            title="Test Course",
            instructor="Test Instructor",
            category="Test",
            level="Beginner",
            duration="10 hours",
            price=29.99,
            description="Test description"
        )
        
        # Check default values
        assert course.students == 0
        assert course.rating == 0.0