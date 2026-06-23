package com.jobmatcher.backend.service;

import com.jobmatcher.backend.entity.User;
import com.jobmatcher.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User findUserByEmail(String email) throws Exception{
        return userRepository.findByEmail(email).orElseThrow(() -> new Exception("User not found"));
    }

    @Override
    public User saveUser(User user) {
        return null;
    }

    @Override
    public User getUserById(Long id) throws Exception {
        return null;
    }

    @Override
    public List<User> getAllUsers() {
        return List.of();
    }

    @Override
    public User findUserByJwtToken(String jwt) throws Exception{
        return null;
    }
}
