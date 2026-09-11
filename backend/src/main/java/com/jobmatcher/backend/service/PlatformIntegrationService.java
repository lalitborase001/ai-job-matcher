package com.jobmatcher.backend.service;

import com.jobmatcher.backend.entity.ConnectedPlatform;
import com.jobmatcher.backend.entity.User;
import com.jobmatcher.backend.repository.ConnectedPlatformRepository;
import com.jobmatcher.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PlatformIntegrationService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ConnectedPlatformRepository connectedPlatformRepository;
    private final UserRepository userRepository;

    public List<ConnectedPlatform> getUserPlatforms(Long userId) {
        return connectedPlatformRepository.findByUserId(userId);
    }

    public void linkGoogleAccount(User user, String idToken) throws Exception {
        // 1. Verify the token directly with Google's authentication servers
        String googleUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken;

        try {
            Map<String, Object> response = restTemplate.getForObject(googleUrl, Map.class);

            if (response == null || !response.containsKey("email")) {
                throw new Exception("Invalid token received from Google.");
            }

            // 2. Extract profile data
            String email = (String) response.get("email");
            String googleUserId = (String) response.get("sub");

            // 3. Save to your database
            ConnectedPlatform platform = new ConnectedPlatform();
            platform.setUser(user);
            platform.setPlatformName("Google");
            platform.setPlatformUserId(googleUserId);
            platform.setProfileUrl(email);
            platform.setSyncStatus("CONNECTED");

            connectedPlatformRepository.save(platform);

        } catch (Exception e) {
            throw new Exception("Failed to verify Google account: " + e.getMessage());
        }
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
