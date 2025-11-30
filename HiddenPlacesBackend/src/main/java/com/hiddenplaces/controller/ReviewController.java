package com.hiddenplaces.controller;

import com.hiddenplaces.dto.ReviewDTO;
import com.hiddenplaces.dto.ReviewRequestDTO;
import com.hiddenplaces.service.ReviewService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/location/{locationId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByLocation(@PathVariable Long locationId) {
        return ResponseEntity.ok(reviewService.getReviewsByLocationId(locationId));
    }
    
    @PostMapping
    public ResponseEntity<ReviewDTO> addReview(@Valid @RequestBody ReviewRequestDTO reviewRequest) {
        ReviewDTO createdReview = reviewService.addReview(reviewRequest);
        return ResponseEntity.ok(createdReview);
    }
    
    
    
}