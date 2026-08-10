package com.jobmatcher.backend.resume.service;

import com.jobmatcher.backend.entity.Resume;
import com.jobmatcher.backend.entity.User;
import com.jobmatcher.backend.repository.ResumeRepository;
import com.jobmatcher.backend.resume.dto.ResumeResponse;
import com.jobmatcher.backend.resume.util.ResumeValidator;
import com.jobmatcher.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeValidator validator;
    private final ResumeRepository resumeRepository;
    private final UserService userService;
    private final ResumeStorageService storageService;
    private final HttpServletRequest request;

    @Override
    public ResumeResponse uploadResume(MultipartFile file) throws Exception {

        validator.validate(file);

        String path = storageService.store(file);

        String jwt = request.getHeader("Authorization");

        User user = userService.findUserByJwtToken(jwt);

        Resume resume = new Resume();

        resume.setFileName(file.getOriginalFilename());
        resume.setFilePath(path);
        resume.setUploadedAt(LocalDateTime.now());
        resume.setUser(user);

        Resume savedResume = resumeRepository.save(resume);

        return new ResumeResponse(
                savedResume.getFileName(),
                savedResume.getFilePath(),
                file.getSize(),
                "Resume uploaded successfully."
        );
    }

    @Override
    public List<ResumeResponse> getAllResumesForUser() throws Exception {

        String jwt = request.getHeader("Authorization");

        User user = userService.findUserByJwtToken(jwt);

        return resumeRepository.findByUserId(user.getId())
                .stream()
                .map(resume -> new ResumeResponse(
                        resume.getFileName(),
                        resume.getFilePath(),
                        null,
                        "Resume fetched successfully."
                ))
                .toList();
    }
}