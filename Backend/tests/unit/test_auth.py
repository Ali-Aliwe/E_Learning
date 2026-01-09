import pytest
from app.routes.auth import hash_password, verify_password

class TestAuthentication:
    """Unit tests for authentication functions"""
    
    def test_password_hashing(self):
        """Test that password hashing works correctly"""
        password = "TestPassword123!"
        hashed = hash_password(password)
        
        # Assert hash is not the same as original password
        assert hashed != password
        
        # Assert hash is not empty
        assert len(hashed) > 0
        
        # Assert hash starts with bcrypt identifier
        assert hashed.startswith("$2b$")
    
    def test_password_verification_success(self):
        """Test that correct password verification succeeds"""
        password = "MySecurePassword456"
        hashed = hash_password(password)
        
        # Verify correct password
        assert verify_password(password, hashed) == True
    
    def test_password_verification_failure(self):
        """Test that incorrect password verification fails"""
        password = "CorrectPassword"
        wrong_password = "WrongPassword"
        hashed = hash_password(password)
        
        # Verify wrong password fails
        assert verify_password(wrong_password, hashed) == False