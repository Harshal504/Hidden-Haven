package com.hiddenplaces.service;

import java.util.List;

import com.hiddenplaces.dto.LocationDTO;
import com.hiddenplaces.entity.Location;

public interface LocationService {

	List<LocationDTO> getAllLocations();
	
	LocationDTO updateLocation(Long id, LocationDTO locationDTO);
    void deleteLocation(Long id);

	

}
