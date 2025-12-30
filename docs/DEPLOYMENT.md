# Deployment Guide

Complete guide for deploying BTEC Smart Platform to production.

---

## 🌐 Frontend Deployment (Vercel)

### Prerequisites

1. Vercel account: https://vercel.com/signup
2. Vercel CLI installed: `npm i -g vercel`
3. Backend API URL ready

### Step-by-Step Deployment

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login to Vercel

```bash
vercel login
```

#### 3. Link Project

```bash
vercel link
# Follow prompts to link to your Vercel account
```

#### 4. Configure Environment Variables

```bash
# Set production environment variables
vercel env add VITE_API_URL production
# Enter: https://your-backend.onrender.com

vercel env add VITE_SECURE_COOKIES production
# Enter: true

vercel env add VITE_API_TIMEOUT production
# Enter: 30000
```

Or use the automated script:

```bash
chmod +x scripts/setup-env.sh
./scripts/setup-env.sh
```

#### 5. Deploy

**Preview deployment:**
```bash
vercel
```

**Production deployment:**
```bash
vercel --prod
```

Or use the deployment script:
```bash
chmod +x scripts/deploy-vercel.sh
./scripts/deploy-vercel.sh production
```

---

## 🔧 Backend Deployment (Render)

### Prerequisites

1. Render account: https://render.com/signup
2. GitHub repository connected
3. PostgreSQL database (optional)

### Step-by-Step Deployment

#### 1. Create New Web Service

1. Go to https://dashboard.render.com
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Select the backend repository

#### 2. Configure Service

- **Name:** `btec-backend`
- **Runtime:** Python 3
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Plan:** Free

#### 3. Add Environment Variables

| Variable | Value |
|----------|-------|
| `ENVIRONMENT` | `production` |
| `SECRET_KEY` | (auto-generated) |
| `ALGORITHM` | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `30` |
| `FRONTEND_URL` | `https://your-app.vercel.app` |
| `CORS_ORIGINS` | `https://your-app.vercel.app,http://localhost:5173` |

#### 4. Create Database (Optional)

1. Click "New" → "PostgreSQL"
2. Name: `btec-db`
3. Plan: Free
4. Link to web service

#### 5. Deploy

- Auto-deploys on every push to `master`
- Manual deploy: Click "Manual Deploy" → "Deploy latest commit"

#### 6. Get Backend URL

After deployment, copy the URL:
```
https://btec-backend.onrender.com
```

Use this URL in frontend environment variables.

---

## 🔄 CI/CD Setup

### GitHub Actions Configuration

#### 1. Add Secrets to GitHub

Go to repository Settings → Secrets and variables → Actions:

| Secret | Description | How to get |
|--------|-------------|------------|
| `VERCEL_TOKEN` | Vercel auth token | https://vercel.com/account/tokens |
| `VERCEL_ORG_ID` | Organization ID | Run `vercel link` locally |
| `VERCEL_PROJECT_ID` | Project ID | Run `vercel link` locally |
| `VITE_API_URL` | Backend URL | From Render deployment |

#### 2. Get Vercel IDs

```bash
vercel link
# Follow prompts, then check .vercel/project.json

cat .vercel/project.json
# Copy projectId and orgId
```

#### 3. Workflows are ready!

The workflows in `.github/workflows/` will automatically:
- ✅ Lint on every PR
- ✅ Build on every push
- ✅ Deploy to Vercel on push to master

---

## ✅ Production Checklist

### Pre-Deployment

- [ ] All environment variables configured
- [ ] Backend CORS includes frontend URL
- [ ] Database migrations completed
- [ ] Build completes without errors
- [ ] All tests passing

### Post-Deployment

- [ ] Frontend loads correctly
- [ ] Login functionality works
- [ ] API requests successful
- [ ] HTTPS enabled
- [ ] No console errors
- [ ] Performance acceptable

---

## 🐛 Troubleshooting

### Issue: "Failed to fetch" error

**Solution:** Check CORS configuration in backend

```python
# backend/main.py
origins = [
    "https://your-app.vercel.app",  # ✅ Add your actual domain
]
```

### Issue: Environment variables not loading

**Solution:** Verify variable names start with `VITE_`

```bash
# ✅ Correct
VITE_API_URL=...

# ❌ Incorrect
API_URL=...
```

### Issue: Build fails on Vercel

**Solution:** Check build logs and ensure all dependencies in `package.json`

```bash
# Locally test production build
npm run build
```

### Issue: Backend sleeping on Render (Free plan)

**Solution:** Free tier sleeps after 15 mins of inactivity. Upgrade to paid plan or accept cold starts.

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)

---

## 🆘 Support

If you encounter issues:
1. Check logs in Vercel/Render dashboards
2. Review environment variables
3. Test locally first
4. Check CORS configuration

**Deployment URL Examples:**
- Frontend: `https://btec-smart-platform.vercel.app`
- Backend: `https://btec-backend.onrender.com`
