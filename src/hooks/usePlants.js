// src/hooks/usePlants.js
import { useState, useEffect } from 'react';

const usePlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Función para enriquecer datos de Trefle
  const enrichPlantData = (plantData) => {
    if (!plantData || !Array.isArray(plantData)) return [];
    
    return plantData.map(plant => ({
      id: plant.id,
      common_name: plant.common_name || 'Planta sin nombre común',
      scientific_name: plant.scientific_name,
      family: plant.family || 'Familia desconocida',
      image_url: plant.image_url,
      price: parseFloat(generateMockPrice(plant)),
      inStock: Math.random() > 0.1,
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    })).filter(plant => plant.common_name !== 'Planta sin nombre común'); // Filtrar plantas sin nombre
  };

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Iniciando petición a Trefle API...');
        
        // Usamos el proxy configurado en vite.config.js
        const response = await fetch('/api/plants?token=wy8x1PrPHvUgOeWxty9TCfyA8PiOqgaI-tUEPNWapss&page=1&per_page=20');
        
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ Datos recibidos de Trefle:', data);
        
        if (!data.data) {
          throw new Error('La API no devolvió datos en el formato esperado');
        }

        const enrichedPlants = enrichPlantData(data.data);
        console.log('🌿 Plantas enriquecidas:', enrichedPlants);
        
        setPlants(enrichedPlants);
        
      } catch (err) {
        console.error('❌ Error fetching plants:', err);
        setError(`Error al cargar plantas: ${err.message}`);
        
        // Fallback a datos mock si la API falla
        const mockPlants = [
          {
            id: 1,
            common_name: "Rosa",
            scientific_name: "Rosa rubiginosa",
            family: "Rosaceae",
            image_url: "https://images.unsplash.com/photo-1518495977342-4751be0f01e0?w=300",
            price: 29.99,
            inStock: true,
            rating: 4.5
          },
          {
            id: 2,
            common_name: "Lavanda", 
            scientific_name: "Lavandula angustifolia",
            family: "Lamiaceae",
            image_url: "https://images.unsplash.com/photo-1597848212624-e6d4bd0be1a0?w=300",
            price: 19.99,
            inStock: true,
            rating: 4.2
          }
        ];
        setPlants(mockPlants);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  return { plants, loading, error };
};

export default usePlants;