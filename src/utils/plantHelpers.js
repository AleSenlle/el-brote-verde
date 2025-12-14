// src/utils/plantHelpers.js

/**
 * Determina si un botón de agregar al carrito debe estar habilitado
 * @param {boolean} inStock - Si el producto está en stock
 * @param {boolean} isAdding - Si se está agregando al carrito actualmente
 * @param {boolean} isAuthenticated - Si el usuario está autenticado
 * @returns {boolean}
 */
export const canAddToCart = (inStock, isAdding, isAuthenticated) => {
  return inStock && !isAdding && isAuthenticated;
};

/**
 * Obtiene el tooltip apropiado para el botón de agregar
 * @param {boolean} isAuthenticated - Si el usuario está autenticado
 * @param {boolean} inStock - Si el producto está en stock
 * @returns {string}
 */
export const getAddButtonTooltip = (isAuthenticated, inStock) => {
  if (!isAuthenticated) return 'Inicia sesión para comprar';
  if (!inStock) return 'Producto sin stock';
  return 'Agregar al carrito';
};

/**
 * Obtiene el aria-label apropiado para el botón de agregar
 * @param {boolean} isAuthenticated - Si el usuario está autenticado
 * @param {boolean} inStock - Si el producto está en stock
 * @param {string} plantName - Nombre común de la planta
 * @returns {string}
 */
export const getAddButtonAriaLabel = (isAuthenticated, inStock, plantName) => {
  if (!isAuthenticated) return 'Inicia sesión para comprar';
  if (!inStock) return 'Producto sin stock';
  return `Agregar ${plantName} al carrito`;
};

/**
 * Obtiene el texto del botón de agregar al carrito
 * @param {boolean} isAuthenticated - Si el usuario está autenticado
 * @param {boolean} isAdding - Si se está agregando actualmente
 * @param {boolean} inStock - Si el producto está en stock
 * @param {number} currentQuantity - Cantidad actual en el carrito
 * @returns {string|null} - Texto o null si necesita JSX
 */
export const getAddButtonText = (isAuthenticated, isAdding, inStock, currentQuantity) => {
  if (!isAuthenticated) return 'Inicia sesión';
  if (isAdding) return 'Agregando...';
  if (!inStock) return 'Sin stock';
  if (currentQuantity > 0) return `Agregar (${currentQuantity})`;
  return null; // Indica que debe mostrar el ícono + texto "Agregar"
};

/**
 * Valida si un precio es válido
 * @param {number|string} price - Precio a validar
 * @returns {boolean}
 */
export const isValidPrice = (price) => {
  if (price === null || price === undefined) return false;
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return !isNaN(numPrice) && numPrice > 0;
};

/**
 * Calcula el rating como string formateado
 * @param {number} rating - Rating numérico
 * @returns {string}
 */
export const formatRating = (rating) => {
  if (!rating || isNaN(rating)) return '0.0';
  return rating.toFixed(1);
};

/**
 * Genera las estrellas para rating
 * @param {number} rating - Rating numérico
 * @returns {object} - Objeto con filled y empty stars
 */
export const getStarCounts = (rating) => {
  const numRating = rating || 0;
  const filledStars = Math.floor(numRating);
  const emptyStars = 5 - filledStars;
  return { filled: filledStars, empty: emptyStars };
};
