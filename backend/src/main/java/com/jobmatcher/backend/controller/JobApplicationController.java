package com.jobmatcher.backend.controller;

import com.jobmatcher.backend.dto.response.JobApplicationResponse;
import com.jobmatcher.backend.entity.User;
import com.jobmatcher.backend.service.JobApplicationService;
import com.jobmatcher.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
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
    private final UserService userService;

    @PostMapping("/apply")
    public ResponseEntity<JobApplicationResponse> applyForJob(
            HttpServletRequest request,
            @RequestParam Long jobId,
            @RequestParam Long resumeId,
            @RequestParam Double matchScore) throws Exception {

        String jwt = request.getHeader("Authorization");
        User user = userService.findUserByJwtToken(jwt);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(jobApplicationService.applyForJob(user.getId(), jobId, resumeId, matchScore));
    }

    @GetMapping("/my-history")
    public ResponseEntity<List<JobApplicationResponse>> getMyApplications(HttpServletRequest request) throws Exception {

        String jwt = request.getHeader("Authorization");
        User user = userService.findUserByJwtToken(jwt);

        return ResponseEntity.ok(jobApplicationService.getApplicationsByUser(user.getId()));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<JobApplicationResponse>> getApplicationsByJob(@PathVariable Long jobId) {
        return ResponseEntity.ok(jobApplicationService.getApplicationsByJob(jobId));
    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<JobApplicationResponse> updateStatus(
            @PathVariable Long applicationId,
            @RequestParam String status) throws Exception {

        return ResponseEntity.ok(jobApplicationService.updateStatus(applicationId, status));
    }
}