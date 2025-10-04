// src/components/Layout/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; // ← Importa useAuth

const Navbar = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth(); // ← Usa useAuth
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
          
          {/* Carrito - Solo mostrar si está autenticado */}
          {isAuthenticated && (
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
          )}

          {/* Mostrar estado de autenticación */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ 
                color: '#166534', 
                fontWeight: '500',
                fontSize: '0.875rem'
              }}>
                Hola, {user?.name || 'Usuario'}
              </span>
              <button
                onClick={logout}
                style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              style={{
                backgroundColor: '#166534',
                color: 'white',
                padding: '0.5rem 1.5rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#166534'}
            >
              Iniciar Sesión
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;