package com.jobmatcher.backend.service;

import com.jobmatcher.backend.entity.Job;

import java.util.List;

public interface JobService {

    Job createJob(Job job);
    Job getJobById(Long id) throws Exception;

    Job updateJob(Long id, Job job) throws Exception;
    List<Job> getAllJob();

    void deleteJob(Long id);

}
