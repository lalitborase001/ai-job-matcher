package com.jobmatcher.backend.service;

import com.jobmatcher.backend.dto.response.MatchResponse;

public interface MatchService {

    MatchResponse matchResumeWithJob(
            Long resumeId,
            Long jobId);

}