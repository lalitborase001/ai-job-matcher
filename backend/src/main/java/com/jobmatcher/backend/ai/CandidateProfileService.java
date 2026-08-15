package com.jobmatcher.backend.ai;

import com.jobmatcher.backend.entity.CandidateProfile;

public interface CandidateProfileService {
    CandidateProfile generateProfile(Long resumeId) throws Exception;
    CandidateProfile getProfileByUserId(Long userId);
    CandidateProfile getProfileByResumeId(Long resumeId);
}
