// src/components/Common/Loading.jsx
import React from 'react';

const Loading = ({ message = "Cargando..." }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '3rem 1rem'
    }}>
      <div style={{
        animation: 'spin 1s linear infinite',
        border: '2px solid #e5e7eb',
        borderTop: '2px solid #166534',
        borderRadius: '50%',
        width: '4rem',
        height: '4rem',
        marginBottom: '1rem'
      }}></div>
      <p style={{ color: '#6b7280' }}>{message}</p>
    </div>
  );
};

export default Loading;