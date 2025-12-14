// src/components/Common/StockBadge.jsx
import React from 'react';
import styled from 'styled-components';
import { FiCheck, FiX, FiPackage } from 'react-icons/fi';
import { COLORS, FONT_SIZES, BORDER_RADIUS, SPACING } from '../../utils/theme';

const Badge = styled.span`
  background-color: ${props => props.$inStock ? COLORS.primaryLight : COLORS.red50};
  color: ${props => props.$inStock ? COLORS.primary : COLORS.red600};
  padding: ${SPACING.xs} ${props => props.$variant === 'pill' ? SPACING.md : SPACING.sm};
  border-radius: ${props => props.$variant === 'pill' ? '20px' : BORDER_RADIUS.sm};
  font-size: ${FONT_SIZES.xs};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${SPACING.xs};
  border: ${props => props.$variant === 'pill'
    ? `1px solid ${props.$inStock ? COLORS.primaryLighter : COLORS.red200}`
    : 'none'};
  white-space: nowrap;
`;

const StockBadge = ({
  inStock = false,
  showIcon = true,
  variant = 'default',
  icon = 'default',
  text
}) => {
  // Determinar qué icono mostrar
  const getIcon = () => {
    if (!showIcon) return null;

    if (icon === 'package') {
      return <FiPackage size={12} />;
    }

    // Por defecto: check/x según el stock
    return inStock ? <FiCheck size={12} /> : <FiX size={12} />;
  };

  // Determinar el texto
  const getText = () => {
    if (text) return text;
    return inStock ? 'En stock' : 'Sin stock';
  };

  return (
    <Badge $inStock={inStock} $variant={variant}>
      {getIcon()}
      {getText()}
    </Badge>
  );
};

export default StockBadge;
