#!/bin/bash

# Environment Setup Script for Vercel

echo "🔧 Setting up Vercel environment variables..."

# Prompt for backend URL
read -p "Enter your FastAPI backend URL (e.g., https://btec-backend.onrender.com): " BACKEND_URL

# Set environment variables in Vercel
vercel env add VITE_API_URL production <<< "$BACKEND_URL"
vercel env add VITE_API_TIMEOUT production <<< "30000"
vercel env add VITE_ENABLE_ERROR_LOGGING production <<< "false"
vercel env add VITE_SECURE_COOKIES production <<< "true"
vercel env add VITE_ENVIRONMENT production <<< "production"

echo "✅ Environment variables configured!"
echo "📝 Backend URL: $BACKEND_URL"
echo ""
echo "Next steps:"
echo "1. Run: npm run build"
echo "2. Run: vercel --prod"
