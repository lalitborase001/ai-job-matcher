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
}
