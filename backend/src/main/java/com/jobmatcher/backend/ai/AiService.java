package com.jobmatcher.backend.ai;

public interface AiService {

    AiResponse analyzeResume(
            Long resumeId,
            Long jobId
    ) throws Exception;

}