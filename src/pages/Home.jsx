// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/Layout/SEO';
import SearchBar from '../components/Common/SearchBar';
import FeatureCard from '../components/Home/FeatureCard';
import StepCard from '../components/Home/StepCard';
import { useProducts } from '../context/ProductContext';
import { formatPrice } from '../utils/formatters';
import '../styles/home.css';
import heroImage from '../assets/FondoHome.png';

const Home = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  
  const searchSuggestions = [
    'Ceibo', 'Potus', 'Girasol', 'Floripondio', 'Pata de vaca'
  ];

  return (
    <>
      <SEO 
        title="El Brote Verde - Tu tienda de plantas"
        description="Bienvenidos a nuestra tienda de plantas. Encuentra la planta perfecta para crear tu propio bosque y transforma tu espacio con la belleza de la naturaleza."
        keywords="plantas de interior, plantas de exterior, árboles, jardinería, vivero online"
      />
      
      <div className="home-container">
        {/* Hero Section con imagen principal */}
        <section className="hero-section">
          {/* Background Image con Fade Overlay */}
          <div className="hero-background">
            <img
              src={heroImage}
              alt="Bosque verde"
              className="hero-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <div style="
                    width: 100%; 
                    height: 100%; 
                    background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); 
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                  ">
                    <div style="text-align: center; color: #166534; padding: 2rem;">
                      <div style="font-size: 3rem; margin-bottom: 1rem;">🌿</div>
                      <h1 style="font-size: 2rem; margin-bottom: 0.5rem;">El Brote Verde</h1>
                      <p>Tu tienda de plantas</p>
                    </div>
                  </div>
                `;
              }}
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
              <SearchBar 
                onSearch={(term) => {
                  setSearchTerm(term);
                }}
                onSubmit={(term) => {
                  // Solo navegar cuando se presiona Enter o el botón de búsqueda
                  if (term.trim()) {
                    navigate(`/catalogo?search=${encodeURIComponent(term)}`);
                  }
                }}
                placeholder="Indicanos el nombre de la planta que buscás"
                products={products}
                showResults={true}
                debounceTime={500}
                showSubmitButton={true}
                initialValue={searchTerm}
              />
              
              {/* Sugerencias de búsqueda rápida */}
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                marginTop: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                {searchSuggestions.map((tag) => (
                  <button 
                    key={tag}
                    type="button"
                    onClick={() => navigate(`/catalogo?search=${encodeURIComponent(tag)}`)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                    onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Link to="/catalogo" className="btn-cta">
              Explorar el catálogo completo
            </Link>
          </div>
        </section>

        {/* Content Section */}
        <section className="content-section">
          <div className="content-container">
            {/* Features Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginTop: '3rem',
              padding: '0 1rem'
            }}>
              <FeatureCard
                icon="🌱"
                title="Calidad Garantizada"
                description="Todas nuestras plantas son cultivadas con cuidado y amor, asegurando la mejor calidad y salud para tu hogar."
              />

              <FeatureCard
                icon="🚚"
                title="Envío Rápido"
                description="Entregamos tus plantas en perfecto estado en 24-48 horas. Envío gratis en compras mayores a $50."
              />

              <FeatureCard
                icon="💚"
                title="Soporte Experto"
                description="Nuestros expertos en jardinería te asesoran para que tus plantas crezcan saludables y fuertes."
              />
            </div>
            
            {/* Cómo funciona */}
            <div style={{
              textAlign: 'center',
              marginTop: '4rem',
              padding: '2rem 1rem'
            }}>
              <h2 style={{
                color: '#166534',
                fontSize: '2rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>¿Cómo funciona?</h2>
              <p style={{
                color: '#6b7280',
                maxWidth: '600px',
                margin: '0 auto 2rem',
                fontSize: '1.125rem',
                lineHeight: '1.6'
              }}>
                Comprar plantas nunca fue tan fácil. Sigue estos simples pasos:
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                <StepCard
                  number="1"
                  title="Explora el catálogo"
                  description="Navega por nuestra amplia selección de plantas y encuentra la perfecta para ti."
                />

                <StepCard
                  number="2"
                  title="Realiza el pedido"
                  description="Agrega al carrito y completa el proceso de compra de forma segura y sencilla."
                />

                <StepCard
                  number="3"
                  title="Recibe tu planta"
                  description="Recibe tu planta en casa lista para ser cuidada y disfrutada."
                />
              </div>
            </div>

            {/* Catálogo destacado */}
            <div style={{
              marginTop: '4rem',
              padding: '2rem 1rem',
              textAlign: 'center'
            }}>
              <h2 style={{
                color: '#166534',
                fontSize: '2rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>Plantas Destacadas</h2>
              <p style={{
                color: '#6b7280',
                maxWidth: '600px',
                margin: '0 auto 2rem',
                fontSize: '1.125rem'
              }}>
                Algunas de nuestras plantas más populares
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1.5rem',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                {products.slice(0, 4).map((product) => (
                  <div 
                    key={product.id}
                    style={{
                      background: 'white',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{
                      width: '80px',
                      height: '80px',
                      margin: '0 auto 1rem',
                      borderRadius: '50%',
                      background: '#dcfce7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#166534',
                      fontSize: '2rem'
                    }}>
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '🌿';
                          }}
                        />
                      ) : '🌿'}
                    </div>
                    <h4 style={{
                      color: '#1f2937',
                      marginBottom: '0.5rem',
                      fontSize: '1rem'
                    }}>{product.name}</h4>
                    <p style={{
                      color: '#166534',
                      fontWeight: '600',
                      fontSize: '0.875rem'
                    }}>${formatPrice(product.price)}</p>
                  </div>
                ))}
              </div>
              
              {products.length === 0 && (
                <p style={{
                  color: '#6b7280',
                  fontStyle: 'italic',
                  marginTop: '1rem'
                }}>
                  Agrega plantas desde el panel de administración para verlas destacadas aquí
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Call to Action final */}
        <section style={{
          background: 'linear-gradient(135deg, #166534 0%, #15803d 100%)',
          color: 'white',
          padding: '4rem 1rem',
          textAlign: 'center',
          marginTop: '4rem'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '1rem',
            fontWeight: '600'
          }}>
            ¿Listo para transformar tu espacio?
          </h2>
          <p style={{ 
            maxWidth: '600px', 
            margin: '0 auto 2rem',
            opacity: '0.9',
            fontSize: '1.125rem',
            lineHeight: '1.6'
          }}>
            Únete a miles de personas que ya han llevado la naturaleza a sus hogares con nuestras plantas.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link 
              to="/catalogo" 
              style={{
                background: 'white',
                color: '#166534',
                padding: '1rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-block',
                transition: 'all 0.2s ease',
                border: '2px solid transparent'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Explorar Catálogo
            </Link>
            <Link 
              to="/login" 
              style={{
                background: 'transparent',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-block',
                transition: 'all 0.2s ease',
                border: '2px solid rgba(255,255,255,0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.borderColor = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.background = 'transparent';
                e.target.style.borderColor = 'rgba(255,255,255,0.3)';
              }}
            >
              Crear Cuenta
            </Link>
          </div>
          <p style={{ 
            marginTop: '2rem',
            fontSize: '0.875rem',
            opacity: '0.8'
          }}>
            Envío gratis en pedidos mayores a $50 • Soporte 24/7 • Garantía de satisfacción
          </p>
        </section>
      </div>
    </>
  );
};

export default Home;