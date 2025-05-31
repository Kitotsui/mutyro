import { ACTIVE_GEOCODING_PROVIDER, GeocodingProviderChoice } from "../config";
import { nominatimService } from "./nominatim.service";
import { mapboxService } from "./mapbox.service"; // Assuming you'll create this
import { GeocodingService } from "./geocodingService.types";

export const getActiveGeocodingService = (): GeocodingService => {
  if (ACTIVE_GEOCODING_PROVIDER === GeocodingProviderChoice.MAPBOX) {
    console.log("Using Mapbox Geocoding Service");
    return mapboxService;
  }
  // Default to Nominatim
  console.log("Using Nominatim Geocoding Service");
  return nominatimService;
};
