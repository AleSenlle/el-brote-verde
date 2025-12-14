// src/hooks/useSearch.js
import { useState, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';
import { SEARCH_CONFIG } from '../utils/constants';

const useSearch = (initialItems = [], searchKeys = ['name', 'scientific_name', 'family'], initialSearchTerm = '') => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearchTerm);

  // Debounce para búsqueda en tiempo real
  const debouncedSetSearchTerm = useCallback(
    debounce((term) => {
      setDebouncedSearchTerm(term);
    }, SEARCH_CONFIG.DEBOUNCE_TIME),
    []
  );
  
  const handleSearch = (term) => {
    setSearchTerm(term);
    debouncedSetSearchTerm(term);
  };

  // Búsqueda inmediata sin debounce (útil para navegación desde URL)
  const handleSearchImmediate = (term) => {
    setSearchTerm(term);
    setDebouncedSearchTerm(term);
  };

  const filteredItems = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return initialItems;

    const term = debouncedSearchTerm.toLowerCase().trim();

    return initialItems.filter(item => {
      return searchKeys.some(key => {
        const value = item[key];
        if (!value) return false;
        return value.toString().toLowerCase().includes(term);
      });
    });
  }, [initialItems, debouncedSearchTerm, searchKeys]);

  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  };

  return {
    searchTerm,
    debouncedSearchTerm,
    filteredItems,
    handleSearch,
    handleSearchImmediate,
    clearSearch,
    hasSearch: debouncedSearchTerm.trim().length > 0
  };
};

export default useSearch;