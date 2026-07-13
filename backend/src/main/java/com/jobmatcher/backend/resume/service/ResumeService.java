package com.jobmatcher.backend.resume.service;

import com.jobmatcher.backend.resume.dto.ResumeResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ResumeService {

    ResumeResponse uploadResume(
            MultipartFile file) throws Exception;

}