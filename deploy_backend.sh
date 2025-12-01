#!/bin/bash
# MiniFi Backend Deployment Script
# Run this in your terminal: ./deploy_backend.sh

set -e

echo "🚀 MiniFi Backend Deployment"
echo "============================"
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Navigate to backend directory
cd "$(dirname "$0")/backend"

echo "📁 Current directory: $(pwd)"
echo ""

# Login to Railway
echo "🔐 Logging into Railway..."
echo "   (A browser window will open for authentication)"
railway login

# Initialize project if not already
echo ""
echo "🏗️  Initializing Railway project..."
railway init --name minifi-backend

# Set environment variables
echo ""
echo "🔑 Setting environment variables..."
echo "   Enter your OpenAI API Key when prompted:"
read -p "   OPENAI_API_KEY: " OPENAI_KEY
railway variables set OPENAI_API_KEY="$OPENAI_KEY"

# Deploy
echo ""
echo "🚀 Deploying to Railway..."
railway up

# Get the deployment URL
echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Your backend URL:"
railway open

echo ""
echo "🔗 Copy your backend URL and use it in the frontend deployment!"
echo "   Example: https://minifi-backend-production.up.railway.app"
echo ""

