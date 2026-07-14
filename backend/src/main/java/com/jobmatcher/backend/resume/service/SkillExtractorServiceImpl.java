package com.jobmatcher.backend.resume.service;

import com.jobmatcher.backend.ai.SkillDictionary;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class SkillExtractorServiceImpl
        implements SkillExtractorService {

    @Override
    public Set<String> extractSkills(String text) {

        String lowerCaseText = text.toLowerCase();

        Set<String> extracted = new HashSet<>();

        for(String skill : SkillDictionary.SKILLS){

            if(lowerCaseText.contains(skill.toLowerCase())){

                extracted.add(skill);

            }

        }

        return extracted;
    }

}