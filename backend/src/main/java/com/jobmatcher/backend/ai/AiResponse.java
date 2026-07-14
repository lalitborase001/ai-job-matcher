package com.jobmatcher.backend.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AiResponse {

    private double matchPercentage;

    private String summary;

    private List<String> strengths;

    private List<String> missingSkills;

    private List<String> improvements;

    private List<String> interviewQuestions;

}