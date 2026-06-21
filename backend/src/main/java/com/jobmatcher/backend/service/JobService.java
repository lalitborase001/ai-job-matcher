package com.jobmatcher.backend.service;

import com.jobmatcher.backend.entity.Job;

import java.util.List;

public interface JobService {

    public Job createJob(Job job);
    public Job getJobById(Long id) throws Exception;

    public Job updateJob(Long id, Job job) throws Exception;
    public List<Job> getAllJob();

    public void deleteJob(Long id);

}
