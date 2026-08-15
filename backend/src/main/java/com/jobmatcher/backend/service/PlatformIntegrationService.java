package com.jobmatcher.backend.service;

import com.jobmatcher.backend.entity.ConnectedPlatform;
import com.jobmatcher.backend.entity.User;
import com.jobmatcher.backend.repository.ConnectedPlatformRepository;
import com.jobmatcher.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlatformIntegrationService {

    private final ConnectedPlatformRepository connectedPlatformRepository;
    private final UserRepository userRepository;

    public List<ConnectedPlatform> getUserPlatforms(Long userId) {
        return connectedPlatformRepository.findByUserId(userId);
    }

    @Transactional
    public ConnectedPlatform connectPlatform(Long userId, String platformName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ConnectedPlatform platform = connectedPlatformRepository
                .findByUserIdAndPlatformName(userId, platformName)
                .orElse(new ConnectedPlatform());

        platform.setUser(user);
        platform.setPlatformName(platformName);
        platform.setStatus("CONNECTED");

        return connectedPlatformRepository.save(platform);
    }

    @Transactional
    public ConnectedPlatform disconnectPlatform(Long userId, String platformName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ConnectedPlatform platform = connectedPlatformRepository
                .findByUserIdAndPlatformName(userId, platformName)
                .orElse(new ConnectedPlatform());

        platform.setUser(user);
        platform.setPlatformName(platformName);
        platform.setStatus("NOT_CONNECTED");

        return connectedPlatformRepository.save(platform);
    }
}
