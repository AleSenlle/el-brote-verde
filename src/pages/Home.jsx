// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section con imagen principal */}
      <section className="hero-section">
        {/* Background Image con Fade Overlay */}
        <div className="hero-background">
          <img
            src="/src/assets/FondoHome.png"
            alt="Bosque verde"
            className="hero-image"
          />
          <div className="fade-overlay"></div>
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">Bienvenidos al Brote Verde</h1>
          <p className="hero-description">
            Encuentra la planta o árbol para crear tu propio bosque. 
            Explora nuestra amplia selección y transforma tu espacio con la belleza de la naturaleza.
          </p>

          {/* Search Bar */}
          <div className="search-container">
            <input 
              type="text" 
              placeholder="¿Qué planta estás buscando?" 
              className="search-input" 
            />
            <button className="search-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>

          {/* CTA Button */}
          <Link to="/catalogo" className="btn-cta">
            Explorar el catálogo
          </Link>
        </div>
      </section>

      {/* Content Section para sumar cosas después... */}
      <section className="content-section">
        <div className="content-container">
          {/* Acá se puedem agregar mas cosas a futuro */}
        </div>
      </section>
    </div>
  );
};

export default Home;