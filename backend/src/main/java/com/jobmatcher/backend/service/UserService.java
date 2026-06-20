package com.jobmatcher.backend.service;

import com.jobmatcher.backend.entity.User;

public interface UserService {
    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;
}
