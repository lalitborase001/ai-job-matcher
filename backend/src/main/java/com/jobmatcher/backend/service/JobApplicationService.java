package com.jobmatcher.backend.service;

import com.jobmatcher.backend.entity.JobApplication;

import java.util.List;

public interface JobApplicationService {
    public JobApplication applyForJob(Long userId, Long jobId) throws Exception;

    public List<JobApplication> getApplicationsByUser(Long userId);

    public List<JobApplication> getApplicationsByJob(Long jobId);
    public JobApplication updateStatus(Long applicationId, String status) throws Exception;
}
