// src/components/Layout/Navbar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CartWidget from '../Cart/CartWidget'; // IMPORTAR CartWidget
import { 
  FiHome, 
  FiGrid, 
  FiUser, 
  FiLogOut,
  FiLogIn,
  FiPackage
} from 'react-icons/fi';
import styled from 'styled-components';

const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #166534;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #15803d;
  }
`;

const LogoIcon = styled.span`
  font-size: 1.8rem;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.active ? '#166534' : '#6b7280'};
  text-decoration: none;
  font-weight: ${props => props.active ? '600' : '400'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;
  padding: 0.5rem;
  border-radius: 6px;
  
  &:hover {
    color: #166534;
    background-color: #f0fdf4;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const UserName = styled.span`
  color: #166534;
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoutButton = styled.button`
  background-color: #dc2626;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #b91c1c;
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const LoginButton = styled(Link)`
  background-color: #166534;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #15803d;
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem 1rem;
    font-size: 0.875rem;
  }
`;

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Header>
      <NavContainer>
        {/* Logo */}
        <Logo to="/">
          <LogoIcon>🌿</LogoIcon>
          El Brote Verde
        </Logo>

        {/* Navegación */}
        <Nav>
          <NavLink to="/" active={location.pathname === '/'}>
            <FiHome />
            <span>Inicio</span>
          </NavLink>
          
          <NavLink to="/catalogo" active={location.pathname === '/catalogo'}>
            <FiGrid />
            <span>Catálogo</span>
          </NavLink>
          
          {/* Carrito - Solo mostrar si está autenticado */}
          {isAuthenticated && <CartWidget />}

          {/* Estado de autenticación */}
          {isAuthenticated ? (
            <UserInfo>
              <UserName>
                <FiUser />
                Hola, {user?.name || 'Usuario'}
              </UserName>
              
              {/* Enlace a administración si es admin */}
              {user?.role === 'admin' && (
                <NavLink to="/admin/products" active={location.pathname.includes('/admin')}>
                  <FiPackage />
                  <span>Agregar a Catálogo</span>
                </NavLink>
              )}
              
              <LogoutButton onClick={handleLogout}>
                <FiLogOut />
                <span>Cerrar Sesión</span>
              </LogoutButton>
            </UserInfo>
          ) : (
            <LoginButton to="/login">
              <FiLogIn />
              <span>Iniciar Sesión</span>
            </LoginButton>
          )}
        </Nav>
      </NavContainer>
    </Header>
  );
};

export default Navbar;