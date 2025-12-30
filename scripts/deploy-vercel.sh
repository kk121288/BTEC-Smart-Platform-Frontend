#!/bin/bash

# BTEC Smart Platform - Vercel Deployment Script
# Usage: ./scripts/deploy-vercel.sh [production|preview]

set -e

ENVIRONMENT=${1:-preview}

echo "🚀 Starting Vercel deployment..."
echo "📦 Environment: $ENVIRONMENT"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

# Install dependencies
echo "📥 Installing dependencies..."
npm ci

# Run tests
echo "🧪 Running tests..."
npm run lint
npm run build

# Deploy
if [ "$ENVIRONMENT" = "production" ]; then
    echo "🌐 Deploying to production..."
    vercel --prod --yes
else
    echo "🔍 Deploying preview..."
    vercel --yes
fi

echo "✅ Deployment complete!"
