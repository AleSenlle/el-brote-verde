// src/components/Common/SearchBar.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import styled from 'styled-components';
import { debounce } from 'lodash';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 0.25rem;
`;

const SearchInput = styled.input`
  flex: 0.5;
  width: 400px;
  max-width: 90%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.error ? '#dc2626' : '#d1d5db'};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#dc2626' : '#166534'};
    box-shadow: 0 0 0 3px ${props => props.error ? 'rgba(220, 38, 38, 0.1)' : 'rgba(22, 101, 52, 0.1)'};
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchButton = styled.button`
  background-color: #166534;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  
  &:hover {
    background-color: #15803d;
  }
  
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: ${props => props.hasSubmitButton ? '5.5rem' : '0.75rem'};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #6b7280;
    background-color: #f3f4f6;
  }
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 0.5rem;
`;

const ResultItem = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f3f4f6;
  
  &:hover {
    background-color: #f9fafb;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const ResultName = styled.div`
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
`;

const ResultDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6b7280;
`;

const NoResults = styled.div`
  padding: 1rem;
  text-align: center;
  color: #6b7280;
`;

const SearchBar = ({ 
  onSearch, 
  onSubmit,
  placeholder = "Buscar plantas...",
  products = [],
  showResults = true,
  debounceTime = 300,
  showSubmitButton = false,
  initialValue = ''
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  
  // Función debounced para búsqueda
  const debouncedSearch = useCallback(
    debounce((term) => {
      if (onSearch) {
        onSearch(term);
      }
      
      // Filtrar productos localmente si se proporcionaron
      if (products.length > 0 && showResults) {
        const filtered = products.filter(product =>
          product.name?.toLowerCase().includes(term.toLowerCase()) ||
          product.scientific_name?.toLowerCase().includes(term.toLowerCase()) ||
          product.family?.toLowerCase().includes(term.toLowerCase()) ||
          product.common_name?.toLowerCase().includes(term.toLowerCase())
        );
        setResults(filtered.slice(0, 5));
      }
    }, debounceTime),
    [onSearch, products, showResults, debounceTime]
  );
  
  // Manejar cambio en el input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };
  
  // Manejar submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(searchTerm);
    } else if (onSearch) {
      onSearch(searchTerm);
    }
    setIsFocused(false);
  };
  
  // Limpiar búsqueda
  const handleClear = () => {
    setSearchTerm('');
    setResults([]);
    if (onSearch) {
      onSearch('');
    }
    debouncedSearch('');
  };
  
  // Seleccionar un resultado
  const handleResultClick = (product) => {
    const productName = product.common_name || product.name;
    setSearchTerm(productName);
    setResults([]);
    setIsFocused(false);
    
    // Si hay onSubmit, llamarlo
    if (onSubmit) {
      onSubmit(productName);
    } else if (onSearch) {
      onSearch(productName);
    }
  };
  
  // Limpiar debounce al desmontar
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);
  
  // Actualizar cuando cambia initialValue
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);
  
  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <div style={{ position: 'relative', flex: 1 }}>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            aria-label="Buscar plantas"
          />
          
          {searchTerm.length > 0 && (
            <ClearButton 
              onClick={handleClear}
              hasSubmitButton={showSubmitButton}
              aria-label="Limpiar búsqueda"
              type="button"
            >
              <FiX size={18} />
            </ClearButton>
          )}
        </div>
        
        {showSubmitButton && (
          <SearchButton type="submit" disabled={!searchTerm.trim()}>
            <FiSearch size={18} />
            Buscar
          </SearchButton>
        )}
      </SearchForm>
      
      {/* Mostrar resultados si hay productos y el input está enfocado */}
      {showResults && isFocused && searchTerm.length > 0 && results.length > 0 && (
        <SearchResults>
          {results.map((product) => (
            <ResultItem 
              key={product.id}
              onClick={() => handleResultClick(product)}
              onMouseDown={(e) => e.preventDefault()}
            >
              <ResultName>{product.common_name || product.name}</ResultName>
              <ResultDetails>
                <span>{product.scientific_name}</span>
                <span>${product.price?.toFixed(2)}</span>
              </ResultDetails>
            </ResultItem>
          ))}
        </SearchResults>
      )}
      
      {showResults && isFocused && searchTerm.length > 0 && results.length === 0 && (
        <SearchResults>
          <NoResults>
            No se encontraron resultados para "{searchTerm}"
          </NoResults>
        </SearchResults>
      )}
    </SearchContainer>
  );
};

export default SearchBar;