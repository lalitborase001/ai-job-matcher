package com.jobmatcher.backend.resume.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class ResumeStorageServiceImpl implements ResumeStorageService {

    private final Path uploadDirectory =
            Paths.get("uploads");

    @Override
    public String store(MultipartFile file)
            throws IOException {

        if (!Files.exists(uploadDirectory)) {
            Files.createDirectories(uploadDirectory);
        }

        String filename = UUID.randomUUID()
                + "_"
                + file.getOriginalFilename();

        Path destination =
                uploadDirectory.resolve(filename);

        Files.copy(
                file.getInputStream(),
                destination,
                StandardCopyOption.REPLACE_EXISTING
        );

        return destination.toString();
    }
}