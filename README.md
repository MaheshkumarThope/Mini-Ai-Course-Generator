# Mini-AI Course Generator

The **Mini-AI Course Generator** is a full-stack application designed to automate the creation of educational content. By integrating with OpenAI's API, it generates structured course outlines and detailed content based on user-provided topics.

## 🏗 Project Architecture

The project is structured as a decoupled full-stack application:

* **Backend**: A Java Spring Boot application that acts as the orchestration layer for AI prompts and business logic.
* **Frontend**: An Angular 18 web application providing a modern, responsive user interface.



---

## 🚀 Getting Started

### Prerequisites
* **Java**: JDK 17 or higher.
* **Maven**: 3.9.x for backend builds.
* **Node.js**: v18.x or higher for the frontend.
* **OpenAI API Key**: A valid key for course generation.

### Backend Setup
1.  Navigate to the `Backend` directory.
2.  Set your OpenAI API Key as an environment variable:
    ```bash
    export OPENAI_API_KEY='your_api_key_here'
    ```
3.  Install dependencies and build the project:
    ```bash
    mvn clean install
    ```
4.  Run the application:
    ```bash
    mvn spring-boot:run
    ```

### Frontend Setup
1.  Navigate to `Frontend/ai-course-generator`.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    ng serve
    ```
4.  Open your browser to `http://localhost:4200`.

---

## 📁 Directory Structure

```text
Mini-AI Course Generator/
├── Backend/                 # Spring Boot Source Code
│   ├── src/                 # Java source and resources
│   ├── pom.xml              # Maven configuration
│   └── documents/           # Project assets
├── Frontend/                # Angular Source Code
│   └── ai-course-generator/ # Angular workspace
│       ├── src/             # UI Components & Services
│       ├── package.json     # Node dependencies
│       └── angular.json     # Angular configuration
└── .git/                    # Version control history
