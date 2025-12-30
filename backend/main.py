from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

app = FastAPI(title="BTEC Smart Platform API")

# CORS Configuration
origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint (required by Render)
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "BTEC Smart Platform API"}

# Your existing endpoints...
class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/token")
async def login(credentials: LoginRequest):
    return {
        "access_token": "test_token_123",
        "token_type": "bearer",
        "user": {
            "id": 1,
            "email": credentials.username,
            "name": "Test User",
            "role": "teacher"
        }
    }
