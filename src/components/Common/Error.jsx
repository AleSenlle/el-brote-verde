// src/components/Common/Error.jsx
import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div style={{
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '8px',
      padding: '1.5rem',
      textAlign: 'center',
      margin: '2rem 1rem'
    }}>
      <div style={{ color: '#dc2626', fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
      <h3 style={{ color: '#991b1b', fontWeight: '600', marginBottom: '0.5rem' }}>
        Ocurrió un error
      </h3>
      <p style={{ color: '#b91c1c', marginBottom: '1rem' }}>{message}</p>
      <button 
        onClick={() => window.location.reload()}
        style={{
          backgroundColor: '#dc2626',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Reintentar
      </button>
    </div>
  );
};

export default ErrorMessage;