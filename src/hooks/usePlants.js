// src/hooks/usePlants.js (VERSIÓN CON AMBAS FUENTES)
import { useState, useEffect, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';

const usePlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Obtener productos de MockAPI desde el contexto
  const { products: mockProducts, loading: productsLoading } = useProducts();

  // Función para enriquecer datos de Trefle (si está disponible)
  const fetchTreflePlants = async () => {
    try {
      const response = await fetch('/api/plants?token=wy8x1PrPHvUgOeWxty9TCfyA8PiOqgaI-tUEPNWapss&page=1&per_page=20');
      
      if (!response.ok) {
        throw new Error(`Trefle API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Función para generar precio mock (Trefle no tiene precios)
      const generateMockPrice = (plant) => {
        const priceRanges = {
          'Rosaceae': { min: 25, max: 60 },
          'Asteraceae': { min: 15, max: 35 },
          'Lamiaceae': { min: 12, max: 30 },
          'Poaceae': { min: 8, max: 20 },
          'Orchidaceae': { min: 30, max: 80 },
        };

        const range = priceRanges[plant.family] || { min: 10, max: 40 };
        return (Math.random() * (range.max - range.min) + range.min).toFixed(2);
      };
      
      // Enriquecer datos de Trefle
      return (data.data || []).map(plant => ({
        id: `trefle-${plant.id}`,
        common_name: plant.common_name || 'Planta sin nombre común',
        scientific_name: plant.scientific_name,
        family: plant.family || 'Familia desconocida',
        image_url: plant.image_url,
        price: parseFloat(generateMockPrice(plant)),
        inStock: Math.random() > 0.1,
        rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
        source: 'trefle'
      })).filter(plant => plant.common_name !== 'Planta sin nombre común');

    } catch (trefleError) {
      // Trefle no disponible, usando solo MockAPI
      return [];
    }
  };

  // Convertir productos de MockAPI al formato de plantas
  const convertMockProductsToPlants = (mockProducts) => {
    if (!mockProducts || !Array.isArray(mockProducts)) return [];
    
    return mockProducts.map(product => ({
      id: `mockapi-${product.id}`,
      common_name: product.name,
      scientific_name: product.scientific_name || 'Sin nombre científico',
      family: product.family || 'Familia no especificada',
      image_url: product.image || product.image_url || null,
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      inStock: product.inStock !== undefined ? product.inStock : true,
      rating: typeof product.rating === 'string' ? parseFloat(product.rating) : (product.rating || 4.0),
      description: product.description,
      source: 'mockapi',
      createdAt: product.createdAt
    }));
  };

  useEffect(() => {
    const loadPlants = async () => {
      // Si los productos de MockAPI aún están cargando, esperar
      if (productsLoading) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // 1. Plantas de MockAPI (siempre)
        const mockPlants = convertMockProductsToPlants(mockProducts || []);

        // 2. Intentar cargar Trefle (solo si no estamos en admin)
        let treflePlants = [];
        const isAdminPage = window.location.pathname.includes('/admin');

        if (!isAdminPage) {
          try {
            treflePlants = await fetchTreflePlants();
          } catch (error) {
            // Error con Trefle, continuando sin él
          }
        }

        // 3. Combinar (MockAPI primero, luego Trefle)
        const allPlants = [...mockPlants, ...treflePlants];

        if (allPlants.length === 0) {
          setError('No se pudieron cargar plantas de ninguna fuente');
        } else {
          setPlants(allPlants);
        }

      } catch (err) {
        setError('Error al cargar las plantas. ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPlants();
  }, [mockProducts, productsLoading]);

  // Memoizar las plantas para evitar recálculos innecesarios
  const memoizedPlants = useMemo(() => plants, [plants]);

  return { 
    plants: memoizedPlants, 
    loading, 
    error 
  };
};

export default usePlants;