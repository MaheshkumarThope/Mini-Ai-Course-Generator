package org.example.controller;

import org.example.service.DocumentService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping("/upload")
    public String uploadDocument(@RequestParam("file") MultipartFile file) throws IOException {
        documentService.ingestPdf(file.getInputStream());
        return "{\"message\": \"Document uploaded and processed successfully\", \"filename\": \"" + file.getOriginalFilename() + "\"}";
    }

    @PostMapping("/upload-resume")
    public String uploadResume(@RequestParam("file") MultipartFile file) throws IOException {
        documentService.ingestPdf(file.getInputStream());
        return "{\"message\": \"Resume uploaded and processed successfully\", \"filename\": \"" + file.getOriginalFilename() + "\"}";
    }
}
