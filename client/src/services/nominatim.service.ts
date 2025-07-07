import { NOMINATIM_CONFIG } from "../config";
import { GeocodingService, AddressComponents } from "./geocodingService.types";

interface NominatimApiResponseItem {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    road?: string;
    suburb?: string;
    neighbourhood?: string;
    house_number?: string;
    city?: string;
    village?: string;
    town?: string;
    county?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
}

export const nominatimService: GeocodingService = {
  async fetchSuggestions(query: string, callOptions: Record<string, any> = {}) {
    // Added type for callOptions
    const finalQuery = `${query}${NOMINATIM_CONFIG.QUERY_ADDRESS_SUFFIX || ""}`;

    // Prepare an object with string values for URLSearchParams
    const paramsForUrl: Record<string, string> = {
      q: finalQuery, // The user's search query
    };

    // Add default parameters from config, converting numbers to strings
    if (NOMINATIM_CONFIG.DEFAULT_QUERY_PARAMS) {
      if (NOMINATIM_CONFIG.DEFAULT_QUERY_PARAMS.format) {
        paramsForUrl.format = NOMINATIM_CONFIG.DEFAULT_QUERY_PARAMS.format;
      }
      if (NOMINATIM_CONFIG.DEFAULT_QUERY_PARAMS.addressdetails !== undefined) {
        paramsForUrl.addressdetails = String(
          NOMINATIM_CONFIG.DEFAULT_QUERY_PARAMS.addressdetails
        );
      }
      if (NOMINATIM_CONFIG.DEFAULT_QUERY_PARAMS.limit !== undefined) {
        paramsForUrl.limit = String(
          NOMINATIM_CONFIG.DEFAULT_QUERY_PARAMS.limit
        );
      }
      if (NOMINATIM_CONFIG.DEFAULT_QUERY_PARAMS.countrycodes) {
        paramsForUrl.countrycodes =
          NOMINATIM_CONFIG.DEFAULT_QUERY_PARAMS.countrycodes;
      }
      if (NOMINATIM_CONFIG.DEFAULT_QUERY_PARAMS.viewbox) {
        paramsForUrl.viewbox = NOMINATIM_CONFIG.DEFAULT_QUERY_PARAMS.viewbox;
        // Only add 'bounded' if 'viewbox' is present AND 'bounded' is defined in config
        if (NOMINATIM_CONFIG.DEFAULT_QUERY_PARAMS.bounded !== undefined) {
          paramsForUrl.bounded = String(
            NOMINATIM_CONFIG.DEFAULT_QUERY_PARAMS.bounded
          );
        }
      }
    }

    // Add/override with any dynamic options passed to the function, ensuring they are strings
    for (const key in callOptions) {
      if (
        Object.prototype.hasOwnProperty.call(callOptions, key) &&
        callOptions[key] !== undefined
      ) {
        paramsForUrl[key] = String(callOptions[key]);
      }
    }

    const params = new URLSearchParams(paramsForUrl);
    // No 'as Record<string, string>' cast is needed now, as paramsForUrl is correctly typed

    const url = `${NOMINATIM_CONFIG.ENDPOINT}?${params.toString()}`;
    console.log("Requesting Nominatim URL (from service):", url); // Good for debugging

    const response = await fetch(url, {
      headers: { "User-Agent": NOMINATIM_CONFIG.USER_AGENT },
    });

    if (!response.ok) {
      throw new Error(
        `Nominatim error: ${response.status} ${response.statusText}`
      );
    }

    const data: NominatimApiResponseItem[] = await response.json();

    return data.map((item) => {
      // Map Nominatim's address sub-object to our common AddressComponents
      const addressComponents: AddressComponents = {
        road: item.address?.road,
        house_number: item.address?.house_number,
        suburb: item.address?.suburb || item.address?.neighbourhood,
        city: item.address?.city || item.address?.town || item.address?.village,
        state: item.address?.state,
        postcode: item.address?.postcode,
        country: item.address?.country,
      };

      return {
        id: item.place_id,
        displayName: item.display_name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        addressComponents: item.address ? addressComponents : undefined, // <-- POPULATE HERE
        provider: "Nominatim",
      };
    });
  },
};
