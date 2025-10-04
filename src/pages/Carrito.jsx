// src/pages/Carrito.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

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

  const shippingCost = calculateShipping();
  const finalTotal = calculateTotal();

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ 
        textAlign: 'center', 
        padding: '4rem 1rem',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
        <h2 style={{ 
          fontSize: '2rem', 
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          Tu carrito está vacío
        </h2>
        <p style={{ 
          color: '#6b7280', 
          marginBottom: '2rem',
          fontSize: '1.125rem'
        }}>
          Descubre nuestras plantas y añadelas a tu carrito
        </p>
        <Link 
          to="/catalogo" 
          style={{
            backgroundColor: '#166534',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.125rem',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#166534'}
        >
          Explorar Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem', minHeight: '60vh' }}>
      {/* Header del carrito */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#166534',
          margin: 0
        }}>
          Tu Carrito
        </h1>
      </div>

      {/* Resumen móvil */}
      <div style={{
        backgroundColor: '#f0fdf4',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        display: 'none'
      }}
      className="mobile-summary"
      >
        <p style={{ 
          color: '#166534', 
          fontWeight: '600',
          margin: 0
        }}>
          {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en el carrito
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '2rem',
        alignItems: 'start'
      }}
      className="cart-layout"
      >
        {/* Lista de productos */}
        <div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            {/* Header de la tabla (solo desktop) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: '1rem',
              padding: '1.5rem',
              backgroundColor: '#166534',
              color: 'white',
              fontWeight: '600',
              display: 'none'
            }}
            className="cart-header"
            >
              <div>Producto</div>
              <div style={{ textAlign: 'center' }}>Precio</div>
              <div style={{ textAlign: 'center' }}>Cantidad</div>
              <div style={{ textAlign: 'center' }}>Total</div>
            </div>
            
            {/* Items del carrito */}
            <div>
              {cartItems.map(item => (
                <div key={item.id} style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto auto auto',
                  gap: '1rem',
                  alignItems: 'center',
                  padding: '1.5rem',
                  borderBottom: '1px solid #e5e7eb',
                  transition: 'background-color 0.2s ease'
                }}
                className="cart-item"
                onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  {/* Imagen */}
                  <div style={{ width: '80px', height: '80px', flexShrink: 0 }}>
                    {item.image_url ? (
                      <img 
                        src={item.image_url} 
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#dcfce7',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#166534'
                      }}>
                        🌿
                      </div>
                    )}
                  </div>

                  {/* Información del producto */}
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ 
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '0.25rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.name}
                    </h3>
                    <p style={{ 
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      fontStyle: 'italic',
                      marginBottom: '0.5rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.scientific_name}
                    </p>
                    <span style={{
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {item.family}
                    </span>
                  </div>

                  {/* Precio unitario */}
                  <div style={{ 
                    textAlign: 'center',
                    color: '#166534',
                    fontWeight: '600'
                  }}
                  className="price-column"
                  >
                    ${item.price}
                  </div>

                  {/* Controles de cantidad */}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    justifyContent: 'center'
                  }}
                  className="quantity-column"
                  >
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        backgroundColor: '#f3f4f6',
                        border: 'none',
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                    >
                      -
                    </button>
                    <span style={{ 
                      fontWeight: '600',
                      minWidth: '30px',
                      textAlign: 'center'
                    }}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        backgroundColor: '#f3f4f6',
                        border: 'none',
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                    >
                      +
                    </button>
                  </div>

                  {/* Total y eliminar */}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    justifyContent: 'center'
                  }}
                  className="total-column"
                  >
                    <span style={{ 
                      fontWeight: '600',
                      color: '#166534',
                      minWidth: '80px',
                      textAlign: 'center'
                    }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#dc2626',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        transition: 'background-color 0.2s ease'
                      }}
                      title="Eliminar producto"
                      onMouseOver={(e) => e.target.style.backgroundColor = '#fef2f2'}
                      onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resumen del pedido */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb',
          position: 'sticky',
          top: '2rem'
        }}>
          <h3 style={{ 
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1.5rem'
          }}>
            Resumen del Pedido
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: '0.75rem'
            }}>
              <span style={{ color: '#6b7280' }}>Productos ({totalItems})</span>
              <span style={{ fontWeight: '500' }}>${totalAmount.toFixed(2)}</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}>
              <span style={{ color: '#6b7280' }}>Envío</span>
              <span>
                {shippingCost === 0 ? (
                  <span style={{ color: '#166534', fontWeight: '600' }}>Gratis</span>
                ) : (
                  `$${shippingCost.toFixed(2)}`
                )}
              </span>
            </div>

            {shippingCost > 0 && (
              <div style={{
                backgroundColor: '#f0fdf4',
                color: '#166534',
                padding: '0.75rem',
                borderRadius: '6px',
                fontSize: '0.875rem',
                marginBottom: '1rem'
              }}>
                🎯 <strong>Envío gratis</strong> en compras mayores a $50
              </div>
            )}

            <hr style={{ 
              border: 'none',
              borderTop: '1px solid #e5e7eb',
              margin: '1.5rem 0'
            }} />
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ 
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937'
              }}>
                Total
              </span>
              <span style={{ 
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#166534'
              }}>
                ${finalTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <button style={{
              flex: 2,
              backgroundColor: '#166534',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#166534'}
            >
              Pagar
            </button>
            
            <button
              onClick={clearCart}
              style={{
                flex: 1,
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                padding: '1rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                fontSize: '0.875rem'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
            >
              Vaciar
            </button>
          </div>

          <Link 
            to="/catalogo"
            style={{
              display: 'block',
              textAlign: 'center',
              color: '#166534',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#15803d'}
            onMouseOut={(e) => e.target.style.color = '#166534'}
          >
            ← Seguir comprando
          </Link>
        </div>
      </div>

      {/* Estilos responsive */}
      <style>{`
        @media (max-width: 968px) {
          .cart-layout {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .mobile-summary {
            display: block !important;
          }
          
          .cart-header {
            display: none !important;
          }
          
          .cart-item {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
            text-align: center;
          }
          
          .price-column,
          .quantity-column,
          .total-column {
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Carrito;