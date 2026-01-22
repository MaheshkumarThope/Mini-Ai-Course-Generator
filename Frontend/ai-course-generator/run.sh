#!/bin/bash
# Script to start the Mini-AI Course Generator Frontend

echo "=========================================="
echo "Mini-AI Course Generator - Frontend Startup"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found. Please run this from the Frontend/ai-course-generator directory."
    exit 1
fi

echo "Step 1: Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "Error: npm install failed!"
    exit 1
fi

echo ""
echo "Step 2: Starting the Angular Development Server..."
echo "Frontend will be available at http://localhost:4200"
npm start

echo ""
echo "Frontend is now running!"
