// src/hooks/useImagePreloader.js
import { useEffect, useRef } from 'react';

/**
 * Cache en memoria para URLs de imágenes ya cargadas
 * Esto persiste durante toda la sesión del navegador
 */
const imageCache = new Set();

/**
 * Pre-carga imágenes en segundo plano y las mantiene en caché
 * @param {Array<string>} imageUrls - Array de URLs de imágenes para pre-cargar
 * @param {boolean} enabled - Si está habilitado el pre-cargado (default: true)
 */
export const useImagePreloader = (imageUrls = [], enabled = true) => {
  const preloadedRef = useRef(new Set());

  useEffect(() => {
    if (!enabled || !imageUrls.length) return;

    // Filtrar URLs que aún no están en caché
    const urlsToPreload = imageUrls.filter(url => {
      return url && !imageCache.has(url) && !preloadedRef.current.has(url);
    });

    if (!urlsToPreload.length) return;

    // Pre-cargar imágenes en segundo plano
    const images = urlsToPreload.map(url => {
      const img = new Image();

      img.onload = () => {
        imageCache.add(url);
        preloadedRef.current.add(url);
      };

      img.onerror = () => {
        // Marcar como intentada para no reintentar constantemente
        preloadedRef.current.add(url);
      };

      // Iniciar la carga
      img.src = url;

      return img;
    });

    // Cleanup: cancelar cargas pendientes si el componente se desmonta
    return () => {
      images.forEach(img => {
        img.onload = null;
        img.onerror = null;
        img.src = '';
      });
    };
  }, [imageUrls, enabled]);

  /**
   * Verifica si una URL está en caché
   * @param {string} url - URL a verificar
   * @returns {boolean}
   */
  const isImageCached = (url) => {
    return imageCache.has(url);
  };

  return { isImageCached, cacheSize: imageCache.size };
};

/**
 * Hook para pre-cargar la siguiente página de imágenes
 * Útil para paginación: pre-carga las imágenes de la siguiente página
 * @param {Array} allItems - Todos los items disponibles
 * @param {number} currentPage - Página actual
 * @param {number} itemsPerPage - Items por página
 * @param {function} getImageUrl - Función para extraer URL de un item
 */
export const useNextPagePreloader = (allItems = [], currentPage = 1, itemsPerPage = 10, getImageUrl) => {
  const nextPageUrls = (() => {
    const nextPageStart = currentPage * itemsPerPage;
    const nextPageEnd = nextPageStart + itemsPerPage;
    const nextPageItems = allItems.slice(nextPageStart, nextPageEnd);

    return nextPageItems
      .map(item => getImageUrl ? getImageUrl(item) : item?.image_url || item?.image)
      .filter(Boolean);
  })();

  return useImagePreloader(nextPageUrls, nextPageUrls.length > 0);
};

/**
 * Pre-carga todas las imágenes de un array de items
 * @param {Array} items - Items con imágenes
 * @param {function} getImageUrl - Función para extraer URL de un item
 * @param {boolean} enabled - Si está habilitado
 */
export const useItemsImagePreloader = (items = [], getImageUrl, enabled = true) => {
  const imageUrls = items
    .map(item => getImageUrl ? getImageUrl(item) : item?.image_url || item?.image)
    .filter(Boolean);

  return useImagePreloader(imageUrls, enabled);
};

/**
 * Limpia el caché de imágenes (útil para testing o liberación de memoria)
 */
export const clearImageCache = () => {
  imageCache.clear();
};

export default useImagePreloader;
