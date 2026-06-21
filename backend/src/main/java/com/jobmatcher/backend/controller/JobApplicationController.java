package com.jobmatcher.backend.controller;

import com.jobmatcher.backend.entity.JobApplication;
import com.jobmatcher.backend.service.JobApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/applications")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    @PostMapping("/apply")
    public ResponseEntity<JobApplication> applyForJob(@RequestParam Long userId, @RequestParam Long jobId) throws Exception {
        return ResponseEntity.ok(jobApplicationService.applyForJob(userId, jobId));
    }
}