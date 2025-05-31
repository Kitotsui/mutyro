// src/services/mapbox.service.ts
import { MAPBOX_CONFIG } from "../config";
import {
  GeocodingService,
  GeocodingSuggestion,
  AddressComponents, // Make sure this is imported
} from "./geocodingService.types";
import { toast } from "react-toastify";

interface MapboxFeature {
  id: string;
  text: string; // The most specific label for the feature (e.g., street name, POI name)
  place_name: string; // The full, formatted address or place name
  center: [number, number]; // Coordinates as [longitude, latitude]
  context?: Array<{
    id: string; // e.g., "address.123", "postcode.456", "place.789", "region.abc", "country.xyz"
    text: string;
    short_code?: string; // e.g., "US" for country, "US-CA" for region
    wikidata?: string;
  }>;
  // Other properties like 'type' (e.g. feature.properties.type) might also be useful
  properties?: {
    address?: string; // Sometimes address number is here
    // category?: string;
    // type?: string; // Could also be 'address', 'poi', etc. directly on the feature
  };
  address?: string; // Sometimes the number is here if it's an address feature
}

interface MapboxApiResponse {
  type: "FeatureCollection";
  query: string[]; // The original search query broken into parts
  features: MapboxFeature[];
  attribution: string;
}

export const mapboxService: GeocodingService = {
  async fetchSuggestions(query: string, callOptions: Record<string, any> = {}) {
    if (
      !MAPBOX_CONFIG.ACCESS_TOKEN ||
      MAPBOX_CONFIG.ACCESS_TOKEN === "YOUR_FALLBACK_MAPBOX_TOKEN"
    ) {
      const errorMsg = "Mapbox Access Token não configurado.";
      console.error(errorMsg);
      toast.error(errorMsg);
      return [];
    }

    if (query.length < 2) {
      return [];
    }

    const searchText = `${query}${MAPBOX_CONFIG.QUERY_ADDRESS_SUFFIX || ""}`;

    const queryParamsForApi: Record<string, string> = {
      access_token: MAPBOX_CONFIG.ACCESS_TOKEN,
    };

    if (MAPBOX_CONFIG.DEFAULT_PARAMS) {
      for (const key in MAPBOX_CONFIG.DEFAULT_PARAMS) {
        if (
          Object.prototype.hasOwnProperty.call(
            MAPBOX_CONFIG.DEFAULT_PARAMS,
            key
          )
        ) {
          const paramKey = key as keyof typeof MAPBOX_CONFIG.DEFAULT_PARAMS;
          queryParamsForApi[paramKey] = String(
            MAPBOX_CONFIG.DEFAULT_PARAMS[paramKey]
          );
        }
      }
    }
    for (const key in callOptions) {
      if (
        Object.prototype.hasOwnProperty.call(callOptions, key) &&
        callOptions[key] !== undefined
      ) {
        queryParamsForApi[key] = String(callOptions[key]);
      }
    }

    const params = new URLSearchParams(queryParamsForApi);
    const url = `${MAPBOX_CONFIG.ENDPOINT}/${encodeURIComponent(
      searchText
    )}.json?${params.toString()}`;
    console.log("Requesting Mapbox URL:", url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        let errorDataMessage = `Mapbox error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorDataMessage = errorData.message || errorDataMessage;
          console.error("Mapbox API JSON error:", errorData);
        } catch (e) {
          const textError = await response.text();
          console.error(
            "Mapbox API non-JSON error response (likely HTML):",
            textError.substring(0, 500)
          );
        }
        throw new Error(errorDataMessage);
      }

      const data: MapboxApiResponse = await response.json();

      return (data.features || []).map(
        (item: MapboxFeature): GeocodingSuggestion => {
          const addressComponents: AddressComponents = {};

          // Populate from feature.text and feature.address (for house number if it's an address type)
          // Mapbox's 'text' field is often the name of the POI or the street name without number.
          // If 'item.address' exists, it might be the house number for address features.
          let roadName = item.text; // Start with item.text as potential road/poi name

          if (item.address && item.id.startsWith("address.")) {
            // 'item.address' often contains house number
            roadName = `${item.address} ${item.text}`; // Prepend house number to street name
          }
          addressComponents.road = roadName;

          if (item.context) {
            for (const ctx of item.context) {
              const type = ctx.id.split(".")[0];
              switch (type) {
                // 'address' context type might not be street, could be number. 'text' is more reliable for name.
                // case 'address':
                //   addressComponents.road = ctx.text; // item.text is often better for the main name
                //   break;
                case "postcode":
                  addressComponents.postcode = ctx.text;
                  break;
                case "locality": // Often for neighborhoods or smaller areas
                  addressComponents.neighbourhood = ctx.text;
                  break;
                case "place": // Typically city/town
                  addressComponents.city = ctx.text;
                  break;
                case "district": // Can be a sub-region or sometimes a city for Mapbox. Use as city if place not found.
                  if (!addressComponents.city)
                    addressComponents.city = ctx.text;
                  break;
                case "region": // State/Province
                  addressComponents.state = ctx.text;
                  break;
                case "country":
                  addressComponents.country = ctx.text;
                  break;
              }
            }
          }

          return {
            id: item.id,
            displayName: item.place_name, // This is the full string Mapbox provides
            latitude: item.center[1], // Mapbox 'center' is [longitude, latitude]
            longitude: item.center[0],
            addressComponents:
              Object.keys(addressComponents).length > 0
                ? addressComponents
                : undefined,
            provider: "Mapbox",
          };
        }
      );
    } catch (error: any) {
      console.error("Error in mapboxService.fetchSuggestions:", error.message);
      toast.error(error.message || "Falha ao buscar sugestões do Mapbox.");
      return [];
    }
  },
};
