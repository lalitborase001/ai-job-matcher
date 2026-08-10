package com.jobmatcher.backend.repository;

import com.jobmatcher.backend.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeRepository extends JpaRepository<Resume,Long> {

    List<Resume> findByUserId(Long userId);
}