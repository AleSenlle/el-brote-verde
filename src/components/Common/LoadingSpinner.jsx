// src/components/Common/LoadingSpinner.jsx
import styled, { keyframes } from 'styled-components';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../utils/theme';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.fullPage ? `${SPACING.xl3} ${SPACING.md}` : `${SPACING.xl} ${SPACING.md}`};
  text-align: center;
`;

const Spinner = styled.div`
  border: 2px solid ${COLORS.gray200};
  border-top: 2px solid ${COLORS.primary};
  border-radius: ${BORDER_RADIUS.full};
  width: ${props => props.size === 'small' ? '2rem' : '4rem'};
  height: ${props => props.size === 'small' ? '2rem' : '4rem'};
  animation: ${spin} 1s linear infinite;
  margin: 0 auto ${props => props.size === 'small' ? SPACING.sm : SPACING.md};
`;

const LoadingText = styled.p`
  color: ${COLORS.gray500};
  margin: 0;
  font-size: ${props => props.size === 'small' ? FONT_SIZES.sm : FONT_SIZES.base};
`;

const LoadingSpinner = ({
  message = 'Cargando...',
  size = 'medium',
  fullPage = true
}) => {
  return (
    <SpinnerContainer fullPage={fullPage}>
      <Spinner size={size} />
      {message && <LoadingText size={size}>{message}</LoadingText>}
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
