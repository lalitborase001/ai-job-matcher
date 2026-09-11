package com.jobmatcher.backend.controller;

import com.jobmatcher.backend.entity.ConnectedPlatform;
import com.jobmatcher.backend.entity.User;
import com.jobmatcher.backend.service.PlatformIntegrationService;
import com.jobmatcher.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/platforms")
@RequiredArgsConstructor
public class PlatformController {

    private final PlatformIntegrationService platformIntegrationService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<ConnectedPlatform>> getUserPlatforms(Authentication authentication) throws Exception {
        User user = userService.findUserByEmail(authentication.getName()) ;
        return ResponseEntity.ok(platformIntegrationService.getUserPlatforms(user.getId()));
    }

    @PostMapping("/{platformName}/connect")
    public ResponseEntity<ConnectedPlatform> connectPlatform(
            Authentication authentication, 
            @PathVariable String platformName) throws Exception {
        User user = userService.findUserByEmail(authentication.getName());
        return ResponseEntity.ok(platformIntegrationService.connectPlatform(user.getId(), platformName));
    }

    @PostMapping("/{platformName}/disconnect")
    public ResponseEntity<ConnectedPlatform> disconnectPlatform(
            Authentication authentication, 
            @PathVariable String platformName) throws Exception{
        User user = userService.findUserByEmail(authentication.getName());
        return ResponseEntity.ok(platformIntegrationService.disconnectPlatform(user.getId(), platformName));
    }

    @PostMapping("/link/google")
    public ResponseEntity<?> linkGoogleAccount(
            @RequestHeader("Authorization") String jwt,
            @RequestBody Map<String, String> payload) {

        try {
            // 1. Securely identify the currently logged-in user
            User user = userService.findUserByJwtToken(jwt);

            // 2. Pass the token to the service
            String googleToken = payload.get("token");
            platformIntegrationService.linkGoogleAccount(user, googleToken);

            return ResponseEntity.ok(Map.of("message", "Successfully linked Google account!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
