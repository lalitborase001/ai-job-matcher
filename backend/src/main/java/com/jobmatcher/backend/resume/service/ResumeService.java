package com.jobmatcher.backend.resume.service;

import com.jobmatcher.backend.resume.dto.ResumeResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ResumeService {

    ResumeResponse uploadResume(
            MultipartFile file) throws Exception;

    List<ResumeResponse> getAllResumesForUser() throws Exception;

}