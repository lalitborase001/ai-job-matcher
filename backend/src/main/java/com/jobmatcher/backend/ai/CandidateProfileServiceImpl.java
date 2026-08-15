package com.jobmatcher.backend.ai;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobmatcher.backend.entity.CandidateProfile;
import com.jobmatcher.backend.entity.Resume;
import com.jobmatcher.backend.entity.User;
import com.jobmatcher.backend.exception.UserNotFoundException;
import com.jobmatcher.backend.repository.CandidateProfileRepository;
import com.jobmatcher.backend.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CandidateProfileServiceImpl implements CandidateProfileService {

    private final CandidateProfileRepository candidateProfileRepository;
    private final ResumeRepository resumeRepository;
    private final GeminiClient geminiClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    @Transactional
    public CandidateProfile generateProfile(Long resumeId) throws Exception {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new UserNotFoundException("Resume not found"));

        User user = resume.getUser();

        // Optional: delete existing profile for this user/resume
        Optional<CandidateProfile> existing = candidateProfileRepository.findByUserId(user.getId());
        existing.ifPresent(candidateProfileRepository::delete);

        String prompt = buildPrompt(resume.getExtractedText());
        String aiText = geminiClient.generate(prompt);

        String cleanJson = aiText.replaceAll("```json", "")
                .replaceAll("```", "")
                .trim();

        CandidateProfile profile = objectMapper.readValue(cleanJson, CandidateProfile.class);
        profile.setUser(user);
        profile.setResume(resume);

        return candidateProfileRepository.save(profile);
    }

    @Override
    public CandidateProfile getProfileByUserId(Long userId) {
        return candidateProfileRepository.findByUserId(userId)
                .orElse(null);
    }

    @Override
    public CandidateProfile getProfileByResumeId(Long resumeId) {
        return candidateProfileRepository.findByResumeId(resumeId)
                .orElse(null);
    }

    private String buildPrompt(String resumeText) {
        return "You are an expert AI recruiter. Analyze the following resume text and extract the candidate profile information.\n" +
                "Return ONLY a valid JSON object matching this schema exactly:\n" +
                "{\n" +
                "  \"resumeScore\": (integer 1-100),\n" +
                "  \"experienceLevel\": (string, e.g. 'Entry Level', 'Mid Level', 'Senior Level'),\n" +
                "  \"skills\": [\"list\", \"of\", \"skills\"],\n" +
                "  \"roles\": [\"list\", \"of\", \"target\", \"roles\"],\n" +
                "  \"locations\": [\"list\", \"of\", \"locations\"],\n" +
                "  \"recommendedKeywords\": [\"list\", \"of\", \"industry\", \"standard\", \"keywords\", \"missing\", \"from\", \"resume\"],\n" +
                "  \"missingKeywords\": [\"list\", \"of\", \"important\", \"keywords\", \"missing\"]\n" +
                "}\n\n" +
                "Resume Text:\n" + resumeText;
    }
}
