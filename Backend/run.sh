#!/bin/bash
# Script to start the Mini-AI Course Generator application

echo "=========================================="
echo "Mini-AI Course Generator - Startup Guide"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "pom.xml" ]; then
    echo "Error: pom.xml not found. Please run this from the Backend directory."
    exit 1
fi

echo "Step 1: Building the Backend..."
mvn clean install

if [ $? -ne 0 ]; then
    echo "Error: Maven build failed!"
    exit 1
fi

echo ""
echo "Step 2: Starting the Spring Boot Backend..."
mvn spring-boot:run

echo ""
echo "Backend is now running on http://localhost:8080"
echo "APIs available at http://localhost:8080/api/courses and http://localhost:8080/api/documents"
