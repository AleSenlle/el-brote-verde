// src/context/ProductContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_ENDPOINTS, API_CONFIG } from '../utils/api';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener productos desde MockAPI
  const fetchProducts = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(API_ENDPOINTS.PRODUCTS, {
        params: {
          page,
          limit,
          sortBy: 'createdAt',
          order: 'desc'
        },
        ...API_CONFIG
      });

      setProducts(response.data);
      
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al cargar productos';
      setError(errorMessage);
      toast.error(`Error: ${errorMessage}`);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear nuevo producto
  const createProduct = async (productData) => {
    try {
      setLoading(true);
      
      // Validación de campos obligatorios
      if (!productData.name || !productData.name.trim()) {
        throw new Error('El nombre del producto es requerido');
      }
      if (!productData.scientific_name || !productData.scientific_name.trim()) {
        throw new Error('El nombre científico es requerido');
      }
      if (!productData.family || !productData.family.trim()) {
        throw new Error('La familia botánica es requerida');
      }
      if (!productData.price || productData.price <= 0) {
        throw new Error('El precio es requerido y debe ser mayor a 0');
      }
      if (!productData.image || !productData.image.trim()) {
        throw new Error('La URL de la imagen es requerida');
      }

      const response = await axios.post(
        API_ENDPOINTS.PRODUCTS, 
        {
          ...productData,
          createdAt: new Date().toISOString()
        },
        API_CONFIG
      );

      setProducts(prev => [response.data, ...prev]);
      toast.success('✅ Producto creado exitosamente');
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al crear producto';
      toast.error(`❌ Error: ${errorMessage}`);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar producto
  const updateProduct = async (id, productData) => {
    try {
      setLoading(true);
      
      // Validación de campos obligatorios
      if (!productData.name || !productData.name.trim()) {
        throw new Error('El nombre del producto es requerido');
      }
      if (!productData.scientific_name || !productData.scientific_name.trim()) {
        throw new Error('El nombre científico es requerido');
      }
      if (!productData.family || !productData.family.trim()) {
        throw new Error('La familia botánica es requerida');
      }
      if (!productData.price || productData.price <= 0) {
        throw new Error('El precio es requerido y debe ser mayor a 0');
      }
      if (!productData.image || !productData.image.trim()) {
        throw new Error('La URL de la imagen es requerida');
      }

      const response = await axios.put(
        `${API_ENDPOINTS.PRODUCTS}/${id}`,
        productData,
        API_CONFIG
      );

      setProducts(prev => prev.map(p => p.id === id ? response.data : p));
      toast.success('✅ Producto actualizado exitosamente');
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al actualizar producto';
      toast.error(`❌ Error: ${errorMessage}`);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`, API_CONFIG);

      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('✅ Producto eliminado exitosamente');
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al eliminar producto';
      toast.error(`❌ Error: ${errorMessage}`);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Buscar productos
  const searchProducts = (term) => {
    setSearchTerm(term);
  };

  // Filtrar por familia
  const filterByCategory = (family) => {
    setSelectedCategory(family);
  };

  // Cargar productos al iniciar
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const value = {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductProvider');
  }
  return context;
};