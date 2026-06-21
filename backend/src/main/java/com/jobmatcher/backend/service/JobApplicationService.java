package com.jobmatcher.backend.service;

import com.jobmatcher.backend.entity.JobApplication;

import java.util.List;

public interface JobApplicationService {
    JobApplication applyForJob(Long userId, Long jobId) throws Exception;

    List<JobApplication> getApplicationsByUser(Long userId);

    List<JobApplication> getApplicationsByJob(Long jobId);
    JobApplication updateStatus(Long applicationId, String status) throws Exception;
}
