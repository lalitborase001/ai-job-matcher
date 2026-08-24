package com.jobmatcher.backend.controller;

import com.jobmatcher.backend.dto.request.CreateJobRequest;
import com.jobmatcher.backend.dto.response.JobResponse;
import com.jobmatcher.backend.dto.response.RecommendedJobResponse;
import com.jobmatcher.backend.entity.Job;
import com.jobmatcher.backend.entity.User;
import com.jobmatcher.backend.service.JobService;
import com.jobmatcher.backend.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/jobs")
@Tag(name = "Job API", description = "Operations related to job")
public class JobController {

    private final JobService jobService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<JobResponse> createJob(@RequestBody CreateJobRequest request){
        return ResponseEntity.ok(jobService.createJob(request));
    }

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs(){
        return ResponseEntity.ok(jobService.getAllJobs());
    }



    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestBody Job job) throws Exception {
        return ResponseEntity.ok(jobService.updateJob(id, job));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.ok("Job deleted successfully");
    }

    @GetMapping("/recommended")
    public ResponseEntity<List<RecommendedJobResponse>> getRecommendedJobs(HttpServletRequest request) throws Exception {
        // Securely identify the user via their JWT token
        String jwt = request.getHeader("Authorization");
        User user = userService.findUserByJwtToken(jwt);

        // Generate and return recommendations
        List<RecommendedJobResponse> recommendations = jobService.getRecommendedJobsForUser(user.getId());

        return ResponseEntity.ok(recommendations);
    }
}
