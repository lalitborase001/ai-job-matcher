package com.jobmatcher.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "candidate_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CandidateProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "resume_id")
    private Resume resume;

    private Integer resumeScore;
    
    private String experienceLevel;

    @ElementCollection
    private List<String> skills;

    @ElementCollection
    private List<String> roles;

    @ElementCollection
    private List<String> locations;

    @ElementCollection
    private List<String> recommendedKeywords;

    @ElementCollection
    private List<String> missingKeywords;
}
