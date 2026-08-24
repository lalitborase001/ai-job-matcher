package com.jobmatcher.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendedJobResponse {
    private Long jobId;
    private String title;
    private String company;
    private String location;
    private Double matchScore;
    private String matchReason; 
}