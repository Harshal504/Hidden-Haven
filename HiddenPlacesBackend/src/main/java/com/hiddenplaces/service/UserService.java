package com.hiddenplaces.service;


import com.hiddenplaces.dto.LoginRequest;
import com.hiddenplaces.dto.RegisterRequest;
import com.hiddenplaces.entity.User;

public interface UserService {
    
    User loginUser(LoginRequest loginRequest);
    
    User registerUser(RegisterRequest registerRequest);

    List<ViewerDTO> getAllViewers();
	
	public User getUserById(Long userId);
	
	String  updateViewer(Long userId,ViewerDTO dto,Role role);
	
	String deleteDetails(Long userId,Role role);
    

}
