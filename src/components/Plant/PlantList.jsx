// src/components/Plant/PlantList.jsx
import React from 'react';
import PlantCard from './PlantCard';
import Loading from '../Common/Loading';
import ErrorMessage from '../Common/Error';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const NoPlantsMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
  background-color: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
`;

const PlantList = ({ 
  plants = [], 
  loading = false, 
  error = null,
  showTitle = false 
}) => {
  if (loading) {
    return <Loading message="Cargando plantas..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!plants || plants.length === 0) {
    return (
      <NoPlantsMessage>
        <h3>No hay plantas para mostrar</h3>
        <p>Intenta con otros filtros o vuelve más tarde.</p>
      </NoPlantsMessage>
    );
  }

  return (
    <Container>
      {showTitle && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ 
            color: '#166534', 
            marginBottom: '0.5rem',
            fontSize: '1.5rem'
          }}>
            Plantas Disponibles
          </h2>
          <p style={{ color: '#6b7280' }}>
            {plants.length} {plants.length === 1 ? 'planta encontrada' : 'plantas encontradas'}
          </p>
        </div>
      )}
      
      <Grid>
        {plants.map(plant => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </Grid>
    </Container>
  );
};

export default PlantList;