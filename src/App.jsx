// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import AdminProducts from './pages/AdminProducts';
import ProtectedRoute from './components/Common/ProtectedRoute';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/login" element={<Login />} />
          
          {/* Ruta protegida - Carrito */}
          <Route 
            path="/carrito" 
            element={
              <ProtectedRoute>
                <Carrito />
              </ProtectedRoute>
            } 
          />
          
          {/* Ruta protegida de administración */}
          <Route 
            path="/admin/products" 
            element={
              <ProtectedRoute>
                <AdminProducts />
              </ProtectedRoute>
            } 
          />
          
          {/* Ruta 404 */}
          <Route path="*" element={
            <div className="container text-center" style={{ padding: '4rem 1rem' }}>
              <h2>Página no encontrada</h2>
              <p>La página que buscas no existe.</p>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;