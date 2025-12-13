// src/hooks/useSearch.js
import { useState, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';

const useSearch = (initialItems = [], searchKeys = ['name', 'scientific_name', 'family']) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  // Debounce para búsqueda en tiempo real
  const debouncedSetSearchTerm = useCallback(
    debounce((term) => {
      setDebouncedSearchTerm(term);
    }, 300),
    []
  );
  
  const handleSearch = (term) => {
    setSearchTerm(term);
    debouncedSetSearchTerm(term);
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
    clearSearch,
    hasSearch: debouncedSearchTerm.trim().length > 0
  };
};

export default useSearch;