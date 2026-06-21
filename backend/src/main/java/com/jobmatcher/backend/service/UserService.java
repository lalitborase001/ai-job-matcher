package com.jobmatcher.backend.service;

import com.jobmatcher.backend.entity.User;

public interface UserService {
    User findUserByJwtToken(String jwt) throws Exception;

    User findUserByEmail(String email) throws Exception;
}
