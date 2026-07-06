package com.jobmatcher.backend.service;

import com.jobmatcher.backend.entity.User;
import com.jobmatcher.backend.exception.UserNotFoundException;
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
        return userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(Long id) throws Exception {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    @Override
    public User updateUser(Long id, User user) throws Exception {
        User existingUser = getUserById(id);

        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setResumeURL(user.getResumeURL());

        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(Long id) throws Exception {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findUserByJwtToken(String jwt) throws Exception{
        return null;
    }
}
