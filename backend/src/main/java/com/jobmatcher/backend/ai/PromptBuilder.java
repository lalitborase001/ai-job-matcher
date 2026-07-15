package com.jobmatcher.backend.ai;

import org.springframework.stereotype.Component;

@Component
public class PromptBuilder {

    public String buildPrompt(
            String resumeText,
            String jobDescription,
            double similarity
    ) {

        return """
Analyze the resume against the job description.

Return:

1. Match Percentage
2. Strengths
3. Missing Skills
4. Resume Improvements
5. ATS Optimization
6. Interview Questions

Resume:
%s

Job Description:
%s

Current Match Percentage:
%.2f
"""
                .formatted(
                        resumeText,
                        jobDescription,
                        similarity
                );
    }
}