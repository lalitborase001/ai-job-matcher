package com.jobmatcher.backend.resume.util;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ResumeValidator {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

    public void validate(MultipartFile file) {

        if (file.isEmpty()) {
            throw new RuntimeException("Resume file cannot be empty.");
        }

        if (!file.getOriginalFilename().toLowerCase().endsWith(".pdf")) {
            throw new RuntimeException("Only PDF files are allowed.");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new RuntimeException("Maximum file size is 5 MB.");
        }
    }
}