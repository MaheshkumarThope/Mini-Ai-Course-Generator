@echo off
REM Script to start the Mini-AI Course Generator Backend

echo.
echo ==========================================
echo Mini-AI Course Generator - Backend Startup
echo ==========================================
echo.

REM Check if we're in the right directory
if not exist "pom.xml" (
    echo Error: pom.xml not found. Please run this from the Backend directory.
    exit /b 1
)

echo Step 1: Building the Backend...
call .\apache-maven-3.9.12-bin\apache-maven-3.9.12\bin\mvn.cmd clean install

if errorlevel 1 (
    echo Error: Maven build failed!
    exit /b 1
)

echo.
echo Step 2: Starting the Spring Boot Backend...
echo Backend will start on http://localhost:8080
echo.
call .\apache-maven-3.9.12-bin\apache-maven-3.9.12\bin\mvn.cmd spring-boot:run

echo.
echo Backend startup complete!
pause
