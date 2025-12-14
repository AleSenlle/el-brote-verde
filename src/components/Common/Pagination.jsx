// src/components/Common/Pagination.jsx
import React from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const PageButton = styled.button`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props.active ? '#166534' : '#d1d5db'};
  border-radius: 6px;
  background-color: ${props => props.active ? '#166534' : 'white'};
  color: ${props => props.active ? 'white' : '#374151'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.active ? '#15803d' : '#f3f4f6'};
    border-color: ${props => props.active ? '#15803d' : '#9ca3af'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #f3f4f6;
  }
`;

const Ellipsis = styled.span`
  padding: 0.5rem;
  color: #6b7280;
  user-select: none;
`;

const PageInfo = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
  margin-left: 1rem;
  
  @media (max-width: 640px) {
    width: 100%;
    text-align: center;
    margin: 1rem 0 0 0;
  }
`;

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
  totalItems = 0,
  showInfo = true,
  itemLabel = 'productos'
}) => {
  const maxVisibleButtons = 5;
  
  if (totalPages <= 1) return null;
  
  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
    
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };
  
  const pageNumbers = getPageNumbers();
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };
  
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  return (
    <PaginationContainer>
      {/* Primera página */}
      <PageButton
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        aria-label="Ir a la primera página"
      >
        <FiChevronsLeft size={16} />
      </PageButton>
      
      {/* Página anterior */}
      <PageButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Ir a la página anterior"
      >
        <FiChevronLeft size={16} />
      </PageButton>
      
      {/* Botones numéricos */}
      {pageNumbers[0] > 1 && (
        <>
          <PageButton onClick={() => handlePageChange(1)}>1</PageButton>
          {pageNumbers[0] > 2 && <Ellipsis>...</Ellipsis>}
        </>
      )}
      
      {pageNumbers.map(page => (
        <PageButton
          key={page}
          onClick={() => handlePageChange(page)}
          active={currentPage === page}
          aria-label={`Ir a página ${page}`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </PageButton>
      ))}
      
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <Ellipsis>...</Ellipsis>
          )}
          <PageButton onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PageButton>
        </>
      )}
      
      {/* Página siguiente */}
      <PageButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Ir a la página siguiente"
      >
        <FiChevronRight size={16} />
      </PageButton>
      
      {/* Última página */}
      <PageButton
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Ir a la última página"
      >
        <FiChevronsRight size={16} />
      </PageButton>
      
      {/* Información de página */}
      {showInfo && totalItems > 0 && (
        <PageInfo>
          {startItem === 1 && endItem === totalItems ? (
            // Si mostramos todos los items en una sola página
            `${totalItems} ${itemLabel}`
          ) : endItem === totalItems ? (
            // Si estamos en la última página mostrando items finales
            `${startItem}-${endItem} ${itemLabel}`
          ) : (
            // Páginas intermedias
            `Mostrando ${startItem}-${endItem} de ${totalItems} ${itemLabel}`
          )}
        </PageInfo>
      )}
    </PaginationContainer>
  );
};

export default Pagination;