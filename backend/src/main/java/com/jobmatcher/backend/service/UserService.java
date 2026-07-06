package com.jobmatcher.backend.service;

import com.jobmatcher.backend.dto.request.CreateUserRequest;
import com.jobmatcher.backend.dto.response.UserResponse;
import com.jobmatcher.backend.entity.User;

import java.util.List;

public interface UserService {
    UserResponse saveUser(CreateUserRequest request);

    User getUserById(Long id) throws Exception;

    User updateUser(Long id,User user) throws Exception;

    void deleteUser(Long id) throws Exception;

    List<User> getAllUsers();

    User findUserByJwtToken(String jwt) throws Exception;

    User findUserByEmail(String email) throws Exception;
}
