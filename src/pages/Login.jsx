// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/Layout/SEO';
import { FiUser, FiMail, FiLock, FiUserPlus, FiLogIn } from 'react-icons/fi';
import styled from 'styled-components';

const LoginContainer = styled.div`
  padding: 2rem 1rem;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #166534;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #6b7280;
  text-align: center;
  margin-bottom: 2rem;
`;

const ToggleContainer = styled.div`
  display: flex;
  background-color: #f3f4f6;
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 2rem;
`;

const ToggleButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background-color: ${props => props.active ? '#166534' : 'transparent'};
  color: ${props => props.active ? 'white' : '#6b7280'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #166534;
    box-shadow: 0 0 0 3px rgba(22, 101, 52, 0.1);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #166534;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #15803d;
  }
  
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData);
      }

      if (result.success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error en autenticación:', error);
    } finally {
      setLoading(false);
    }
  };

  const fillTestCredentials = () => {
    if (isLogin) {
      setFormData({
        email: 'user@test.com',
        password: 'user123',
        confirmPassword: '',
        name: ''
      });
    }
  };

  return (
    <>
      <SEO 
        title={isLogin ? 'Iniciar Sesión - El Brote Verde' : 'Registrarse - El Brote Verde'}
        description={isLogin ? 
          'Inicia sesión en tu cuenta de El Brote Verde. Accede a tu carrito, historial de compras y gestiona tus pedidos.' : 
          'Crea tu cuenta en El Brote Verde. Disfruta de una experiencia personalizada, guarda tus favoritos y recibe ofertas exclusivas.'
        }
      />
      
      <LoginContainer>
        <LoginCard>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title>
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </Title>
            <Subtitle>
              {isLogin ? 'Accede a tu cuenta de El Brote Verde' : 'Únete a nuestra comunidad'}
            </Subtitle>
          </div>

          {/* Toggle Login/Registro */}
          <ToggleContainer>
            <ToggleButton 
              active={isLogin}
              onClick={() => setIsLogin(true)}
            >
              <FiLogIn /> Iniciar Sesión
            </ToggleButton>
            <ToggleButton 
              active={!isLogin}
              onClick={() => setIsLogin(false)}
            >
              <FiUserPlus /> Registrarse
            </ToggleButton>
          </ToggleContainer>

          {/* Botón para credenciales de prueba (solo en login) */}
          {isLogin && (
            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
              <button
                type="button"
                onClick={fillTestCredentials}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#166534',
                  fontSize: '0.875rem',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Usar credenciales de prueba
              </button>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <FormGroup>
                <Label>
                  <FiUser />
                  Nombre completo
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  placeholder="Tu nombre completo"
                />
              </FormGroup>
            )}

            <FormGroup>
              <Label>
                <FiMail />
                Correo electrónico
              </Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="tu@email.com"
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <FiLock />
                Contraseña
              </Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Tu contraseña"
              />
            </FormGroup>

            {!isLogin && (
              <FormGroup>
                <Label>
                  <FiLock />
                  Confirmar contraseña
                </Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={!isLogin}
                  placeholder="Confirma tu contraseña"
                />
              </FormGroup>
            )}

            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Procesando...' : (
                <>
                  {isLogin ? <FiLogIn /> : <FiUserPlus />}
                  {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </>
              )}
            </SubmitButton>
          </form>

          {/* Enlaces adicionales */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            {isLogin ? (
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                ¿No tienes cuenta?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#166534',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Regístrate aquí
                </button>
              </p>
            ) : (
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                ¿Ya tienes cuenta?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#166534',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Inicia sesión aquí
                </button>
              </p>
            )}
            
            <Link 
              to="/"
              style={{
                display: 'block',
                marginTop: '1rem',
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s ease'
              }}
            >
              ← Volver al inicio
            </Link>
          </div>
        </LoginCard>
      </LoginContainer>
    </>
  );
};

export default Login;