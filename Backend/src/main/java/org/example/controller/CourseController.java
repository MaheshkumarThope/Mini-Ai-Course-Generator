package org.example.controller;

import org.example.service.CourseAssistant;
import org.example.service.DocumentService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final DocumentService documentService;
    private final CourseAssistant courseAssistant;

    public CourseController(DocumentService documentService, CourseAssistant courseAssistant) {
        this.documentService = documentService;
        this.courseAssistant = courseAssistant;
    }

    // --- FIX 1: Make sure this says "/upload", NOT "/generate" ---
    @PostMapping("/upload")
    public String uploadPdf(@RequestParam("file") MultipartFile file) throws IOException {
        documentService.ingestPdf(file.getInputStream());
        return "PDF uploaded and processed. You can now ask questions!";
    }

    // --- FIX 2: This one keeps "/generate" (and use GetMapping for browser testing) ---
    @GetMapping("/generate")
    public String generateCourse(@RequestParam String topic) {
        return courseAssistant.generateCourse("Create a course about: " + topic);
    }

    @GetMapping
    public String getAllCourses() {
        return "[]";
    }

    @GetMapping("/{id}")
    public String getCourseById(@PathVariable String id) {
        return "{}";
    }

    @PostMapping("/recommend")
    public String getRecommendedCourses(@RequestBody Map<String, String> request) {
        String prompt = request.get("prompt");
        
        System.out.println("=== RECOMMEND ENDPOINT CALLED ===");
        System.out.println("Prompt received: " + (prompt != null ? "YES, length: " + prompt.length() : "NO"));
        
        if (prompt == null || prompt.trim().isEmpty()) {
            System.out.println("Prompt is empty, returning error response");
            return "{\"courses\": [], \"summary\": \"Please provide a prompt for recommendations.\"}";
        }
        
        System.out.println("Processing recommendation request...");
        System.out.println("Prompt: " + prompt.substring(0, Math.min(100, prompt.length())));
        
        try {
            System.out.println("Calling courseAssistant.generateCourse()...");
            String courseRecommendations = courseAssistant.generateCourse(prompt);
            System.out.println("Course recommendations generated, length: " + courseRecommendations.length());
            System.out.println("Preview: " + courseRecommendations.substring(0, Math.min(200, courseRecommendations.length())));
            
            // Format the response as proper JSON
            String escapedDescription = escapeJsonString(courseRecommendations);
            String jsonResponse = "{" +
                "\"courses\": [" +
                "{\"title\": \"AI-Generated Course Recommendations\", " +
                "\"description\": \"" + escapedDescription + "\", " +
                "\"level\": \"Mixed\", " +
                "\"duration\": \"Varies\"}], " +
                "\"summary\": \"Based on your resume and profile, here are targeted courses to boost your career prospects and job opportunities.\"" +
                "}";
            
            System.out.println("Final JSON response length: " + jsonResponse.length());
            System.out.println("Returning response to frontend");
            return jsonResponse;
        } catch (Exception e) {
            System.out.println("Error generating recommendations: " + e.getMessage());
            e.printStackTrace();
            return "{\"courses\": [], \"summary\": \"Error generating recommendations. Please try again.\"}";
        }
    }
    
    private String escapeJsonString(String input) {
        if (input == null) {
            return "";
        }
        return input
                .replace("\\", "\\\\")  // Backslash must be first
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t")
                .replace("\b", "\\b")
                .replace("\f", "\\f");
    }

    @PostMapping
    public String createCourse(@RequestBody String course) {
        return "{}";
    }
}