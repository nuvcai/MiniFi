#!/bin/bash
# MiniFi Backend Deployment Script (Render)
# 
# NOTE: Render deployment is done via:
# 1. Dashboard: render.com → New → Web Service → Connect repo
# 2. Or via render.yaml (Blueprint) in project root
#
# This script is for local testing only.

set -e

echo "🚀 MiniFi Backend - Local Testing"
echo "=================================="
echo ""

# Navigate to backend directory
cd "$(dirname "$0")/backend"

echo "📁 Current directory: $(pwd)"
echo ""

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv .venv
fi

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source .venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Start the server
echo ""
echo "🚀 Starting FastAPI server..."
echo "🌐 API: http://localhost:8000"
echo "📚 Docs: http://localhost:8000/docs"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 To deploy to Render:"
echo "   1. Go to render.com"
echo "   2. New → Web Service"
echo "   3. Connect your repo"
echo "   4. Root Directory: backend"
echo "   5. Add OPENAI_API_KEY in Environment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

