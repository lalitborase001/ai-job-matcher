package com.jobmatcher.backend.service;

import com.jobmatcher.backend.entity.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);

    User getUserById(Long id) throws Exception;

    List<User> getAllUsers();

    User findUserByJwtToken(String jwt) throws Exception;

    User findUserByEmail(String email) throws Exception;
}
