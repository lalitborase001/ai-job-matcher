package com.jobmatcher.backend.service;

import com.jobmatcher.backend.entity.Job;
import com.jobmatcher.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService{

    private final JobRepository jobRepository;

    @Override
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    @Override
    public Job getJobById(Long id) throws Exception {
        return jobRepository.findById(id).orElseThrow(() -> new Exception("Job not found"));
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public Job updateJob(Long id, Job job) throws Exception {

        Job existingJob = jobRepository.findById(id).orElseThrow(() -> new Exception("Job not found"));

        existingJob.setTitle(job.getTitle());
        existingJob.setCompany(job.getCompany());
        existingJob.setSkills(job.getSkills());
        existingJob.setDescription(job.getDescription());
        existingJob.setLocation(job.getLocation());

        return jobRepository.save(existingJob);
    }

    @Override
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}
