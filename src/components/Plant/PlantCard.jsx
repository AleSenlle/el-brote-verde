// src/components/Plant/PlantCard.jsx
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

const PlantCard = ({ plant }) => {
  const { addToCart } = useCart();
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = () => {
    addToCart(plant);
    setShowMessage(true);
    
    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb',
      transition: 'transform 0.2s ease',
      position: 'relative'
    }}>
      {/* Mensaje temporal de confirmación */}
      {showMessage && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: '#166534',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: '500',
          zIndex: 10,
          animation: 'fadeInOut 2s ease-in-out'
        }}>
          ✅ Agregado al Carrito
        </div>
      )}

      {/* Imagen de la planta */}
      <div style={{ height: '200px', backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
        {plant.image_url ? (
          <img 
            src={plant.image_url} 
            alt={plant.common_name}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover'
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#dcfce7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#166534'
          }}>
            <span>🌿</span>
          </div>
        )}
      </div>

      {/* Información de la planta */}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          color: '#1f2937',
          marginBottom: '0.25rem'
        }}>
          {plant.common_name}
        </h3>
        
        <p style={{ 
          fontStyle: 'italic', 
          color: '#6b7280', 
          marginBottom: '0.75rem',
          fontSize: '0.9rem'
        }}>
          {plant.scientific_name}
        </p>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <span style={{
            backgroundColor: '#f3f4f6',
            color: '#374151',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: '500'
          }}>
            {plant.family}
          </span>
          {plant.inStock ? (
            <span style={{
              backgroundColor: '#dcfce7',
              color: '#166534',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              En stock
            </span>
          ) : (
            <span style={{
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              Sin stock
            </span>
          )}
        </div>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ color: '#fbbf24' }}>
            {'★'.repeat(Math.floor(plant.rating))}
            {'☆'.repeat(5 - Math.floor(plant.rating))}
          </div>
          <span style={{ color: '#6b7280', fontSize: '0.875rem', marginLeft: '0.5rem' }}>
            ({plant.rating})
          </span>
        </div>

        {/* Precio y botón */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <span style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#166534' 
          }}>
            ${plant.price}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={!plant.inStock}
            style={{
              backgroundColor: plant.inStock ? '#166534' : '#d1d5db',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: plant.inStock ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => {
              if (plant.inStock) e.target.style.backgroundColor = '#15803d';
            }}
            onMouseOut={(e) => {
              if (plant.inStock) e.target.style.backgroundColor = '#166534';
            }}
          >
            {plant.inStock ? 'Agregar' : 'Sin stock'}
          </button>
        </div>
      </div>

      {/* Agregar animación CSS al globals.css */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-10px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default PlantCard;