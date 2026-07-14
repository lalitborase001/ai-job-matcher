package com.jobmatcher.backend.resume.service;

import java.util.Set;

public interface SkillExtractorService {

    Set<String> extractSkills(String resumeText);

}