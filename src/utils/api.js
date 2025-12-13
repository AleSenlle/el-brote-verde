// src/utils/api.js
export const MOCKAPI_URL = 'https://693896a04618a71d77d0bcc2.mockapi.io';
export const API_ENDPOINTS = {
  PRODUCTS: `${MOCKAPI_URL}/products`,
  // Podemos agregar más endpoints después
};

// Configuración de axios
export const API_CONFIG = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
};