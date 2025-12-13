// src/components/Product/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import { 
  FiPackage, 
  FiBook, 
  FiTag, 
  FiFileText, 
  FiDollarSign, 
  FiImage, 
  FiStar,
  FiCheck, 
  FiX,
  FiGlobe
} from 'react-icons/fi';
import styled from 'styled-components';

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.error ? '#dc2626' : '#d1d5db'};
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#dc2626' : '#166534'};
    box-shadow: 0 0 0 3px ${props => props.error ? 'rgba(220, 38, 38, 0.1)' : 'rgba(22, 101, 52, 0.1)'};
  }
  
  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.error ? '#dc2626' : '#d1d5db'};
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#dc2626' : '#166534'};
    box-shadow: 0 0 0 3px ${props => props.error ? 'rgba(220, 38, 38, 0.1)' : 'rgba(22, 101, 52, 0.1)'};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.error ? '#dc2626' : '#d1d5db'};
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#dc2626' : '#166534'};
    box-shadow: 0 0 0 3px ${props => props.error ? 'rgba(220, 38, 38, 0.1)' : 'rgba(22, 101, 52, 0.1)'};
  }
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #374151;
`;

const CheckboxInput = styled.input`
  width: 1rem;
  height: 1rem;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  cursor: pointer;
  
  &:checked {
    background-color: #166534;
    border-color: #166534;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SubmitButton = styled.button`
  flex: 1;
  background-color: #166534;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #15803d;
  }
  
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  flex: 1;
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  padding: 1rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #e5e7eb;
  }
`;

const ProductForm = ({ product, onClose, onSubmitSuccess }) => {
  const { createProduct, updateProduct, loading } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    scientific_name: '',
    family: '',
    description: '',
    price: '',
    image: '',
    inStock: true,
    rating: 5
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  // Cargar datos del producto si estamos editando
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        scientific_name: product.scientific_name || '',
        family: product.family || '',
        description: product.description || '',
        price: product.price || '',
        image: product.image || '',
        inStock: product.inStock !== undefined ? product.inStock : true,
        rating: product.rating || 5
      });
      if (product.image) {
        setImagePreview(product.image);
      }
    }
  }, [product]);

  // Actualizar preview cuando cambia la URL de la imagen
  useEffect(() => {
    if (formData.image && isValidUrl(formData.image)) {
      setImagePreview(formData.image);
    } else {
      setImagePreview('');
    }
  }, [formData.image]);

  const validate = () => {
    const newErrors = {};
    
    // Validación de nombre (OBLIGATORIO)
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del producto es requerido';
    } else if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }
    
    // Validación de nombre científico (OBLIGATORIO)
    if (!formData.scientific_name.trim()) {
      newErrors.scientific_name = 'El nombre científico es requerido';
    } else if (formData.scientific_name.length < 3) {
      newErrors.scientific_name = 'El nombre científico debe tener al menos 3 caracteres';
    }
    
    // Validación de familia (OBLIGATORIO)
    if (!formData.family.trim()) {
      newErrors.family = 'La familia botánica es requerida';
    } else if (formData.family.length < 3) {
      newErrors.family = 'La familia debe tener al menos 3 caracteres';
    }
    
    // Validación de precio (OBLIGATORIO)
    if (!formData.price) {
      newErrors.price = 'El precio es requerido';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser un número mayor a 0';
    }
    
    // Validación de imagen (OBLIGATORIO)
    if (!formData.image.trim()) {
      newErrors.image = 'La URL de la imagen es requerida';
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = 'Ingresa una URL válida (debe comenzar con http:// o https://)';
    } else if (!isImageUrl(formData.image)) {
      newErrors.image = 'La URL debe apuntar a una imagen (jpg, png, gif, webp)';
    }
    
    // Validación de descripción (OPCIONAL, pero si se llena, mínimo 10 caracteres)
    if (formData.description.trim() && formData.description.length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres (o dejarla vacía)';
    }
    
    return newErrors;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  };

  const isImageUrl = (url) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const urlLower = url.toLowerCase();
    return imageExtensions.some(ext => urlLower.includes(ext));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Función para sugerir imágenes de prueba
  const suggestTestImage = () => {
    const testImages = [
      'https://images.unsplash.com/photo-1597848212624-e6d4bd0be1a0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518495977342-4751be0f01e0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1463946377180-f5185c2783e5?w=400&h=300&fit=crop'
    ];
    const randomImage = testImages[Math.floor(Math.random() * testImages.length)];
    
    setFormData(prev => ({
      ...prev,
      image: randomImage
    }));
    setImagePreview(randomImage);
    
    if (errors.image) {
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
      // Scroll al primer error
      const firstError = Object.keys(validationErrors)[0];
      const element = document.querySelector(`[name="${firstError}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      
      return;
    }
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating)
    };
    
    let result;
    if (product) {
      // Actualizar producto existente
      result = await updateProduct(product.id, productData);
    } else {
      // Crear nuevo producto
      result = await createProduct(productData);
    }
    
    if (result.success) {
      if (onSubmitSuccess) {
        onSubmitSuccess(result.data);
      }
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* 1. Nombre del producto (OBLIGATORIO) */}
      <FormGroup>
        <Label>
          <FiPackage />
          Nombre del producto *
        </Label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: Yerba Mate, Rosa Blanca, Lavanda"
          error={errors.name}
          disabled={loading}
        />
        {errors.name && (
          <ErrorMessage>
            <FiX size={12} />
            {errors.name}
          </ErrorMessage>
        )}
      </FormGroup>

      {/* 2. Nombre científico (OBLIGATORIO) */}
      <FormGroup>
        <Label>
          <FiBook />
          Nombre científico *
        </Label>
        <Input
          type="text"
          name="scientific_name"
          value={formData.scientific_name}
          onChange={handleChange}
          placeholder="Ej: Ilex paraguariensis, Rosa rubiginosa, Lavandula angustifolia"
          error={errors.scientific_name}
          disabled={loading}
        />
        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
          Ejemplo: Laurus nobilis, Bellis perennis, Helianthus annuus.
        </div>
        {errors.scientific_name && (
          <ErrorMessage>
            <FiX size={12} />
            {errors.scientific_name}
          </ErrorMessage>
        )}
      </FormGroup>

      {/* 3. Familia botánica (OBLIGATORIO) */}
      <FormGroup>
        <Label>
          <FiTag />
          Familia botánica *
        </Label>
        <Input
          type="text"
          name="family"
          value={formData.family}
          onChange={handleChange}
          placeholder="Ej: Aquifoliaceae, Rosaceae, Lamiaceae"
          error={errors.family}
          disabled={loading}
        />
        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
          Se usará como filtro en el catálogo.
        </div>
        {errors.family && (
          <ErrorMessage>
            <FiX size={12} />
            {errors.family}
          </ErrorMessage>
        )}
      </FormGroup>

      {/* 4. Descripción (OPCIONAL) */}
      <FormGroup>
        <Label>
          <FiFileText />
          Descripción (opcional)
        </Label>
        <TextArea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe el producto en detalle. Mínimo 10 caracteres."
          error={errors.description}
          disabled={loading}
          rows="4"
        />
        <div style={{ 
          fontSize: '0.75rem', 
          color: formData.description.length >= 10 ? '#166534' : '#6b7280',
          marginTop: '0.25rem',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>{formData.description.length} caracteres</span>
          <span>{formData.description.length > 0 && formData.description.length < 10 ? 
            `Faltan ${10 - formData.description.length} caracteres para mínimo` : 
            ''}
          </span>
        </div>
        {errors.description && (
          <ErrorMessage>
            <FiX size={12} />
            {errors.description}
          </ErrorMessage>
        )}
      </FormGroup>

      {/* 5. Precio (OBLIGATORIO) */}
      <FormGroup>
        <Label>
          <FiDollarSign />
          Precio *
        </Label>
        <Input
          type="number"
          step="0.01"
          min="0.01"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Ej: 29.99"
          error={errors.price}
          disabled={loading}
        />
        {errors.price && (
          <ErrorMessage>
            <FiX size={12} />
            {errors.price}
          </ErrorMessage>
        )}
      </FormGroup>

      {/* 6. Imagen (OBLIGATORIO) */}
      <FormGroup>
        <Label>
          <FiImage />
          Imagen *
        </Label>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Por favor, introduzca la URL de la imagen"
            error={errors.image}
            disabled={loading}
            style={{ flex: 1 }}
          />
          <button
            type="button"
            onClick={suggestTestImage}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              whiteSpace: 'nowrap'
            }}
            disabled={loading}
          >
            <FiGlobe style={{ marginRight: '0.25rem' }} />
            Sugerir URL
          </button>
        </div>
        
        {errors.image && (
          <ErrorMessage>
            <FiX size={12} />
            {errors.image}
          </ErrorMessage>
        )}
        
        {imagePreview && !errors.image && (
          <div style={{ marginTop: '1rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              Vista previa:
            </p>
            <div style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '2px solid #e5e7eb'
            }}>
              <img 
                src={imagePreview} 
                alt="Vista previa" 
                style={{ 
                  width: '100%', 
                  height: '200px',
                  objectFit: 'cover',
                  display: 'block'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div style="
                      width: 100%; 
                      height: 200px; 
                      background: #fef2f2; 
                      display: flex; 
                      flex-direction: column; 
                      align-items: center; 
                      justify-content: center; 
                      color: #dc2626;
                      padding: 1rem;
                      text-align: center;
                    ">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <p style="margin-top: 0.5rem; font-size: 0.875rem;">
                        No se pudo cargar la imagen<br/>
                        Verifica que la URL sea correcta
                      </p>
                    </div>
                  `;
                }}
              />
            </div>
          </div>
        )}
        
        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
          <strong>Sugerencias:</strong> Usa imágenes con extensiones .jpg, .png, .gif, .webp
        </div>
      </FormGroup>

      {/* 7. Stock (OPCIONAL - por defecto true) */}
      <CheckboxContainer>
        <CheckboxLabel>
          <CheckboxInput
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
            disabled={loading}
          />
          Producto disponible en stock
        </CheckboxLabel>
      </CheckboxContainer>

      {/* 8. Rating (OPCIONAL - por defecto 5) */}
      <FormGroup>
        <Label>
          <FiStar />
          Rating (1-5) - opcional
        </Label>
        <Select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="5">5 ★★★★★ - Excelente</option>
          <option value="4">4 ★★★★ - Muy buena</option>
          <option value="3">3 ★★★ - Buena</option>
          <option value="2">2 ★★ - Regular</option>
          <option value="1">1 ★ - Mala calidad</option>
        </Select>
        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
          Calidad del producto según reseñas. Por defecto: Excelente.
        </div>
      </FormGroup>

      {/* Botones de acción */}
      <ButtonGroup>
        <CancelButton type="button" onClick={onClose} disabled={loading}>
          <FiX />
          Cancelar
        </CancelButton>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Procesando...' : (
            <>
              <FiCheck />
              {product ? 'Actualizar Producto' : 'Crear Producto'}
            </>
          )}
        </SubmitButton>
      </ButtonGroup>
    </Form>
  );
};

export default ProductForm;