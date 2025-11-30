package com.hiddenplaces.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewDTO {
    private Long id;
    private Integer rating;
    private String comment;
    private String userName; // To display who wrote the review
    private LocalDateTime createdOn;
}