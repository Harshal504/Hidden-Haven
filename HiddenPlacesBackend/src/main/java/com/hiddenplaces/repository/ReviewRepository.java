package com.hiddenplaces.repository;

import com.hiddenplaces.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    // Spring Data JPA automatically generates the SQL for this method name
    List<Review> findByLocationId(Long locationId);
}