package com.hiddenplaces.service;

import com.hiddenplaces.dto.ReviewDTO;
import com.hiddenplaces.dto.ReviewRequestDTO;

import java.util.List;

public interface ReviewService {
    List<ReviewDTO> getReviewsByLocationId(Long locationId);
    
    ReviewDTO addReview(ReviewRequestDTO reviewRequest);
    
    
}