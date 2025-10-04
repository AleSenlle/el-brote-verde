// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Carrito from './pages/Carrito.jsx';
import Login from './pages/Login.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          
          {/* Ruta 404 para manejar URLs no encontradas */}
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