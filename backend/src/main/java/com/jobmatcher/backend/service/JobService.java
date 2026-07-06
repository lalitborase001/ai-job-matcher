package com.jobmatcher.backend.service;

import com.jobmatcher.backend.dto.request.CreateJobRequest;
import com.jobmatcher.backend.dto.response.JobResponse;
import com.jobmatcher.backend.entity.Job;

import java.util.List;

public interface JobService {


    JobResponse createJob(CreateJobRequest request);

    Job getJobById(Long id) throws Exception;

    Job updateJob(Long id, Job job) throws Exception;
    List<Job> getAllJobs();

    void deleteJob(Long id);

}
