package com.jobmatcher.backend.service;

import com.jobmatcher.backend.dto.response.DashboardStatsResponse;
import com.jobmatcher.backend.entity.JobApplication;
import com.jobmatcher.backend.repository.JobApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl {

    private final JobApplicationRepository jobApplicationRepository;

    public DashboardStatsResponse getUserStats(Long userId) {
        List<JobApplication> apps = jobApplicationRepository.findByUserId(userId);

        if (apps.isEmpty()) {
            return new DashboardStatsResponse(0, 0.0, 0.0, 0);
        }

        int total = apps.size();
        
        // Find the highest score
        double topScore = apps.stream()
                .mapToDouble(JobApplication::getMatchScore)
                .max()
                .orElse(0.0);

        // Calculate the average score
        double average = apps.stream()
                .mapToDouble(JobApplication::getMatchScore)
                .average()
                .orElse(0.0);
        
        // Count applications with "APPLIED" status
        int pending = (int) apps.stream()
                .filter(a -> "APPLIED".equalsIgnoreCase(a.getStatus()))
                .count();

        // Round average to 2 decimal places
        double roundedAverage = Math.round(average * 100.0) / 100.0;

        return new DashboardStatsResponse(total, roundedAverage, topScore, pending);
    }
}