// src/components/Plant/PlantList.jsx
import React, { useState, useMemo } from 'react';
import usePlants from '../../hooks/usePlants';
import PlantCard from './PlantCard';
import Loading from '../Common/Loading';
import ErrorMessage from '../Common/Error';

const PlantList = () => {
  const { plants, loading, error } = usePlants();
  
  // Estados para filtros
  const [selectedFamily, setSelectedFamily] = useState('todas');
  const [sortBy, setSortBy] = useState('precio-asc');

  // Obtener todas las familias únicas para el filtro
  const families = useMemo(() => {
    if (!plants) return [];
    const uniqueFamilies = [...new Set(plants.map(plant => plant.family))];
    return uniqueFamilies.sort();
  }, [plants]);

  // Aplicar filtros y ordenamiento
  const filteredAndSortedPlants = useMemo(() => {
    if (!plants) return [];

    // 1. Filtrar por familia
    let filtered = plants;
    if (selectedFamily !== 'todas') {
      filtered = plants.filter(plant => plant.family === selectedFamily);
    }

    // 2. Ordenar
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'precio-asc':
          return a.price - b.price;
        case 'precio-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return sorted;
  }, [plants, selectedFamily, sortBy]);

  if (loading) {
    return <Loading message="Cargando nuestro catálogo de plantas..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!plants || plants.length === 0) {
    return (
      <div className="container text-center" style={{ padding: '4rem 1rem' }}>
        <h2>No se encontraron plantas</h2>
        <p>Intenta recargar la página o verificar tu conexión.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      {/* Header con controles */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          color: '#166534', 
          marginBottom: '0.5rem',
          fontSize: '2rem'
        }}>
          Nuestro Catálogo de Plantas
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          {filteredAndSortedPlants.length} {filteredAndSortedPlants.length === 1 ? 'planta encontrada' : 'plantas encontradas'}
        </p>

        {/* Controles de filtro */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {/* Filtro por Familia */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Filtrar por familia:
            </label>
            <select
              value={selectedFamily}
              onChange={(e) => setSelectedFamily(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: 'white',
                fontSize: '0.875rem',
                minWidth: '200px',
                cursor: 'pointer'
              }}
            >
              <option value="todas">Todas las familias</option>
              {families.map(family => (
                <option key={family} value={family}>
                  {family}
                </option>
              ))}
            </select>
          </div>

          {/* Ordenamiento */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Ordenar por:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: 'white',
                fontSize: '0.875rem',
                minWidth: '200px',
                cursor: 'pointer'
              }}
            >
              <option value="precio-asc">Precio: Menor a mayor</option>
              <option value="precio-desc">Precio: Mayor a menor</option>
              <option value="rating">Mejor rating</option>
            </select>
          </div>

          {/* Botón reset (opcional) */}
          {(selectedFamily !== 'todas' || sortBy !== 'precio-asc') && (
            <div style={{ alignSelf: 'flex-end' }}>
              <button
                onClick={() => {
                  setSelectedFamily('todas');
                  setSortBy('precio-asc');
                }}
                style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              >
                Resetear filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid de plantas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredAndSortedPlants.map(plant => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>

      {/* Mensaje si no hay resultados */}
      {filteredAndSortedPlants.length === 0 && selectedFamily !== 'todas' && (
        <div style={{
          textAlign: 'center',
          padding: '3rem 1rem',
          color: '#6b7280'
        }}>
          <p>No se encontraron plantas de la familia "{selectedFamily}"</p>
          <button
            onClick={() => setSelectedFamily('todas')}
            style={{
              backgroundColor: '#166534',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Ver todas las plantas
          </button>
        </div>
      )}
    </div>
  );
};

export default PlantList;