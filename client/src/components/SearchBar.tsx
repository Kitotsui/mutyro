import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Wrapper from "../assets/wrappers/SearchBar";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder,
  initialQuery = "",
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const defaultPlaceholder = t('search.placeholder');

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
          placeholder={placeholder || defaultPlaceholder}
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
