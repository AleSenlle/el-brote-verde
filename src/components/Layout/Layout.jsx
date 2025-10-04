// src/components/Layout/Layout.jsx
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        {children}
      </main>
      <footer style={{ 
        backgroundColor: '#f9fafb', 
        padding: '2rem', 
        textAlign: 'center',
        color: '#6b7280',
        marginTop: 'auto'
      }}>
        © 2025 El Brote Verde. Todos los derechos reservados. Agradecimientos a Trefle.io por su API. Esta pagina es puramente de práctica.
      </footer>
    </div>
  );
};

export default Layout;