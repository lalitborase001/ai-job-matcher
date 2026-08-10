package com.jobmatcher.backend.resume.controller;

import com.jobmatcher.backend.resume.dto.ResumeResponse;
import com.jobmatcher.backend.resume.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<ResumeResponse> uploadResume(
            @RequestParam("file") MultipartFile file)
            throws Exception {

        return ResponseEntity.ok(
                resumeService.uploadResume(file)
        );
    }

    @GetMapping
    public ResponseEntity<List<ResumeResponse>> getUserResumes() throws Exception{
        return ResponseEntity.ok(
                resumeService.getAllResumesForUser()
        );
    }

}