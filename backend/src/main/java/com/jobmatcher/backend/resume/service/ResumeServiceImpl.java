package com.jobmatcher.backend.resume.service;

import com.jobmatcher.backend.resume.dto.ResumeResponse;
import com.jobmatcher.backend.resume.util.ResumeValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl
        implements ResumeService {

    private final ResumeValidator validator;

    private final ResumeStorageService storageService;

    @Override
    public ResumeResponse uploadResume(
            MultipartFile file)
            throws Exception {

        validator.validate(file);

        String path = storageService.store(file);

        return new ResumeResponse(
                file.getOriginalFilename(),
                path,
                file.getSize(),
                "Resume uploaded successfully."
        );
    }
}