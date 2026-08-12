package com.jobmatcher.backend.service;

import com.jobmatcher.backend.dto.response.JobApplicationResponse;
import java.util.List;

public interface JobApplicationService {

    JobApplicationResponse applyForJob(Long userId, Long jobId, Long resumeId, Double matchScore) throws Exception;

    List<JobApplicationResponse> getApplicationsByUser(Long userId);

    List<JobApplicationResponse> getApplicationsByJob(Long jobId);

    JobApplicationResponse updateStatus(Long applicationId, String status) throws Exception;
}