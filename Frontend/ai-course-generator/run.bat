@echo off
REM Script to start the Mini-AI Course Generator Frontend

echo.
echo ==========================================
echo Mini-AI Course Generator - Frontend Startup
echo ==========================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo Error: package.json not found. Please run this from the Frontend/ai-course-generator directory.
    exit /b 1
)

echo Step 1: Installing dependencies...
call npm install

if errorlevel 1 (
    echo Error: npm install failed!
    exit /b 1
)

echo.
echo Step 2: Starting the Angular Development Server...
echo Frontend will be available at http://localhost:4200
echo.
call npm start

echo.
echo Frontend startup complete!
pause
