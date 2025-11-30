package com.hiddenplaces.dto;

import com.hiddenplaces.entity.Category;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class LocationDTO {
    private Long id;
    private String title;
    private String description;
    private Category category; // Spring will auto-convert String "BEACH" to Enum
    private String imageUrl;
    private Double latitude;
    private Double longitude;
    private String address;
    private String city;
    private String state;
    
    // Read-only field (sent to frontend, ignored from frontend)
    private Double averageRating; 
    private LocalDateTime createdOn;
    private LocalDateTime updatedOn;
}