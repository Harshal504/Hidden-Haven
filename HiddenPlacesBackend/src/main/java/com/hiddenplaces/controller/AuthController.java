package com.hiddenplaces.controller;

import com.hiddenplaces.dto.AuthResponse;
import com.hiddenplaces.dto.LoginRequest;
import com.hiddenplaces.dto.RegisterRequest;
import com.hiddenplaces.entity.User;
import com.hiddenplaces.repository.UserRepository;
import com.hiddenplaces.security.JwtUtils;
import com.hiddenplaces.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest) {
        try {
            // 1. Authenticate using Spring Security
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            if (authentication.isAuthenticated()) {
                // 2. Generate Token
                String token = jwtUtils.generateToken(loginRequest.getEmail());
                
                // 3. Get User Details to send back
                User user = userRepository.findByEmail(loginRequest.getEmail())
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
                
                return ResponseEntity.ok(new AuthResponse(token, user));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Email or Password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest registerRequest) {
        try {
            User user = userService.registerUser(registerRequest);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
