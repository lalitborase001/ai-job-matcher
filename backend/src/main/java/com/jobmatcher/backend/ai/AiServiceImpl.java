package com.jobmatcher.backend.ai;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobmatcher.backend.dto.response.MatchResponse;
import com.jobmatcher.backend.entity.Job;
import com.jobmatcher.backend.entity.Resume;
import com.jobmatcher.backend.exception.JobNotFoundException;
import com.jobmatcher.backend.exception.UserNotFoundException;
import com.jobmatcher.backend.repository.JobRepository;
import com.jobmatcher.backend.repository.ResumeRepository;
import com.jobmatcher.backend.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {

    private final ResumeRepository resumeRepository;
    private final JobRepository jobRepository;
    private final MatchService matchService;
    private final PromptBuilder promptBuilder;
    private final GeminiClient geminiClient;

    // Spring Boot automatically provides this tool to parse JSON
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public AiResponse analyzeResume(Long resumeId, Long jobId) throws Exception {

        // Fetch Resume
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new UserNotFoundException("Resume not found"));

        // Fetch Job
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new JobNotFoundException("Job not found"));

        // Existing matching algorithm
        MatchResponse match = matchService.matchResumeWithJob(resumeId, jobId);

        // Build JSON prompt
        String prompt = promptBuilder.buildPrompt(
                resume.getExtractedText(),
                job.getDescription(),
                match.getMatchPercentage()
        );

        // Call Gemini
        String aiText = geminiClient.generate(prompt);

        // Clean the response (Gemini sometimes wraps JSON in ```json ... ``` markdown blocks)
        String cleanJson = aiText.replaceAll("```json", "")
                .replaceAll("```", "")
                .trim();

        // Magically map the JSON string directly into your AiResponse Java class!
        AiResponse response = objectMapper.readValue(cleanJson, AiResponse.class);

        return response;
    }
}