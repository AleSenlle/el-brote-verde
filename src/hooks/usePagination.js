// src/hooks/usePagination.js
import { useState, useMemo, useEffect } from 'react';
import { PAGINATION_CONFIG } from '../utils/constants';

const usePagination = (items = [], itemsPerPage = PAGINATION_CONFIG.DEFAULT_ITEMS_PER_PAGE) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPage);
  
  // Resetear a página 1 cuando cambian los items
  useEffect(() => {
    setCurrentPage(1);
  }, [items]);
  
  const totalPages = useMemo(() => {
    return Math.ceil(items.length / pageSize);
  }, [items, pageSize]);
  
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, pageSize]);
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll suave al inicio
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePageSizeChange = (size) => {
    const newPageSize = parseInt(size);
    if (newPageSize > 0) {
      const newTotalPages = Math.ceil(items.length / newPageSize);
      const newCurrentPage = Math.min(currentPage, newTotalPages) || 1;
      
      setPageSize(newPageSize);
      setCurrentPage(newCurrentPage);
    }
  };
  
  return {
    currentPage,
    totalPages,
    pageSize,
    paginatedItems,
    totalItems: items.length,
    startItem: (currentPage - 1) * pageSize + 1,
    endItem: Math.min(currentPage * pageSize, items.length),
    handlePageChange,
    handlePageSizeChange,
    setCurrentPage
  };
};

export default usePagination;