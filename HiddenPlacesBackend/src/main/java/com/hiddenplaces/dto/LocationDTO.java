package com.hiddenplaces.dto;

import com.hiddenplaces.entity.Category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class LocationDTO {
	@NotNull
    private Long id;
	@NotBlank
	@Size(min = 2,max = 20,message = "Title must be between 3 to 20 characters")
    private String title;
	@NotBlank
	@Size(min = 2,max = 150,message = "Description must be between 2 to 150 characters")
    private String description;
    private Category category; // Spring will auto-convert String "BEACH" to Enum
    private String imageUrl;
    private Double latitude;
    private Double longitude;
    @NotBlank
	@Size(min = 2,max = 40,message = "Address must be between 2 to 40 characters")
    private String address;
    @NotBlank
    private String city;
    @NotBlank
    private String state;
    
    // Read-only field (sent to frontend, ignored from frontend)
    private Double averageRating; 
    private LocalDateTime createdOn;
    private LocalDateTime updatedOn;
}
