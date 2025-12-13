// src/components/Cart/CartWidget.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';
import styled from 'styled-components';

const CartLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  text-decoration: none;
  padding: 0.5rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #166534;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ef4444;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const CartWidget = () => {
  const { totalItems } = useCart();

  return (
    <CartLink to="/carrito" title="Ver carrito">
      <FiShoppingCart size={22} />
      {totalItems > 0 && (
        <CartBadge>{totalItems}</CartBadge>
      )}
    </CartLink>
  );
};

export default CartWidget;