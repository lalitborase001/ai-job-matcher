package com.jobmatcher.backend.controller;

import com.jobmatcher.backend.entity.Job;
import com.jobmatcher.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody Job job){
        return ResponseEntity.ok(jobService.createJob(job));
    }

    @GetMapping
    public ResponseEntity<List<Job>> getAllJob(@RequestBody Job job){
        return ResponseEntity.ok(jobService.getAllJob());
    }
}
