package com.jobmatcher.backend.repository;

import com.jobmatcher.backend.entity.Job;
import com.jobmatcher.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job,Long> {
}
