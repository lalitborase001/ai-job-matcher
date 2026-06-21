package com.jobmatcher.backend.repository;

import com.jobmatcher.backend.entity.Job;
import com.jobmatcher.backend.entity.JobApplication;
import com.jobmatcher.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job,Long> {
    List<Job> findByJobId(Long jobId);
}
