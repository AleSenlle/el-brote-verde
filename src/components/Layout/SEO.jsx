// src/components/Layout/SEO.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import HelmetWrapper from './HelmetWrapper';

const SEO = ({ 
  title = 'El Brote Verde - Tu tienda de plantas',
  description,
  keywords = 'plantas, jardinería, naturaleza, comprar plantas, árboles, vivero, plantas de interior, plantas de exterior',
  author = 'El Brote Verde',
  ogImage = '/og-image.png',
  type = 'website',
  children
}) => {
  const location = useLocation();
  const siteUrl = window.location.origin;
  const currentUrl = `${siteUrl}${location.pathname}`;
  
  // Generar título completo
  const fullTitle = title.includes('El Brote Verde') ? title : `${title} | El Brote Verde`;
  
  // Descripción por defecto basada en la página
  let defaultDescription = description;
  if (!description) {
    switch (location.pathname) {
      case '/':
        defaultDescription = 'Bienvenidos a El Brote Verde. Encuentra la planta o árbol perfecto para crear tu propio bosque.';
        break;
      case '/catalogo':
        defaultDescription = 'Explora nuestro catálogo completo de plantas. Filtra por familia, precio y rating. Encuentra las mejores plantas para tu hogar o jardín.';
        break;
      case '/carrito':
        defaultDescription = 'Revisa tu carrito de compras. Modifica cantidades, aplica descuentos y procede al pago de manera segura.';
        break;
      case '/login':
        defaultDescription = 'Inicia sesión o regístrate en El Brote Verde. Accede a tu carrito, guarda tus favoritos y disfruta de una experiencia personalizada.';
        break;
      default:
        defaultDescription = 'Encuentra la planta perfecta para tu hogar. Amplio catálogo de plantas, árboles y accesorios de jardinería en El Brote Verde.';
    }
  }

  return (
    <HelmetWrapper>
      {/* Codificación y idioma */}
      <html lang="es" />
      <meta charSet="utf-8" />
      
      {/* Título y meta básicas */}
      <title>{fullTitle}</title>
      <meta name="description" content={defaultDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={defaultDescription} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="El Brote Verde" />
      <meta property="og:locale" content="es_ES" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@elbroteverde" />
      <meta name="twitter:creator" content="@elbroteverde" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={defaultDescription} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Favicon y app icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Theme color */}
      <meta name="theme-color" content="#166534" />
      <meta name="msapplication-TileColor" content="#166534" />
      
      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "El Brote Verde",
          "url": siteUrl,
          "description": "Tienda online de plantas y productos de jardinería",
          "publisher": {
            "@type": "Organization",
            "name": "El Brote Verde",
            "logo": {
              "@type": "ImageObject",
              "url": `${siteUrl}/logo.png`
            }
          }
        })}
      </script>
      
      {/* Children para meta tags adicionales */}
      {children}
    </HelmetWrapper>
  );
};

export default SEO;