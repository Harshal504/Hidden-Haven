package com.hiddenplaces.service;

import com.hiddenplaces.dto.LoginRequest;
import com.hiddenplaces.dto.RegisterRequest;
import com.hiddenplaces.entity.User;
import com.hiddenplaces.repository.UserRepository;
import com.hiddenplaces.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    // --- LOGIN LOGIC ---
    @Override
    public User loginUser(LoginRequest loginRequest) {
        // 1. Find user by email
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Check Password (Plain text comparison as requested)
        // Note: In a production app, use passwordEncoder.matches() here
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return user;
    }

    // --- REGISTER LOGIC ---
    @Override
    public User registerUser(RegisterRequest req) {
        // 1. Check if email exists
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        // 2. Create new User entity
        User newUser = new User();
        newUser.setName(req.getName());
        newUser.setEmail(req.getEmail());
        newUser.setPassword(req.getPassword()); // Storing Plain Text
        newUser.setPhone(req.getPhone());
        newUser.setRole(req.getRole());

        // 3. Save to DB
        return userRepository.save(newUser);
    }
}