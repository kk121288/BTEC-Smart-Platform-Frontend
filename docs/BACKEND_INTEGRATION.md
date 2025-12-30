# Backend Integration Guide

## Overview

This document explains how to configure the FastAPI backend to work with the React frontend.

---

## CORS Configuration

The backend must allow requests from the frontend domain. Add this to your FastAPI `main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="BTEC Smart Platform API")

# CORS Configuration
origins = [
    "http://localhost:5173",        # Vite dev server
    "http://localhost:3000",        # Alternative dev port
    "https://your-app.vercel.app",  # Production frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Required Endpoints

### Authentication

| Method | Endpoint | Request Body | Response |
|--------|----------|--------------|----------|
| POST | `/token` | `{ username, password }` | `{ access_token, token_type, user }` |
| POST | `/register` | `{ email, password, name }` | `{ id, email, name, role }` |
| POST | `/logout` | - | `{ message }` |
| GET | `/users/me` | - | `{ id, email, name, role }` |

### Plagiarism

| Method | Endpoint | Request Body | Response |
|--------|----------|--------------|----------|
| POST | `/api/plagiarism/check` | `{ assignment_id, content }` | `{ id, similarity_score, sources, ... }` |
| GET | `/api/plagiarism/history` | Query: `assignment_id` | Array of plagiarism reports |

---

## Environment Variables (Backend)

Create `.env` in your backend root:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost/btec_db

# JWT Configuration
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
FRONTEND_URL=http://localhost:5173

# Environment
ENVIRONMENT=development
```

---

## Testing the Connection

1. Start the backend:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

2. Start the frontend:
   ```bash
   npm run dev
   ```

3. Test login at `http://localhost:5173/login`

4. Check browser console for API requests

---

## Common Issues

### Issue: CORS Error

**Solution:** Ensure frontend URL is in `allow_origins` list

### Issue: 401 Unauthorized

**Solution:** Check JWT token format and expiration

### Issue: Network Error

**Solution:** Verify backend is running on correct port (8000)

---

## Production Deployment

1. Update `VITE_API_URL` in `.env.production`
2. Update `allow_origins` in backend to include production domain
3. Enable HTTPS for secure cookies
4. Set `VITE_SECURE_COOKIES=true`
