// src/components/Common/OptimizedImage.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { COLORS } from '../../utils/theme';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${COLORS.gray100};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.$loaded ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  position: relative;
  z-index: 2;
`;

const BlurImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(20px);
  transform: scale(1.1);
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  z-index: 1;
`;

const Skeleton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    ${COLORS.gray200} 0%,
    ${COLORS.gray100} 20%,
    ${COLORS.gray200} 40%,
    ${COLORS.gray200} 100%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.5s linear infinite;
  display: ${props => props.$show ? 'block' : 'none'};
  z-index: 1;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${props => props.$show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${COLORS.primaryLight} 0%, ${COLORS.primaryLighter} 100%);
  color: ${COLORS.primary};
  font-size: 2.5rem;
  z-index: 1;
`;

const ErrorPlaceholder = styled(Placeholder)`
  background: linear-gradient(135deg, ${COLORS.gray100} 0%, ${COLORS.gray200} 100%);
  color: ${COLORS.gray400};
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1rem;
`;

/**
 * Componente de imagen optimizado con lazy loading, WebP support y blur placeholder
 * @param {string} src - URL de la imagen
 * @param {string} webpSrc - URL de la versión WebP (opcional)
 * @param {string} blurSrc - URL de la versión tiny/blur (opcional)
 * @param {string} alt - Texto alternativo
 * @param {string} placeholderIcon - Icono a mostrar mientras carga (default: 🌿)
 * @param {boolean} lazy - Activar lazy loading (default: true)
 * @param {string} rootMargin - Margen para el IntersectionObserver (default: '200px')
 * @param {function} onLoad - Callback cuando la imagen carga
 * @param {function} onError - Callback cuando falla la carga
 */
const OptimizedImage = ({
  src,
  webpSrc,
  blurSrc,
  alt = '',
  placeholderIcon = '🌿',
  lazy = true,
  rootMargin = '200px',
  onLoad,
  onError,
  className,
  style
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(!lazy);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!lazy || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [lazy, rootMargin, isVisible]);

  const handleLoad = (e) => {
    setLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setLoaded(true);
    setError(true);
    if (onError) onError(e);
  };

  return (
    <ImageContainer className={className} style={style} ref={containerRef}>
      {/* Skeleton loading (solo si no hay blurSrc y no ha cargado) */}
      <Skeleton $show={!loaded && !blurSrc && !error} />

      {/* Blur Placeholder (si existe) */}
      {blurSrc && (
        <BlurImage 
          src={blurSrc} 
          $visible={!loaded && !error} 
          alt="" 
          aria-hidden="true"
        />
      )}

      {/* Error State */}
      <ErrorPlaceholder $show={error}>
        <span>🥀</span>
        <span>No disponible</span>
      </ErrorPlaceholder>

      {/* Main Image */}
      {(isVisible || !lazy) && !error && (
        <picture>
          {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
          <StyledImage
            src={src}
            alt={alt}
            $loaded={loaded}
            onLoad={handleLoad}
            onError={handleError}
            loading="eager"
          />
        </picture>
      )}
    </ImageContainer>
  );
};

export default OptimizedImage;
