package com.jobmatcher.backend.auth;

import com.jobmatcher.backend.dto.request.LoginRequest;
import com.jobmatcher.backend.dto.request.RegisterRequest;
import com.jobmatcher.backend.dto.response.LoginResponse;
import com.jobmatcher.backend.dto.response.UserResponse;

public interface AuthService {

    UserResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

}