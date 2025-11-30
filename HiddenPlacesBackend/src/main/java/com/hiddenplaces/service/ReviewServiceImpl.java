package com.hiddenplaces.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hiddenplaces.dto.ReviewDTO;
import com.hiddenplaces.dto.ReviewRequestDTO;
import com.hiddenplaces.entity.Location;
import com.hiddenplaces.entity.Review;
import com.hiddenplaces.entity.User;
import com.hiddenplaces.repository.LocationRepository;
import com.hiddenplaces.repository.ReviewRepository;
import com.hiddenplaces.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final LocationRepository locationRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ReviewDTO> getReviewsByLocationId(Long locationId) {
        return reviewRepository.findByLocationId(locationId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private ReviewDTO mapToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedOn(review.getCreatedOn());
        
        // Safely get user name
        if (review.getUser() != null) {
            dto.setUserName(review.getUser().getName());
        } else {
            dto.setUserName("Anonymous");
        }
        return dto;
    }
    
    
    
    @Override
    @Transactional // Ensure atomicity
    public ReviewDTO addReview(ReviewRequestDTO request) {
        // 1. Fetch User
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + request.getUserId()));

        // 2. Fetch Location
        Location location = locationRepository.findById(request.getLocationId())
                .orElseThrow(() -> new EntityNotFoundException("Location not found with ID: " + request.getLocationId()));

        // 3. Create Entity
        Review review = new Review();
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setUser(user);
        review.setLocation(location);

        // 4. Save
        Review savedReview = reviewRepository.save(review);

        // 5. Convert to DTO and return
        return mapToDTO(savedReview);
    }
    
    
    
    
}