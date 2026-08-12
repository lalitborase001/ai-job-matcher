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
You MUST return the response ONLY as a valid JSON object. Do not include markdown formatting, backticks, or explanations. 

Use this EXACT JSON structure:
{
  "matchPercentage": 88.0,
  "summary": "Provide a brief 3-sentence professional overview of how well the candidate fits the role.",
  "strengths": ["Java", "Spring Boot", "REST APIs"],
  "missingSkills": ["JPA", "Hibernate"],
  "improvements": ["Fix the future date typo on the hackathon", "Add metrics to bullet points"],
  "interviewQuestions": ["What is the difference between JDBC and Spring Data JPA?", "Explain layered architecture."]
}

Resume:
%s

Job Description:
%s

Current Keyword Match Percentage:
%.2f
"""
                .formatted(resumeText, jobDescription, similarity);
    }
}