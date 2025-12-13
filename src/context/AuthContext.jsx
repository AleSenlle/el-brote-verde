// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAuth = localStorage.getItem('isAuthenticated');
    
    if (savedAuth === 'true' && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      }
    }
    setLoading(false);
  }, []);

  // Login simulado con validación básica
  const login = (email, password) => {
    // Simulación de validación
    if (!email || !password) {
      toast.error('Email y contraseña son requeridos');
      return { success: false };
    }

    // Credenciales de prueba (en producción esto vendría de una API)
    const mockUsers = [
      { id: 1, email: 'admin@test.com', password: 'admin123', name: 'Administrador', role: 'admin' },
      { id: 2, email: 'user@test.com', password: 'user123', name: 'Usuario Demo', role: 'user' }
    ];

    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role
      };

      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      setUser(userData);
      setIsAuthenticated(true);
      
      toast.success(`¡Bienvenido ${foundUser.name}!`);
      return { success: true, user: userData };
    } else {
      toast.error('Credenciales incorrectas');
      return { success: false };
    }
  };

  // Registro simulado
  const register = (userData) => {
    const { name, email, password, confirmPassword } = userData;
    
    // Validaciones básicas
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return { success: false };
    }

    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return { success: false };
    }

    // Simular creación de usuario
    const newUser = {
      id: Date.now(), // ID temporal
      email,
      name,
      role: 'user'
    };

    // Guardar en localStorage
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('isAuthenticated', 'true');
    
    setUser(newUser);
    setIsAuthenticated(true);
    
    toast.success(`¡Cuenta creada exitosamente, ${name}!`);
    return { success: true, user: newUser };
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setUser(null);
    setIsAuthenticated(false);
    toast.info('Sesión cerrada correctamente');
  };

  // Verificar si el usuario es admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};