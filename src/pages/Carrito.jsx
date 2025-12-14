// src/pages/Carrito.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/Layout/SEO';
import {
  FiShoppingCart,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiArrowLeft,
  FiCreditCard,
  FiTruck,
  FiCheck
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { formatPrice, formatPriceWithCurrency } from '../utils/formatters';

const Container = styled.div`
  padding: 2rem 1rem;
  min-height: 70vh;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #166534;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const EmptyCartContainer = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  color: #9ca3af;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h2`
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const EmptyMessage = styled.p`
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1.125rem;
  max-width: 400px;
`;

const ExploreButton = styled(Link)`
  background-color: #166534;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.125rem;
  transition: background-color 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #15803d;
  }
`;

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  align-items: start;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const CartItemsContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
`;

const CartHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #166534;
  color: white;
  font-weight: 600;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f9fafb;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }
`;

const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #dcfce7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #166534;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }
`;

const ProductInfo = styled.div`
  min-width: 0;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const ProductName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    white-space: normal;
  }
`;

const ScientificName = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  font-style: italic;
  margin-bottom: 0.5rem;
`;

const FamilyBadge = styled.span`
  background-color: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const PriceColumn = styled.div`
  text-align: center;
  color: #166534;
  font-weight: 600;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
`;

const QuantityButton = styled.button`
  background-color: #f3f4f6;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #e5e7eb;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  font-weight: 600;
  min-width: 30px;
  text-align: center;
`;

const TotalColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
`;

const ItemTotal = styled.span`
  font-weight: 600;
  color: #166534;
  min-width: 80px;
  text-align: center;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #dc2626;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #fef2f2;
  }
`;

const OrderSummary = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
  position: sticky;
  top: 2rem;
  
  @media (max-width: 968px) {
    position: static;
  }
`;

const SummaryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const SummaryLabel = styled.span`
  color: #6b7280;
`;

const SummaryValue = styled.span`
  font-weight: 500;
`;

const FreeShippingMessage = styled.div`
  background-color: #f0fdf4;
  color: #166534;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 1.5rem 0;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalLabel = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
`;

const TotalAmount = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #166534;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CheckoutButton = styled.button`
  flex: 2;
  background-color: #166534;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.125rem;
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

const ClearCartButton = styled.button`
  flex: 1;
  background-color: #dc2626;
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #b91c1c;
  }
  
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ContinueShoppingLink = styled(Link)`
  display: block;
  text-align: center;
  color: #166534;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    color: #15803d;
  }
`;

const Carrito = () => {
  const { 
    cartItems, 
    totalAmount, 
    totalItems, 
    removeFromCart, 
    updateQuantity,
    clearCart,
    calculateShipping,
    calculateTotal
  } = useCart();
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const shippingCost = calculateShipping();
  const finalTotal = calculateTotal();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }
    
    // Simulación de checkout
    toast.success('¡Compra realizada exitosamente!', {
      icon: '🎉'
    });
    
    // En una app real, aquí redirigirías a una página de confirmación
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 2000);
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) {
      toast.info('El carrito ya está vacío');
      return;
    }
    
    toast.warning(
      <div>
        <p>¿Estás seguro de vaciar el carrito?</p>
        <button 
          onClick={() => {
            clearCart();
            toast.dismiss();
          }}
          style={{
            marginTop: '0.5rem',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Sí, vaciar carrito
        </button>
      </div>,
      {
        autoClose: false,
        closeOnClick: false
      }
    );
  };

  if (cartItems.length === 0) {
    return (
      <>
        <SEO 
          title="Carrito Vacío - El Brote Verde"
          description="Tu carrito de compras está vacío. Explora nuestro catálogo de plantas y encuentra la perfecta para tu hogar."
        />
        
        <Container>
          <EmptyCartContainer>
            <EmptyCartIcon>
              <FiShoppingCart size={64} />
            </EmptyCartIcon>
            <EmptyTitle>Tu carrito está vacío</EmptyTitle>
            <EmptyMessage>
              Descubre nuestras plantas y añádelas a tu carrito para comenzar tu pedido
            </EmptyMessage>
            <ExploreButton to="/catalogo">
              <FiArrowLeft />
              Explorar Catálogo
            </ExploreButton>
          </EmptyCartContainer>
        </Container>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Carrito de Compras - El Brote Verde"
        description="Revisa y gestiona tu carrito de compras. Modifica cantidades, aplica descuentos y procede al pago de manera segura."
      />
      
      <Container>
        <Title>
          <FiShoppingCart style={{ marginRight: '0.5rem' }} />
          Tu Carrito
        </Title>
        
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en el carrito
        </p>

        <CartLayout>
          {/* Lista de productos */}
          <div>
            <CartItemsContainer>
              <CartHeader>
                <div>Producto</div>
                <div style={{ textAlign: 'center' }}>Precio</div>
                <div style={{ textAlign: 'center' }}>Cantidad</div>
                <div style={{ textAlign: 'center' }}>Total</div>
              </CartHeader>
              
              <div>
                {cartItems.map(item => (
                  <CartItem key={item.id}>
                    <ProductImage>
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} />
                      ) : (
                        <span style={{ fontSize: '2rem' }}>🌿</span>
                      )}
                    </ProductImage>

                    <ProductInfo>
                      <ProductName>{item.name}</ProductName>
                      <ScientificName>{item.scientific_name}</ScientificName>
                      <FamilyBadge>{item.family}</FamilyBadge>
                    </ProductInfo>

                    <PriceColumn>${formatPrice(item.price)}</PriceColumn>

                    <QuantityControls>
                      <QuantityButton 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus />
                      </QuantityButton>
                      
                      <QuantityDisplay>{item.quantity}</QuantityDisplay>
                      
                      <QuantityButton 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <FiPlus />
                      </QuantityButton>
                    </QuantityControls>

                    <TotalColumn>
                      <ItemTotal>${formatPrice(item.price * item.quantity)}</ItemTotal>
                      <DeleteButton 
                        onClick={() => removeFromCart(item.id)}
                        title="Eliminar producto"
                      >
                        <FiTrash2 />
                      </DeleteButton>
                    </TotalColumn>
                  </CartItem>
                ))}
              </div>
            </CartItemsContainer>
          </div>

          {/* Resumen del pedido */}
          <OrderSummary>
            <SummaryTitle>
              <FiCreditCard />
              Resumen del Pedido
            </SummaryTitle>

            <div>
              <SummaryRow>
                <SummaryLabel>Productos ({totalItems})</SummaryLabel>
                <SummaryValue>${formatPrice(totalAmount)}</SummaryValue>
              </SummaryRow>

              <SummaryRow>
                <SummaryLabel>
                  <FiTruck style={{ marginRight: '0.5rem' }} />
                  Envío
                </SummaryLabel>
                <SummaryValue>
                  {shippingCost === 0 ? (
                    <span style={{ color: '#166534', fontWeight: '600' }}>Gratis</span>
                  ) : (
                    formatPriceWithCurrency(shippingCost)
                  )}
                </SummaryValue>
              </SummaryRow>

              {shippingCost > 0 && (
                <FreeShippingMessage>
                  <FiCheck />
                  <strong>¡Envío gratis!</strong> en compras mayores a $50
                </FreeShippingMessage>
              )}

              <Divider />
              
              <TotalRow>
                <TotalLabel>Total</TotalLabel>
                <TotalAmount>${formatPrice(finalTotal)}</TotalAmount>
              </TotalRow>
            </div>

            <ActionButtons>
              <CheckoutButton onClick={handleCheckout}>
                <FiCreditCard />
                Proceder al Pago
              </CheckoutButton>
              
              <ClearCartButton onClick={handleClearCart}>
                <FiTrash2 />
                Vaciar
              </ClearCartButton>
            </ActionButtons>

            <ContinueShoppingLink to="/catalogo">
              <FiArrowLeft />
              Seguir comprando
            </ContinueShoppingLink>
          </OrderSummary>
        </CartLayout>
      </Container>
    </>
  );
};

export default Carrito;