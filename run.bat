@echo off
REM Combined script to start both Mini-AI Course Generator Backend and Frontend

echo.
echo ============================================================
echo     Mini-AI Course Generator - Full Stack Startup
echo ============================================================
echo.
echo This script will start both the Backend and Frontend servers.
echo.
echo Backend will be available at:  http://localhost:8080
echo Frontend will be available at: http://localhost:4200
echo.
echo ============================================================
echo.

REM Check if we're in the right directory
if not exist "Backend\pom.xml" (
    echo Error: Backend/pom.xml not found. Please run this from the root directory.
    pause
    exit /b 1
)

if not exist "Frontend\ai-course-generator\package.json" (
    echo Error: Frontend/ai-course-generator/package.json not found. Please run this from the root directory.
    pause
    exit /b 1
)

echo.
echo ============================================================
echo Step 1: Starting the Backend (Spring Boot)
echo ============================================================
echo.

REM Start backend in a new window
cd Backend
start "Mini-AI Backend" cmd /k "call .\apache-maven-3.9.12-bin\apache-maven-3.9.12\bin\mvn.cmd spring-boot:run"

REM Wait a few seconds for backend to start
timeout /t 5 /nobreak

cd ..

echo.
echo ============================================================
echo Step 2: Starting the Frontend (Angular)
echo ============================================================
echo.

REM Start frontend in a new window
cd Frontend\ai-course-generator
start "Mini-AI Frontend" cmd /k "call npm start"

cd ..\..

echo.
echo ============================================================
echo Both servers are starting up!
echo ============================================================
echo.
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:4200
echo.
echo Note: Both servers are running in separate windows.
echo To stop the servers, close their respective windows.
echo.
pause
