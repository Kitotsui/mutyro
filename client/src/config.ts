// Geocoding Provider API (for AddressAutocomplete);

interface NominatimConfig {
  USER_AGENT: string;
  ENDPOINT: string;
  RATE_LIMIT_DELAY?: number;
  DEFAULT_QUERY_PARAMS: {
    format: string;
    addressdetails: number; // Stays as number
    limit: number; // Stays as number
    countrycodes: string;
    viewbox?: string;
    bounded?: number; // Stays as number (0 or 1)
  };
  QUERY_ADDRESS_SUFFIX: string;
}

interface MapboxConfig {
  ACCESS_TOKEN: string;
  ENDPOINT: string;
  DEFAULT_PARAMS: {
    country_code?: string;
    limit?: number;
    layers?: string;
    bbox?: string;
    language?: string;
    routing?: boolean;
  };
  QUERY_ADDRESS_SUFFIX: string;
}

export enum GeocodingProviderChoice {
  NOMINATIM = "NOMINATIM",
  MAPBOX = "MAPBOX",
}

export const RATE_LIMIT_DELAY = 1000;

export const ACTIVE_GEOCODING_PROVIDER: GeocodingProviderChoice =
  (import.meta.env.VITE_GEOCODING_PROVIDER as GeocodingProviderChoice) ||
  GeocodingProviderChoice.NOMINATIM;

// Nominatim

const MINHA_REGIAO_VIEWBOX = "-48.5,-18.5,-47.5,-20.0";

export const NOMINATIM_CONFIG: NominatimConfig = {
  USER_AGENT:
    import.meta.env.VITE_NOMINATIM_USER_AGENT ||
    "MutyroApp/1.0 (contact@example.com)",
  ENDPOINT: "https://nominatim.openstreetmap.org/search",
  RATE_LIMIT_DELAY: RATE_LIMIT_DELAY,
  DEFAULT_QUERY_PARAMS: {
    format: "json",
    addressdetails: 1,
    limit: 2,
    countrycodes: "br",
    viewbox: MINHA_REGIAO_VIEWBOX,
    bounded: 1,
  },
  // Make the suffix more general or remove if viewbox is good enough
  QUERY_ADDRESS_SUFFIX: ", Minas Gerais, Brazil", // Or ", Triângulo Mineiro, Brazil"
};

// Mapbox

const MAPBOX_BBOX_MINHA_REGIAO = "-48.5,-20.0,-47.5,-18.5";

export const MAPBOX_CONFIG: MapboxConfig = {
  ACCESS_TOKEN:
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || "YOUR_FALLBACK_MAPBOX_TOKEN",
  ENDPOINT: "https://api.mapbox.com/geocoding/v5/mapbox.places", // This is for forward geocoding
  DEFAULT_PARAMS: {
    country: "BR",
    limit: 2,
    types: "poi,address,place,locality,neighborhood,postcode",
    bbox: MAPBOX_BBOX_MINHA_REGIAO,
    proximity: "-47.9292,-19.7486", // Coordenadas de Uberaba
    language: "pt",
  },
  QUERY_ADDRESS_SUFFIX: ", Uberaba, Minas Gerais, Brazil",
};
