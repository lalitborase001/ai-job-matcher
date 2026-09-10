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

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public AiResponse analyzeResume(Long resumeId, Long jobId) throws Exception {

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new UserNotFoundException("Resume not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new JobNotFoundException("Job not found"));

        MatchResponse match = matchService.matchResumeWithJob(resumeId, jobId);


        String prompt = promptBuilder.buildPrompt(
                resume.getExtractedText(),
                job.getDescription(),
                match.getMatchPercentage()
        );

        String aiText = geminiClient.generate(prompt);

        String cleanJson = aiText.replaceAll("```json", "")
                .replaceAll("```", "")
                .trim();

        AiResponse response = objectMapper.readValue(cleanJson, AiResponse.class);

        return response;
    }
}