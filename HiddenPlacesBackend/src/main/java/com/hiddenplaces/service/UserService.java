package com.hiddenplaces.service;

import com.hiddenplaces.dto.LoginRequest;
import com.hiddenplaces.dto.RegisterRequest;
import com.hiddenplaces.entity.User;

public interface UserService {
    
    User loginUser(LoginRequest loginRequest);
    
    User registerUser(RegisterRequest registerRequest);
}