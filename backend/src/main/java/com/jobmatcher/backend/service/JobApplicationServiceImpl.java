package com.jobmatcher.backend.service;

import com.jobmatcher.backend.dto.response.JobApplicationResponse;
import com.jobmatcher.backend.entity.Job;
import com.jobmatcher.backend.entity.Resume;
import com.jobmatcher.backend.entity.User;
import com.jobmatcher.backend.entity.JobApplication;
import com.jobmatcher.backend.exception.ApplicationNotFoundException;
import com.jobmatcher.backend.exception.JobNotFoundException;
import com.jobmatcher.backend.exception.UserNotFoundException;
import com.jobmatcher.backend.repository.JobApplicationRepository;
import com.jobmatcher.backend.repository.JobRepository;
import com.jobmatcher.backend.repository.ResumeRepository;
import com.jobmatcher.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobApplicationServiceImpl implements JobApplicationService {

    private final UserRepository userRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final JobRepository jobRepository;
    private final ResumeRepository resumeRepository; // <-- Added to fetch the Resume

    @Override
    public JobApplicationResponse applyForJob(Long userId, Long jobId, Long resumeId, Double matchScore) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new JobNotFoundException("Job not found"));

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        JobApplication application = new JobApplication();
        application.setUser(user);
        application.setJob(job);
        application.setResume(resume);             // Save which resume was used
        application.setMatchScore(matchScore);     // Save the Gemini AI Score
        application.setStatus("APPLIED");

        JobApplication saved = jobApplicationRepository.save(application);
        return mapToResponse(saved);
    }

    @Override
    public List<JobApplicationResponse> getApplicationsByUser(Long userId) {
        return jobApplicationRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<JobApplicationResponse> getApplicationsByJob(Long jobId) {
        return jobApplicationRepository.findByJobId(jobId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public JobApplicationResponse updateStatus(Long applicationId, String status) throws Exception {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ApplicationNotFoundException("Application not found"));
        application.setStatus(status);

        return mapToResponse(jobApplicationRepository.save(application));
    }

    // Helper method to convert the Entity into your React-friendly DTO
    private JobApplicationResponse mapToResponse(JobApplication app) {
        return new JobApplicationResponse(
                app.getId(),
                app.getUser().getName(),
                app.getUser().getEmail(),
                app.getJob().getTitle(),
                app.getJob().getCompany(),
                app.getStatus(),
                app.getMatchScore(),
                app.getResume() != null ? app.getResume().getFileName() : "N/A"
        );
    }
}