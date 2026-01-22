// Example detailed course structures for testing and documentation
import { IDetailedCourse } from './document-upload';

export const EXAMPLE_COURSES: IDetailedCourse[] = [
  {
    courseTitle: "Advanced React & TypeScript Mastery",
    courseDescription: "Comprehensive course covering modern React patterns, TypeScript type systems, and production-ready application development with hooks and state management.",
    learningObjectives: [
      "Master React hooks and custom hook patterns",
      "Build strongly-typed React applications with TypeScript",
      "Implement state management with Redux and Zustand",
      "Create performance-optimized components",
      "Build real-world full-stack applications"
    ],
    prerequisites: [
      "Basic JavaScript knowledge",
      "Understanding of React fundamentals",
      "Familiarity with HTML and CSS"
    ],
    estimatedDuration: "8 weeks (40 hours)",
    modules: [
      {
        moduleNumber: 1,
        moduleTitle: "React Fundamentals Deep Dive",
        moduleDescription: "Explore advanced React concepts including component lifecycle, hooks ecosystem, and optimization techniques.",
        topics: [
          "React Hooks: useState, useEffect, useContext, useReducer",
          "Custom Hooks development and patterns",
          "Component optimization and memoization",
          "Error boundaries and error handling",
          "React performance profiling tools"
        ]
      },
      {
        moduleNumber: 2,
        moduleTitle: "TypeScript for React Development",
        moduleDescription: "Master TypeScript type system and apply it effectively in React applications for better type safety and developer experience.",
        topics: [
          "TypeScript basics and type inference",
          "Generics and advanced type patterns",
          "React component typing patterns",
          "Managing complex type hierarchies",
          "Utility types for React development"
        ]
      },
      {
        moduleNumber: 3,
        moduleTitle: "State Management Architectures",
        moduleDescription: "Learn different state management solutions and when to apply each for optimal application scalability.",
        topics: [
          "Context API and useReducer patterns",
          "Redux fundamentals and best practices",
          "Modern alternatives: Zustand and Jotai",
          "Async state management",
          "DevTools and debugging state"
        ]
      },
      {
        moduleNumber: 4,
        moduleTitle: "Advanced Patterns & Testing",
        moduleDescription: "Learn production-ready patterns, testing strategies, and best practices for enterprise applications.",
        topics: [
          "Higher-order components and render props",
          "Compound components pattern",
          "Unit testing with Jest and React Testing Library",
          "Integration and E2E testing",
          "Performance monitoring and optimization"
        ]
      }
    ],
    keySkillsGained: [
      "React Hooks",
      "TypeScript",
      "State Management",
      "Performance Optimization",
      "Testing Strategies",
      "Application Architecture"
    ]
  },
  {
    courseTitle: "Full-Stack Cloud Development with AWS",
    courseDescription: "Build scalable cloud applications using AWS services including EC2, Lambda, DynamoDB, and API Gateway with modern DevOps practices.",
    learningObjectives: [
      "Design and deploy AWS infrastructure",
      "Build serverless applications with Lambda",
      "Create NoSQL databases with DynamoDB",
      "Implement CI/CD pipelines",
      "Monitor and scale applications"
    ],
    prerequisites: [
      "Basic programming knowledge",
      "Understanding of web architecture",
      "Linux/terminal familiarity"
    ],
    estimatedDuration: "10 weeks (50 hours)",
    modules: [
      {
        moduleNumber: 1,
        moduleTitle: "AWS Core Services",
        moduleDescription: "Get hands-on with fundamental AWS services and cloud concepts.",
        topics: [
          "AWS account setup and IAM",
          "EC2 instances and auto-scaling",
          "S3 storage and CloudFront",
          "VPC networking fundamentals",
          "Security best practices"
        ]
      },
      {
        moduleNumber: 2,
        moduleTitle: "Serverless Architecture",
        moduleDescription: "Build event-driven applications using AWS Lambda and related services.",
        topics: [
          "Lambda functions and triggers",
          "API Gateway for REST APIs",
          "SNS and SQS messaging",
          "CloudWatch monitoring",
          "Cost optimization strategies"
        ]
      },
      {
        moduleNumber: 3,
        moduleTitle: "Databases and Data",
        moduleDescription: "Store and manage data at scale using AWS database services.",
        topics: [
          "DynamoDB design patterns",
          "RDS relational databases",
          "ElastiCache for caching",
          "Data migration strategies",
          "Backup and disaster recovery"
        ]
      }
    ],
    keySkillsGained: [
      "AWS Services",
      "Serverless Architecture",
      "Cloud DevOps",
      "Infrastructure as Code",
      "Database Design",
      "Cloud Security"
    ]
  }
];

// Helper function to add example course to component
export function addExampleCourse(componentInstance: any, courseIndex: number = 0): void {
  if (courseIndex >= 0 && courseIndex < EXAMPLE_COURSES.length) {
    componentInstance.addDetailedCourse(EXAMPLE_COURSES[courseIndex]);
  }
}

// Helper to add all example courses
export function addAllExampleCourses(componentInstance: any): void {
  EXAMPLE_COURSES.forEach(course => componentInstance.addDetailedCourse(course));
}
