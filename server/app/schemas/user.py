from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str
    name: str

class UserResponse(BaseModel):
    id: int
    email: str
    name: str

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(LoginRequest):
    name: str

class AuthResponse(BaseModel):
    user: UserResponse
    token: str
