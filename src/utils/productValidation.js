// src/utils/productValidation.js

/**
 * Valida si una URL es válida
 * @param {string} url - URL a validar
 * @returns {boolean}
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
};

/**
 * Valida si una URL apunta a una imagen
 * @param {string} url - URL a validar
 * @returns {boolean}
 */
export const isImageUrl = (url) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const urlLower = url.toLowerCase();
  return imageExtensions.some(ext => urlLower.includes(ext));
};

/**
 * Valida los datos de un producto
 * @param {object} formData - Datos del formulario
 * @returns {object} - Objeto con los errores encontrados
 */
export const validateProduct = (formData) => {
  const errors = {};

  // Validación de nombre (OBLIGATORIO)
  if (!formData.name || !formData.name.trim()) {
    errors.name = 'El nombre del producto es requerido';
  } else if (formData.name.length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres';
  }

  // Validación de nombre científico (OBLIGATORIO)
  if (!formData.scientific_name || !formData.scientific_name.trim()) {
    errors.scientific_name = 'El nombre científico es requerido';
  } else if (formData.scientific_name.length < 3) {
    errors.scientific_name = 'El nombre científico debe tener al menos 3 caracteres';
  }

  // Validación de familia (OBLIGATORIO)
  if (!formData.family || !formData.family.trim()) {
    errors.family = 'La familia botánica es requerida';
  } else if (formData.family.length < 3) {
    errors.family = 'La familia debe tener al menos 3 caracteres';
  }

  // Validación de precio (OBLIGATORIO)
  if (!formData.price && formData.price !== 0) {
    errors.price = 'El precio es requerido';
  } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
    errors.price = 'El precio debe ser un número mayor a 0';
  }

  // Validación de imagen (OBLIGATORIO)
  if (!formData.image || !formData.image.trim()) {
    errors.image = 'La URL de la imagen es requerida';
  } else if (!isValidUrl(formData.image)) {
    errors.image = 'Ingresa una URL válida (debe comenzar con http:// o https://)';
  } else if (!isImageUrl(formData.image)) {
    errors.image = 'La URL debe apuntar a una imagen (jpg, png, gif, webp)';
  }

  // Validación de descripción (OPCIONAL, pero si se llena, mínimo 10 caracteres)
  if (formData.description && formData.description.trim() && formData.description.length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres (o dejarla vacía)';
  }

  return errors;
};

/**
 * Valida un campo específico del producto
 * @param {string} fieldName - Nombre del campo
 * @param {any} value - Valor del campo
 * @param {object} formData - Datos completos del formulario (para validaciones que dependen de otros campos)
 * @returns {string|null} - Mensaje de error o null si no hay error
 */
export const validateField = (fieldName, value, formData = {}) => {
  switch (fieldName) {
    case 'name':
      if (!value || !value.trim()) {
        return 'El nombre del producto es requerido';
      }
      if (value.length < 3) {
        return 'El nombre debe tener al menos 3 caracteres';
      }
      break;

    case 'scientific_name':
      if (!value || !value.trim()) {
        return 'El nombre científico es requerido';
      }
      if (value.length < 3) {
        return 'El nombre científico debe tener al menos 3 caracteres';
      }
      break;

    case 'family':
      if (!value || !value.trim()) {
        return 'La familia botánica es requerida';
      }
      if (value.length < 3) {
        return 'La familia debe tener al menos 3 caracteres';
      }
      break;

    case 'price':
      if (!value && value !== 0) {
        return 'El precio es requerido';
      }
      if (isNaN(value) || parseFloat(value) <= 0) {
        return 'El precio debe ser un número mayor a 0';
      }
      break;

    case 'image':
      if (!value || !value.trim()) {
        return 'La URL de la imagen es requerida';
      }
      if (!isValidUrl(value)) {
        return 'Ingresa una URL válida (debe comenzar con http:// o https://)';
      }
      if (!isImageUrl(value)) {
        return 'La URL debe apuntar a una imagen (jpg, png, gif, webp)';
      }
      break;

    case 'description':
      if (value && value.trim() && value.length < 10) {
        return 'La descripción debe tener al menos 10 caracteres (o dejarla vacía)';
      }
      break;

    default:
      return null;
  }

  return null;
};
