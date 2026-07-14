package com.jobmatcher.backend.repository;

import com.jobmatcher.backend.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository extends JpaRepository<Resume,Long> {
}