// src/utils/formatters.js

/**
 * Formatea un precio como número decimal con 2 decimales
 * @param {number|string} price - El precio a formatear
 * @param {number} decimals - Número de decimales (default: 2)
 * @returns {string} - Precio formateado con decimales
 *
 * @example
 * formatPrice(10) // "10.00"
 * formatPrice("15.5") // "15.50"
 * formatPrice(null) // "0.00"
 */
export const formatPrice = (price, decimals = 2) => {
  if (price === null || price === undefined || isNaN(price)) {
    return '0.00';
  }

  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numPrice)) {
    return '0.00';
  }

  return numPrice.toFixed(decimals);
};

/**
 * Formatea un precio con símbolo de moneda
 * @param {number|string} price - El precio a formatear
 * @param {string} currency - Símbolo de moneda (default: '$')
 * @param {number} decimals - Número de decimales (default: 2)
 * @returns {string} - Precio formateado con símbolo de moneda
 *
 * @example
 * formatPriceWithCurrency(10) // "$10.00"
 * formatPriceWithCurrency(15.5, '€') // "€15.50"
 */
export const formatPriceWithCurrency = (price, currency = '$', decimals = 2) => {
  return `${currency}${formatPrice(price, decimals)}`;
};
