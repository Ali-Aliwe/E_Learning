import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database import Base, get_db

# Create test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
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

class TestAuthenticationFlow:
    """Integration tests for authentication flow"""
    
    @classmethod
    def setup_class(cls):
        """Setup test database"""
        Base.metadata.create_all(bind=engine)
    
    @classmethod
    def teardown_class(cls):
        """Clean up test database"""
        Base.metadata.drop_all(bind=engine)
    
    def test_user_registration_and_login(self):
        """Test complete user registration and login flow"""
        # Step 1: Register a new user
        registration_data = {
            "name": "Test User",
            "email": "testuser@example.com",
            "password": "TestPassword123"
        }
        
        register_response = client.post("/api/auth/register", json=registration_data)
        assert register_response.status_code == 200
        register_json = register_response.json()
        assert register_json["email"] == "testuser@example.com"
        assert register_json["name"] == "Test User"
        assert "id" in register_json
        
        # Step 2: Login with registered credentials
        login_data = {
            "email": "testuser@example.com",
            "password": "TestPassword123"
        }
        
        login_response = client.post("/api/auth/login", json=login_data)
        assert login_response.status_code == 200
        login_json = login_response.json()
        assert login_json["email"] == "testuser@example.com"
        assert login_json["message"] == "Login successful"
    
    def test_duplicate_registration_fails(self):
        """Test that registering with existing email fails"""
        # First registration
        user_data = {
            "name": "Duplicate User",
            "email": "duplicate@example.com",
            "password": "Password123"
        }
        
        first_response = client.post("/api/auth/register", json=user_data)
        assert first_response.status_code == 200
        
        # Attempt duplicate registration
        second_response = client.post("/api/auth/register", json=user_data)
        assert second_response.status_code == 400
        assert "already registered" in second_response.json()["detail"].lower()