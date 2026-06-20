package com.jobmatcher.backend.service;

import com.jobmatcher.backend.entity.Job;
import com.jobmatcher.backend.entity.User;
import com.jobmatcher.backend.entity.JobApplication;
import com.jobmatcher.backend.repository.JobApplicationRepository;
import com.jobmatcher.backend.repository.JobRepository;
import com.jobmatcher.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobApplicationServiceImpl implements JobApplicationService {

    private final UserRepository userRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final JobRepository jobRepository;

    @Override
    public JobApplication applyForJob(Long userId, Long jobId) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new Exception("Job not found"));

        JobApplication application = new JobApplication();
        application.setUser(user);
        application.setJob(job);
        application.setStatus("APPLIED");
        return jobApplicationRepository.save(application);
    }

    @Override
    public List<JobApplication> getApplicationsByUser(Long userId) {
        return List.of();
    }

    @Override
    public List<JobApplication> getApplicationsByJob(Long jobId) {
        return List.of();
    }

    @Override
    public JobApplication updateStatus(Long applicationId, String status) throws Exception {
        return null;
    }


}
