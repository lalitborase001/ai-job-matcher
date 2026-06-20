package com.jobmatcher.backend.service;

import com.jobmatcher.backend.entity.User;
import com.jobmatcher.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findUserByEmail(String email) throws Exception{
        return userRepository.findByEmail(email).orElseThrow(() -> new Exception("User not found"));
    }

    @Override
    public User findUserByJwtToken(String jwt) throws Exception{
        return null;
    }
}
