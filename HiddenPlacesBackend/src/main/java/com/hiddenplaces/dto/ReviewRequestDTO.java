package com.hiddenplaces.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReviewRequestDTO {
    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Location ID is required")
    private Long locationId;

    @Min(1) @Max(5)
    private Integer rating;

    private String comment;
}