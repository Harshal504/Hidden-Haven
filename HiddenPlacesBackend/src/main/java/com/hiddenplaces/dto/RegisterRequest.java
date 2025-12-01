package com.hiddenplaces.dto;
import org.hibernate.validator.constraints.Length;

import com.hiddenplaces.entity.Role; // Import your Enum

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
	@NotBlank(message = "Name is required")
	@Length(min=3, max=20,message="First name must be min 3 chars n max 20 chars")
    private String name;
	
	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
    private String email;
	
	@NotBlank
    private String password;
	
	@Length(min = 10, max = 12, message = "Digits must be between 10 to 12(with prefix added) ")
    private String phone;
	
    private Role role; // ADMIN or VIEWER
}
