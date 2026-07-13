package com.jobmatcher.backend.resume.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ResumeStorageService {

    String store(
            MultipartFile file)
            throws IOException;

}