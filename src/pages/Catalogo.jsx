// src/pages/Catalogo.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlantList from '../components/Plant/PlantList';
import SearchBar from '../components/Common/SearchBar';
import Pagination from '../components/Common/Pagination';
import SEO from '../components/Layout/SEO';
import styled from 'styled-components';
import { useProducts } from '../context/ProductContext';
import usePlants from '../hooks/usePlants';
import useSearch from '../hooks/useSearch';
import usePagination from '../hooks/usePagination';

const Container = styled.div`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #166534;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SubtitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
`;

const ResultsText = styled.p`
  color: #374151;
  font-weight: 500;
`;

const ClearFiltersButton = styled.button`
  background-color: transparent;
  color: #dc2626;
  border: 1px solid #fecaca;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #fef2f2;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  background-color: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  color: #d1d5db;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin: 0;
`;

const Catalogo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products, loading: productsLoading } = useProducts();
  
  // Usar hook de plantas combinadas (MockAPI + Trefle)
  const { plants, loading: plantsLoading, error: plantsError } = usePlants();
  
  // Obtener parámetros de búsqueda de la URL
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Usar hook de búsqueda con plantas combinadas
  const {
    searchTerm: currentSearch,
    filteredItems: searchedPlants,
    handleSearch,
    clearSearch,
    hasSearch
  } = useSearch(plants, ['common_name', 'scientific_name', 'family', 'description']);
  
  // Usar hook de paginación
  const {
    currentPage,
    totalPages,
    pageSize,
    paginatedItems,
    totalItems,
    startItem,
    endItem,
    handlePageChange,
    handlePageSizeChange
  } = usePagination(searchedPlants, itemsPerPage);
  
  // Sincronizar búsqueda inicial desde URL
  useEffect(() => {
    if (initialSearch) {
      handleSearch(initialSearch);
    }
    setIsInitialized(true);
  }, [initialSearch]);
  
  // Actualizar URL cuando cambia la búsqueda
  useEffect(() => {
    if (!isInitialized) return;

    const params = new URLSearchParams();
    if (currentSearch.trim()) {
      params.set('search', currentSearch);
    }
    if (currentPage > 1) {
      params.set('page', currentPage);
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    navigate(`${location.pathname}${newUrl}`, { replace: true });
  }, [currentSearch, currentPage, navigate, location.pathname]);
  
  // Manejar búsqueda
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    handleSearch(term);
    // Resetear a página 1 al buscar
    if (currentPage !== 1) {
      handlePageChange(1);
    }
  };
  
  // Limpiar todos los filtros
  const handleClearFilters = () => {
    setSearchTerm('');
    clearSearch();
    handlePageChange(1);
  };
  
  // Cambiar items por página
  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    handlePageSizeChange(value);
  };
  
  if (productsLoading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <div style={{
            border: '2px solid #e5e7eb',
            borderTop: '2px solid #166534',
            borderRadius: '50%',
            width: '4rem',
            height: '4rem',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#6b7280' }}>Cargando catálogo...</p>
        </div>
      </Container>
    );
  }
  
  const totalPlants = searchedPlants.length;
  const hasFilters = hasSearch;
  
  return (
    <>
      <SEO 
        title="Catálogo de Plantas - El Brote Verde"
        description="Explora nuestro catálogo completo de plantas. Filtra por nombre, familia o descripción. Encuentra las mejores plantas para tu hogar o jardín."
        keywords="catálogo plantas, buscar plantas, plantas por familia, plantas de interior, plantas de exterior"
      />
      
      <Container>
        <Header>
          <Title>Catálogo de Plantas</Title>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', marginBottom: '1rem' }}>
            <Subtitle>
              Descubre nuestra colección de plantas cuidadosamente seleccionadas
            </Subtitle>
            <div style={{ flexShrink: 0, width: '300px' }}>
              <SearchBar
                onSearch={handleSearchChange}
                placeholder="Buscar plantas..."
                products={products}
                showResults={true}
                initialValue={searchTerm}
              />
            </div>
          </div>
          
          {/* Selector de items por página */}
          <div style={{ minWidth: '200px', marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Plantas por página:
            </label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="6">6 plantas</option>
              <option value="9">9 plantas</option>
              <option value="12">12 plantas</option>
              <option value="24">24 plantas</option>
            </select>
          </div>          {/* Información de resultados */}
          {totalPlants > 0 && (
            <ResultsInfo>
              <ResultsText>
                Mostrando {startItem}-{endItem} de {totalPlants} {totalPlants === 1 ? 'planta' : 'plantas'}
                {hasSearch && ` para "${currentSearch}"`}
              </ResultsText>
              
              {hasFilters && (
                <ClearFiltersButton onClick={handleClearFilters}>
                  <span>✕</span>
                  Limpiar filtros
                </ClearFiltersButton>
              )}
            </ResultsInfo>
          )}
        </Header>
        
        {/* Lista de plantas (paginada) */}
        {totalPlants === 0 ? (
          <EmptyState>
            <EmptyIcon>🌿</EmptyIcon>
            <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>
              {hasSearch ? 'No se encontraron plantas' : 'No hay plantas disponibles'}
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              {hasSearch 
                ? `No encontramos plantas que coincidan con "${currentSearch}". Intenta con otro término.`
                : 'Aún no hay plantas en el catálogo. Pronto agregaremos nuestra colección.'
              }
            </p>
            {hasSearch && (
              <button
                onClick={handleClearFilters}
                style={{
                  backgroundColor: '#166534',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Ver todas las plantas
              </button>
            )}
          </EmptyState>
        ) : (
          <>
            <PlantList plants={paginatedItems} />
            
            {/* Paginación */}
            {totalPages > 1 && (
              <div style={{ marginTop: '3rem' }}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  itemsPerPage={pageSize}
                  totalItems={totalPlants}
                  showInfo={true}
                />
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Catalogo;