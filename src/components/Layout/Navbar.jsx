// src/components/Layout/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const location = useLocation();

  return (
    <header style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link 
          to="/" 
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#166534',
            textDecoration: 'none'
          }}
        >
          El Brote Verde
        </Link>

        {/* Navegación */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link 
            to="/" 
            style={{
              color: location.pathname === '/' ? '#166534' : '#6b7280',
              textDecoration: 'none',
              fontWeight: location.pathname === '/' ? '600' : '400'
            }}
          >
            Inicio
          </Link>
          <Link 
            to="/catalogo" 
            style={{
              color: location.pathname === '/catalogo' ? '#166534' : '#6b7280',
              textDecoration: 'none',
              fontWeight: location.pathname === '/catalogo' ? '600' : '400'
            }}
          >
            Catálogo
          </Link>
          
          {/* Carrito (solo icono) */}
          <Link 
            to="/carrito" 
            style={{
              position: 'relative',
              color: '#6b7280',
              textDecoration: 'none',
              padding: '0.5rem'
            }}
          >
            🛒
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                backgroundColor: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.7rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {totalItems}
              </span>
            )}
          </Link>

          {/* Login */}
          <Link 
            to="/login"
            style={{
              backgroundColor: '#166534',
              color: 'white',
              padding: '0.5rem 1.5rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Iniciar Sesión
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;