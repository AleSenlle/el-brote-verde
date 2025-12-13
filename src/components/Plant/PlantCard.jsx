// src/components/Plant/PlantCard.jsx (CORREGIDO)
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { 
  FiShoppingCart, 
  FiStar, 
  FiPackage, 
  FiTag,
  FiPlus
} from 'react-icons/fi';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
`;

const ToastMessage = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #166534;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  z-index: 10;
  animation: fadeInOut 2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(-10px); }
    20% { opacity: 1; transform: translateY(0); }
    80% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-10px); }
  }
`;

const ImageContainer = styled.div`
  height: 200px;
  background-color: #f3f4f6;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #166534;
  font-size: 3rem;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PlantName = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
`;

const ScientificName = styled.p`
  font-style: italic;
  color: #6b7280;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FamilyTag = styled.span`
  background-color: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #e5e7eb;
`;

const StockTag = styled.span`
  background-color: ${props => props.inStock ? '#dcfce7' : '#fef2f2'};
  color: ${props => props.inStock ? '#166534' : '#dc2626'};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${props => props.inStock ? '#bbf7d0' : '#fecaca'};
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: auto;
`;

const Stars = styled.div`
  color: #fbbf24;
  display: flex;
  gap: 0.125rem;
  font-size: 0.9rem;
`;

const RatingText = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
  margin-left: 0.5rem;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
`;

const Price = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #166534;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &::before {
    content: "$";
    font-size: 1rem;
    font-weight: normal;
  }
`;

const AddButton = styled.button`
  background-color: ${props => props.inStock ? '#166534' : '#d1d5db'};
  color: white;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  font-weight: 600;
  cursor: ${props => props.inStock ? 'pointer' : 'not-allowed'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  
  &:hover {
    background-color: ${props => props.inStock ? '#15803d' : '#d1d5db'};
    transform: ${props => props.inStock ? 'translateY(-2px)' : 'none'};
  }
  
  &:active {
    transform: ${props => props.inStock ? 'translateY(0)' : 'none'};
  }
  
  &:disabled {
    opacity: 0.5;
  }
`;

const PlantCard = ({ plant }) => {
  const { addToCart, getItemQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const [showMessage, setShowMessage] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const currentQuantity = getItemQuantity(plant.id);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    if (!plant.inStock) return;

    setIsAdding(true);
    
    // Preparar datos para el carrito
    const productToAdd = {
      ...plant,
      name: plant.common_name || plant.name,
      scientific_name: plant.scientific_name,
      price: typeof plant.price === 'string' ? parseFloat(plant.price) : plant.price
    };
    
    addToCart(productToAdd);
    setShowMessage(true);
    
    setTimeout(() => {
      setShowMessage(false);
      setIsAdding(false);
    }, 2000);
  };

  return (
    <Card>
      {/* Mensaje temporal de confirmación */}
      {showMessage && (
        <ToastMessage>
          <FiShoppingCart />
          ¡Agregado al carrito!
        </ToastMessage>
      )}

      {/* Imagen de la planta */}
      <ImageContainer>
         {(plant.image_url || plant.image) ? (
          <img 
            src={plant.image_url || plant.image} 
            alt={plant.common_name || plant.name}
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
                  color: #166534;
                ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              `;
            }}
          />
        ) : (
          <PlaceholderImage>
            <FiPackage size={48} />
          </PlaceholderImage>
        )}
      </ImageContainer>

      {/* Información de la planta */}
      <CardContent>
        <PlantName>{plant.common_name || plant.name}</PlantName>
        <ScientificName>
          {plant.scientific_name || plant.description?.substring(0, 50) || 'Sin nombre científico'}
        </ScientificName>
        
        <TagsContainer>
          <FamilyTag>
            <FiTag size={12} />
            {plant.family || 'Familia no especificada'}
          </FamilyTag>
          <StockTag inStock={plant.inStock}>
            <FiPackage size={12} />
            {plant.inStock ? 'En stock' : 'Sin stock'}
          </StockTag>
        </TagsContainer>

        {/* Rating */}
        <RatingContainer>
          <Stars>
            {'★'.repeat(Math.floor(plant.rating || 0))}
            {'☆'.repeat(5 - Math.floor(plant.rating || 0))}
          </Stars>
          <RatingText>({plant.rating?.toFixed(1) || '0.0'})</RatingText>
        </RatingContainer>

        {/* Precio y botón */}
        <PriceContainer>
          <Price>{plant.price?.toFixed(2) || '0.00'}</Price>
          
          <AddButton
            onClick={handleAddToCart}
            disabled={!plant.inStock || isAdding || !isAuthenticated}
            inStock={plant.inStock && isAuthenticated}
            title={!isAuthenticated ? 'Inicia sesión para comprar' : !plant.inStock ? 'Producto sin stock' : 'Agregar al carrito'}
            aria-label={!isAuthenticated ? 'Inicia sesión para comprar' : !plant.inStock ? 'Producto sin stock' : `Agregar ${plant.common_name} al carrito`}
          >
            {!isAuthenticated ? (
              'Inicia sesión'
            ) : isAdding ? (
              'Agregando...'
            ) : !plant.inStock ? (
              'Sin stock'
            ) : currentQuantity > 0 ? (
              `Agregar (${currentQuantity})`
            ) : (
              <>
                <FiPlus />
                Agregar
              </>
            )}
          </AddButton>
        </PriceContainer>
      </CardContent>
    </Card>
  );
};

export default PlantCard;