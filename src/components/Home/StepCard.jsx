// src/components/Home/StepCard.jsx
import React from 'react';
import styled from 'styled-components';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../utils/theme';

const StepContainer = styled.div`
  text-align: center;
`;

const StepNumber = styled.div`
  background: ${COLORS.primaryLight};
  color: ${COLORS.primary};
  width: 60px;
  height: 60px;
  border-radius: ${BORDER_RADIUS.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${FONT_SIZES.xl};
  margin: 0 auto ${SPACING.md};
  font-weight: bold;
`;

const StepTitle = styled.h4`
  color: ${COLORS.gray800};
  margin-bottom: ${SPACING.sm};
  font-size: ${FONT_SIZES.lg};
  margin: 0 0 ${SPACING.sm} 0;
`;

const StepDescription = styled.p`
  color: ${COLORS.gray500};
  font-size: ${FONT_SIZES.sm};
  line-height: 1.5;
  margin: 0;
`;

const StepCard = ({ number, title, description }) => {
  return (
    <StepContainer>
      <StepNumber>{number}</StepNumber>
      <StepTitle>{title}</StepTitle>
      <StepDescription>{description}</StepDescription>
    </StepContainer>
  );
};

export default StepCard;
