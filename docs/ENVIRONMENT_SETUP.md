# Environment Setup Guide

## Frontend Environment Variables

### Development (.env.development)

```env
VITE_API_URL=http://localhost:8000
VITE_API_TIMEOUT=10000
VITE_ENABLE_ERROR_LOGGING=true
VITE_SECURE_COOKIES=false
VITE_ENVIRONMENT=development
```

### Production (.env.production)

```env
VITE_API_URL=https://btec-backend.onrender.com
VITE_API_TIMEOUT=30000
VITE_ENABLE_ERROR_LOGGING=false
VITE_SECURE_COOKIES=true
VITE_ENVIRONMENT=production
```

---

## Setup Steps

### 1. Local Development

```bash
# Copy example file
cp .env.production.example .env.development

# Edit with your local backend URL
nano .env.development

# Start development server
npm run dev
```

### 2. Production Deployment (Vercel)

**Option A: Vercel Dashboard**
1. Go to Project Settings → Environment Variables
2. Add each variable from `.env.production.example`
3. Redeploy

**Option B: Vercel CLI**
```bash
vercel env add VITE_API_URL production
# Enter: https://btec-backend.onrender.com

vercel env add VITE_SECURE_COOKIES production
# Enter: true
```

---

## Variable Descriptions

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000` |
| `VITE_API_TIMEOUT` | Request timeout (ms) | `10000` |
| `VITE_ENABLE_ERROR_LOGGING` | Log errors to console | `true` / `false` |
| `VITE_SECURE_COOKIES` | Use secure cookies | `true` in production |
| `VITE_ENVIRONMENT` | Current environment | `development` / `production` |

---

## Security Notes

- ✅ Never commit `.env.development` or `.env.production` to Git
- ✅ Use `.env.*.example` files as templates
- ✅ Rotate secrets regularly
- ✅ Enable secure cookies in production
