package com.hiddenplaces.dto;

import com.hiddenplaces.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ViewerDTO {
	private Long id;
	private String name;
	private String email;
	private String password;
	private Role role;
    private String phone;
    
    public ViewerDTO(Long id, String name, String email, String phone, Role role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role=role;
    }
}
