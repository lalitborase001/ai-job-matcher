package com.jobmatcher.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "resume_skills")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumeSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "resume_id")
    private Resume resume;

    @ManyToOne
    @JoinColumn(name = "skill_id")
    private Skill skill;

}