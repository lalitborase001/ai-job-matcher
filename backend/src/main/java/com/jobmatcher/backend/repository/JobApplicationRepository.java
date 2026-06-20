package com.jobmatcher.backend.repository;

import com.jobmatcher.backend.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicationRepository extends JpaRepository<JobApplication,Long> {
}
