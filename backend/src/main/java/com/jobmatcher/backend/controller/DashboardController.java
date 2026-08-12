package com.jobmatcher.backend.controller;

import com.jobmatcher.backend.dto.response.DashboardStatsResponse;
import com.jobmatcher.backend.entity.User;
import com.jobmatcher.backend.service.DashboardServiceImpl;
import com.jobmatcher.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardServiceImpl dashboardService;
    private final UserService userService;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats(HttpServletRequest request) throws Exception {
        // Extract the user securely from the JWT token
        String jwt = request.getHeader("Authorization");
        User user = userService.findUserByJwtToken(jwt);
        
        // Generate and return the stats
        return ResponseEntity.ok(dashboardService.getUserStats(user.getId()));
    }
}