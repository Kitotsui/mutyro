import { useState, useEffect, useCallback, useRef } from "react";
import lodashDebounce from "lodash.debounce";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/AddressAutocomplete";
import { RATE_LIMIT_DELAY } from "../config";
import { getActiveGeocodingService } from "../services/geocodingServiceFactory";
import {
  GeocodingSuggestion,
  AddressComponents,
} from "../services/geocodingService.types";

interface AddressAutocompleteProps {
  onLocationSelect: (
    location: {
      display_name: string;
      lat: string;
      lon: string;
    } | null
  ) => void;
  initialValue?: string;
  label?: string;
  placeholder?: string;
}

const AddressAutocomplete = ({
  onLocationSelect,
  initialValue = "",
  label = "Local - Endereço",
  placeholder = "Digite o endereço e selecione a opção correta",
}: AddressAutocompleteProps) => {
  const [query, setQuery] = useState<string>(initialValue);
  const [suggestions, setSuggestions] = useState<GeocodingSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastSelectedFormattedQuery, setLastSelectedFormattedQuery] = useState<
    string | null
  >(initialValue);

  // Ref for the main wrapper div of this component (to detect clicks outside)
  const wrapperRef = useRef<HTMLDivElement>(null);

  const activeService = getActiveGeocodingService();

  // --- Geocoding API Call ---
  const fetchSuggestionsFromAPI = async (currentQuery: string) => {
    if (currentQuery.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setIsLoading(true);
    try {
      // The service layer handles API specifics and returns the common GeocodingSuggestion type
      const newSuggestions = await activeService.fetchSuggestions(currentQuery);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
      toast.error("Falha ao buscar endereços."); // More generic error
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce of the API call function using lodash.debounce to avoid hitting limits
  // useCallback ensures this debounced function is memorized and not recreated on every render
  const debouncedFetchSuggestions = useCallback(
    lodashDebounce(fetchSuggestionsFromAPI, RATE_LIMIT_DELAY),
    [activeService] // Dependency on activeService ensures debounce is recreated if service changes
  );

  // --- Event Handlers ---
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery); // Update the input field's text

    if (lastSelectedFormattedQuery && newQuery !== lastSelectedFormattedQuery) {
      onLocationSelect(null); // Signal parent that coordinates are no longer valid
      setLastSelectedFormattedQuery(null); // Clear for next valid selection
    }

    if (newQuery.trim() === "") {
      setSuggestions([]); // Clear suggestions if input is empty
      setShowSuggestions(false);
    } else {
      debouncedFetchSuggestions(newQuery); // Call debounced search
    }
  };

  const formatDisplayAddress = (suggestion: GeocodingSuggestion): string => {
    const ac = suggestion.addressComponents;

    if (!ac) {
      // If no address components, return the provider's display name
      return suggestion.displayName;
    }

    // Part 1: Street and Number (or POI name)
    let part1 = "";
    if (ac.road) {
      part1 = ac.road;
      if (ac.house_number) {
        part1 += `, ${ac.house_number}`;
      }
    } else {
      // If no road, likely a POI or larger area. Use the first part of displayName.
      part1 = suggestion.displayName.split(",")[0].trim();
    }

    // Part 2: Neighborhood and City
    let part2 = "";
    const part2Details: string[] = [];
    if (ac.suburb) part2Details.push(ac.suburb);
    else if (ac.neighbourhood) part2Details.push(ac.neighbourhood); // Fallback

    if (ac.city) part2Details.push(ac.city);

    if (part2Details.length > 0) {
      part2 = part2Details.join(", ");
    }

    // Part 3: State and ZIP Code
    let part3 = "";
    const part3Details: string[] = [];
    if (ac.state) part3Details.push(ac.state); // Typically UF for Brazil
    if (ac.postcode) part3Details.push(ac.postcode);

    if (part3Details.length > 0) {
      part3 = part3Details.join(", ");
    }

    let finalAddress = part1;
    if (part2) finalAddress += ` - ${part2}`;
    if (part3) finalAddress += (part2 ? ", " : " - ") + part3; // Add comma if part2 exists, else dash

    // Fallback if formatted string is too short or doesn't seem right
    if (
      finalAddress.length < 10 &&
      suggestion.displayName.length > finalAddress.length
    ) {
      return suggestion.displayName;
    }
    return finalAddress;
  };

  const handleSuggestionClick = (suggestion: GeocodingSuggestion) => {
    const formattedAddress = formatDisplayAddress(suggestion);

    setQuery(formattedAddress);
    setLastSelectedFormattedQuery(formattedAddress);
    setSuggestions([]);
    setShowSuggestions(false);
    onLocationSelect({
      display_name: formattedAddress,
      lat: String(suggestion.latitude),
      lon: String(suggestion.longitude),
    });
  };

  // --- Effect for Handling Clicks Outside ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false); // Hide suggestions if click is outside
      }
    };
    // Add event listener when dropdown is shown
    if (showSuggestions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    // Cleanup function to remove listener when component unmounts or dropdown hides
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSuggestions]); // Re-run effect when showSuggestions changes

  return (
    <Wrapper ref={wrapperRef}>
      {label && <label htmlFor="address-search-input">{label}</label>}
      <input
        type="text"
        id="address-search-input"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        autoComplete="off" // Important to prevent browser's default autocomplete
        onFocus={() => {
          // Optionally show suggestions on focus if query is already populated
          if (query.length >= 3 && suggestions.length > 0) {
            setShowSuggestions(true);
          }
        }}
      />
      {isLoading && (
        <div className="loading-indicator">Buscando endereços...</div>
      )}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => {
            const listItemText = formatDisplayAddress(suggestion);

            return (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSuggestionClick(suggestion)
                }
                role="option"
                aria-selected={false}
              >
                {listItemText} {/* Display the formatted or full name */}
              </li>
            );
          })}
        </ul>
      )}
    </Wrapper>
  );
};
export default AddressAutocomplete;
