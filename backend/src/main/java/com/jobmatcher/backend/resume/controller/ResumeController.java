package com.jobmatcher.backend.resume.controller;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<ResumeResponse> uploadResume(
            @RequestParam("file") MultipartFile file)
            throws Exception {

        return ResponseEntity.ok(
                resumeService.uploadResume(file)
        );
    }

}