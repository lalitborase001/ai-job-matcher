package com.jobmatcher.backend.repository;

import com.jobmatcher.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobRepository extends JpaRepository<Job,Long> {
    Optional<Job> findById(Long Id);
}
