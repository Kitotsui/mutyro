import React, { useState } from "react";
import Wrapper from "../assets/wrappers/SearchBar";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Buscar mutirão pelo título...",
  initialQuery = "",
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
  };

  return (
    <Wrapper>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="search"
          name="search"
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </Wrapper>
  );
};

export default SearchBar;
