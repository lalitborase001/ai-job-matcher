package com.jobmatcher.backend.service;

import java.util.List;

public interface JobApplication {
    public JobApplication applyForJob(Long userId, Long jobId) throws Exception;

    public List<JobApplication> getApplicationsByUser(Long userId);

    public List<JobApplication> getApplicationsByJob(Long jobId);

    public JobApplication updateStatus(Long applicationId, String status) throws Exception;
}
