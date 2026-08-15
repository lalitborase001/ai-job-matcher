package com.jobmatcher.backend.repository;

import com.jobmatcher.backend.entity.ConnectedPlatform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConnectedPlatformRepository extends JpaRepository<ConnectedPlatform, Long> {
    List<ConnectedPlatform> findByUserId(Long userId);
    Optional<ConnectedPlatform> findByUserIdAndPlatformName(Long userId, String platformName);
}
