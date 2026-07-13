package com.jobmatcher.backend.resume.service;

import java.io.File;
import java.io.IOException;

public interface ResumeParserService {

    String extractText(File file)
            throws IOException;

}