package com.jobmatcher.backend.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    /**
     * Analyze a resume against a job description using
     * the existing matching engine + Gemini AI.
     *
     * @param resumeId Resume ID
     * @param jobId Job ID
     * @return AI analysis response
     */
    @PostMapping("/analyze/{resumeId}/{jobId}")
    public ResponseEntity<AiResponse> analyzeResume(
            @PathVariable Long resumeId,
            @PathVariable Long jobId) throws Exception {

        AiResponse response =
                aiService.analyzeResume(resumeId, jobId);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

}