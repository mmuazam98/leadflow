import pytest
from datetime import timedelta
from jose import jwt
from fastapi import HTTPException
from app.utils.auth import (
    verify_password, get_password_hash,
    create_access_token, decode_access_token,
    ALGORITHM, JWT_SECRET_KEY
)


def test_password_hashing():
    password = "securepassword"
    hashed_password = get_password_hash(password)
    assert hashed_password != password  # Ensure it's hashed
    assert verify_password(password, hashed_password)  # Should return True
    assert not verify_password(
        "wrongpassword", hashed_password)  # Should return False


def test_create_access_token():
    data = {"sub": "testuser"}
    token = create_access_token(data, expires_delta=timedelta(minutes=5))
    assert isinstance(token, str)

    decoded_data = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
    assert decoded_data["sub"] == "testuser"


def test_access_token_expiry():
    data = {"sub": "testuser"}
    token = create_access_token(
        data, expires_delta=timedelta(seconds=-1))  # Already expired

    with pytest.raises(HTTPException) as exc_info:
        decode_access_token(token)
    assert exc_info.value.status_code == 401
    assert "Token expired" in exc_info.value.detail


def test_invalid_access_token():
    invalid_token = "invalid.token.string"

    with pytest.raises(HTTPException) as exc_info:
        decode_access_token(invalid_token)
    assert exc_info.value.status_code == 401
    assert "Invalid token" in exc_info.value.detail
