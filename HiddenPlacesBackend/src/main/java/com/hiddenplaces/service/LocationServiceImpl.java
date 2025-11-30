package com.hiddenplaces.service;

import com.hiddenplaces.dto.LocationDTO;
import com.hiddenplaces.entity.Location;
import com.hiddenplaces.repository.LocationRepository;
import com.hiddenplaces.service.LocationService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {

    private final LocationRepository locationRepository;

    @Override
    public List<LocationDTO> getAllLocations() {
        return locationRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public LocationDTO updateLocation(Long id, LocationDTO dto) {
        // 1. Check if exists
        Location existingLocation = locationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Location not found with id: " + id));

        // 2. Update fields
        existingLocation.setTitle(dto.getTitle());
        existingLocation.setDescription(dto.getDescription());
        existingLocation.setCategory(dto.getCategory());
        existingLocation.setImageUrl(dto.getImageUrl());
        existingLocation.setLatitude(dto.getLatitude());
        existingLocation.setLongitude(dto.getLongitude());
        existingLocation.setAddress(dto.getAddress());
        existingLocation.setCity(dto.getCity());
        existingLocation.setState(dto.getState());

        // 3. Save
        Location savedLocation = locationRepository.save(existingLocation);
        return mapToDTO(savedLocation);
    }

    @Override
    public void deleteLocation(Long id) {
        if (!locationRepository.existsById(id)) {
            throw new EntityNotFoundException("Location not found with id: " + id);
        }
        locationRepository.deleteById(id);
    }

    // --- Helper Method to Convert Entity -> DTO ---
    private LocationDTO mapToDTO(Location location) {
        LocationDTO dto = new LocationDTO();
        dto.setId(location.getId());
        dto.setTitle(location.getTitle());
        dto.setDescription(location.getDescription());
        dto.setCategory(location.getCategory());
        dto.setImageUrl(location.getImageUrl());
        dto.setLatitude(location.getLatitude());
        dto.setLongitude(location.getLongitude());
        dto.setAddress(location.getAddress());
        dto.setCity(location.getCity());
        dto.setState(location.getState());
        
        // This comes from the @Formula in your Entity
        dto.setAverageRating(location.getAverageRating());
        
        dto.setCreatedOn(location.getCreatedOn());
        dto.setUpdatedOn(location.getUpdatedOn());
        return dto;
    }


}