package com.hiddenplaces.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hiddenplaces.dto.AuthRequest;
import com.hiddenplaces.dto.UserRegDTO;
import com.hiddenplaces.dto.ViewerDTO;
import com.hiddenplaces.entity.Role;
import com.hiddenplaces.entity.User;
import com.hiddenplaces.service.UserService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;
	
	
	
	@GetMapping("/viewers")
    public ResponseEntity<List<ViewerDTO>> getAllViewers(
            @AuthenticationPrincipal User currentUser) {
        
       /* 
        if (currentUser.getRole() != Role.ADMIN) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        */
        System.out.println("Get all viewers");
        return ResponseEntity.ok(userService.getAllViewers());
    }

	
	@GetMapping("/{userId}")
	public ResponseEntity<?> findById(@PathVariable @NotNull @Positive Long userId){
		System.out.println("list all users");
		return ResponseEntity.ok(userService.getUserById(userId));
	}
	
	@PutMapping("/viewers/update/{userId}")
    public ResponseEntity<?> updateViewer(
            @PathVariable Long userId,
            @Valid @RequestBody ViewerDTO dto,
            @AuthenticationPrincipal User currentUser) {
        
        String message = userService.updateViewer(userId, dto, currentUser.getRole());
        return ResponseEntity.ok("updated successfully");
    }
	
	 @DeleteMapping("/viewers/delete/{userId}")
	    public ResponseEntity<String> deleteViewer(
	            @PathVariable Long userId,
	            @AuthenticationPrincipal User currentUser) {
	        
	        String message = userService.deleteDetails(userId, currentUser.getRole());
	        return ResponseEntity.ok(message);
	    }
	

}

