package com.jobmatcher.backend.repository;

import com.jobmatcher.backend.Application;
import com.jobmatcher.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application,Long> {
}
