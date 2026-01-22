# Mini-Ai-Course-Generator
The Mini-AI Course Generator is a full-stack application designed to automate the creation of educational course content using Artificial Intelligence. It features a robust backend for logic and AI interaction and a modern, responsive frontend for user interaction.

🚀 Features
AI-Powered Curriculum Generation: Automatically generates course outlines, detailed lessons, and educational modules based on user-defined topics.

Modular Architecture: A clear separation between the backend (logic/AI) and frontend (UI) ensures scalability and ease of maintenance.

Automated Project Setup: Includes pre-configured build scripts and environment management tools for rapid development.

Modern UI/UX: A streamlined interface for managing and reviewing generated course materials.

🛠️ Project Structure
The repository is organized into two main components:

Plaintext

Mini-AI Course Generator/
├── Backend/                 # Spring Boot (Java) Backend Application
│   ├── src/                 # Core business logic and AI integration
│   ├── apache-maven-3.9.12/ # Local Maven installation for build consistency
│   └── pom.xml             # Backend dependency management
├── Frontend/                # Angular Frontend Application
│   ├── ai-course-generator/ # Main Angular project source
│   ├── node_modules/        # Frontend dependencies
│   └── package.json        # Frontend project configuration
└── .git/                    # Version control history
⚙️ Setup & Installation
Prerequisites
Java 17+ and Maven (included in project)

Node.js and npm

OpenAI API Key (or similar supported LLM provider)

Backend Configuration
Navigate to the backend directory:

Bash

cd Backend
Set your environment variable for the AI service:

Bash

# Example for OpenAI
export OPENAI_API_KEY='your_api_key_here'
Build and run the application using the provided Maven binary:

Bash

./apache-maven-3.9.12-bin/bin/mvn spring-boot:run
Frontend Configuration
Navigate to the frontend project:

Bash

cd Frontend/ai-course-generator
Install required dependencies:

Bash

npm install
Start the development server:

Bash

npm start
The UI will be accessible at http://localhost:4200/.

📖 Usage
Launch both the Backend and Frontend applications.

Enter a specific topic or learning objective into the generator dashboard.

The AI will process the request and provide a structured course curriculum.

View, edit, or export the generated lessons for use in educational platforms.

🧪 Tech Stack
Backend: Java, Spring Boot, Maven

Frontend: Angular, TypeScript, CSS/SCSS

AI Engine: OpenAI API (configurable via environment variables)
