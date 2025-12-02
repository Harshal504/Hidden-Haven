package com.hiddenplaces.service;

import java.util.List;
import java.util.stream.Collectors;
import com.hiddenplaces.dto.LoginRequest;
import com.hiddenplaces.dto.RegisterRequest;
import com.hiddenplaces.entity.User;
import com.hiddenplaces.repository.UserRepository;
import com.hiddenplaces.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder; // Import
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hiddenplaces.dto.ViewerDTO;
import com.hiddenplaces.entity.Role;

//import com.hiddenplaces.exception.ApiException;
//import com.hiddenplaces.exception.AuthenticationException;
import com.hiddenplaces.exception.ResourceNotFoundException;
//import com.hiddenplaces.exception.UnAuthorizedException;




@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    // --- LOGIN LOGIC ---
    @Override
    public User loginUser(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Use encoder.matches() instead of .equals()
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return user;
    }

    // --- REGISTER LOGIC ---
    @Override
    public User registerUser(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User newUser = new User();
        newUser.setName(req.getName());
        newUser.setEmail(req.getEmail());
        
        // ENCODE PASSWORD BEFORE SAVING
        newUser.setPassword(passwordEncoder.encode(req.getPassword())); 
        
        newUser.setPhone(req.getPhone());
        newUser.setRole(req.getRole());

        return userRepository.save(newUser);
    }
    @Override
    public List<ViewerDTO> getAllViewers() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == Role.VIEWER)  // Only get viewers
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    

    private ViewerDTO mapToDTO(User user) {
        ViewerDTO dto = new ViewerDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setRole(user.getRole());
        return dto;
    }
	
	@Override
	public User getUserById(Long userId) {
		return userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
	}
	
	  @Override
	public String updateViewer(Long user_id,ViewerDTO dto,Role role) {
		
		User details=getUserById(user_id);
		if(role == Role.ADMIN){
		
		details.setName(dto.getName());
		//details.setRole(dto.getRole());  //admin setting another admin
		userRepository.save(details);
		return "VIEWER details updated.....";
	}
		throw new RuntimeException("only admin can update viewer details");
}
	  
	    @Override
	public String deleteDetails(Long user_id,Role role) {
	    	
		if(userRepository.existsById(user_id) && role == Role.ADMIN) {
			userRepository.deleteById(user_id);
			return "Deleted User details....";
		}
		return "Invalid user id - can't delelte details !!!!!!!!!!";
	}

}
