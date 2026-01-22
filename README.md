# Mini-AI Course Generator

The **Mini-AI Course Generator** is a full-stack application designed to automate the creation of educational course content using Artificial Intelligence. It features a robust Spring Boot backend for logic and AI interaction, paired with a modern Angular frontend for a seamless user experience.

## 🚀 Features

- **AI-Powered Curriculum Generation:** Automatically generates course outlines, detailed lessons, and educational modules based on user-defined topics.
- **Modular Architecture:** Clear separation between the backend (API) and frontend (UI) for scalability and ease of maintenance.
- **Document Management:** Support for storing and organizing generated educational content.
- **Modern UI:** A responsive dashboard built with Angular for managing and reviewing courses.

---

## 🛠️ Project Structure

The repository is organized into two main modules:

```text
Mini-AI Course Generator/
├── Backend/                 # Spring Boot (Java) Application
│   ├── src/                 # Core business logic and AI integration
│   ├── documents/           # Stored generated course materials
│   └── pom.xml             # Backend dependencies (Maven)
├── Frontend/                # Angular (TypeScript) Application
│   ├── ai-course-generator/ # Main Angular project source
│   ├── src/                 # UI components and services
│   └── package.json        # Frontend dependencies
└── .git/                    # Version control metadata
