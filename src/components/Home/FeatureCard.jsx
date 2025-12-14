// src/components/Home/FeatureCard.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, SHADOWS, TRANSITIONS } from '../../utils/theme';

const Card = styled.div`
  text-align: center;
  padding: ${SPACING.xl};
  background: ${COLORS.white};
  border-radius: ${BORDER_RADIUS.xl};
  box-shadow: ${SHADOWS.md};
  transition: transform ${TRANSITIONS.slow};

  &:hover {
    transform: translateY(-5px);
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: ${SPACING.md};
`;

const Title = styled.h3`
  color: ${COLORS.primary};
  margin-bottom: ${SPACING.sm};
  font-size: ${FONT_SIZES.lg};
`;

const Description = styled.p`
  color: ${COLORS.gray500};
  font-size: ${FONT_SIZES.sm};
  line-height: 1.5;
  margin: 0;
`;

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
};

export default FeatureCard;
