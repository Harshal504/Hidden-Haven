package com.hiddenplaces.dto;
import com.hiddenplaces.entity.Role; // Import your Enum
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String phone;
    private Role role; // ADMIN or VIEWER
}