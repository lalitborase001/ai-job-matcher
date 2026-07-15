package com.jobmatcher.backend.service;

import com.jobmatcher.backend.dto.response.MatchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchServiceImpl implements MatchService {

    @Override
    public MatchResponse matchResumeWithJob(Long resumeId, Long jobId) {

        return MatchResponse.builder()
                .matchPercentage(0.0)
                .matchedSkills(List.of())
                .missingSkills(List.of())
                .resumeSkills(List.of())
                .jobSkills(List.of())
                .build();
    }
}