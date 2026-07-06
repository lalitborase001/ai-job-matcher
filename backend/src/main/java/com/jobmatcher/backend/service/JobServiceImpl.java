package com.jobmatcher.backend.service;

import com.jobmatcher.backend.dto.request.CreateJobRequest;
import com.jobmatcher.backend.dto.response.JobResponse;
import com.jobmatcher.backend.entity.Job;
import com.jobmatcher.backend.exception.JobNotFoundException;
import com.jobmatcher.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService{

    private final JobRepository jobRepository;

    @Override
    public JobResponse createJob(CreateJobRequest request) {
        Job job = new Job();

        job.setTitle(request.getTitle());
        job.setCompany(request.getCompany());
        job.setSkills(request.getSkills());
        job.setDescription(request.getDescription());
        job.setLocation(request.getLocation());

        Job savedJob = jobRepository.save(job);

        return new JobResponse(
                savedJob.getId(),
                savedJob.getTitle(),
                savedJob.getCompany(),
                savedJob.getSkills(),
                savedJob.getDescription(),
                savedJob.getLocation()
        );
    }

    @Override
    public Job getJobById(Long id) throws Exception {
        return jobRepository.findById(id).orElseThrow(() -> new JobNotFoundException("Job not found"));
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public Job updateJob(Long id, Job job) throws Exception {

        Job existingJob = jobRepository.findById(id).orElseThrow(() -> new JobNotFoundException("Job not found"));

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
