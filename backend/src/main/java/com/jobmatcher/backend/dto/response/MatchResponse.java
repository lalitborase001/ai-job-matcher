package com.jobmatcher.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MatchResponse {

    private double matchPercentage;

    private List<String> matchedSkills;

    private List<String> missingSkills;

    private List<String> resumeSkills;

    private List<String> jobSkills;

}