export interface AddressComponents {
  road?: string;
  house_number?: string;
  suburb?: string;
  neighbourhood?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
}

export interface GeocodingSuggestion {
  id: string | number;
  displayName: string;
  latitude: number;
  longitude: number;
  provider?: string;
  addressComponents?: AddressComponents;
  // raw?: any; // for debugging
}

export interface GeocodingService {
  fetchSuggestions: (
    query: string,
    options?: Record<string, any>
  ) => Promise<GeocodingSuggestion[]>;
}
