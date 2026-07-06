package com.jobmatcher.backend.controller;

import com.jobmatcher.backend.entity.JobApplication;
import com.jobmatcher.backend.service.JobApplicationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/applications")
@Tag(name = "Application API", description = "Operations related to Application")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    @PostMapping("/apply")
    public ResponseEntity<JobApplication> applyForJob(@RequestParam Long userId, @RequestParam Long jobId) throws Exception {
        return ResponseEntity.status(HttpStatus.CREATED).body(jobApplicationService.applyForJob(userId, jobId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<JobApplication>> getApplicationsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(jobApplicationService.getApplicationsByUser(userId));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<JobApplication>> getApplicationsByJob(@PathVariable Long jobId) {
        return ResponseEntity.ok(jobApplicationService.getApplicationsByJob(jobId));
    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<JobApplication> updateStatus(@PathVariable Long applicationId, @RequestParam String status)
            throws Exception {
        return ResponseEntity.ok(jobApplicationService.updateStatus(applicationId, status));
    }
}