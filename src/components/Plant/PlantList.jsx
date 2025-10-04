// src/components/Plant/PlantList.jsx
import React from 'react';
import usePlants from '../../hooks/usePlants';
import PlantCard from './PlantCard';
import Loading from '../Common/Loading';
import ErrorMessage from '../Common/Error';

const PlantList = () => {
  const { plants, loading, error } = usePlants();

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
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#166534', marginBottom: '0.5rem' }}>Nuestro Catálogo de Plantas</h1>
        <p style={{ color: '#6b7280' }}>
          Descubre {plants.length} especies únicas para tu hogar y jardín
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {plants.map(plant => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
};

export default PlantList;