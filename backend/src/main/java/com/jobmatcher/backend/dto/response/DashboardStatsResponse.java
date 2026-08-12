package com.jobmatcher.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardStatsResponse {
    private int totalApplications;
    private double averageMatchScore;
    private double topMatchScore;
    private int pendingApplications;
}