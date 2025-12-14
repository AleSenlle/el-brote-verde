// src/utils/theme.js

// Paleta de colores principal
export const COLORS = {
  // Verdes (marca)
  primary: '#166534',
  primaryHover: '#15803d',
  primaryLight: '#dcfce7',
  primaryLighter: '#bbf7d0',

  // Grises
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',

  // Rojos (errores/eliminar)
  red50: '#fef2f2',
  red100: '#fee2e2',
  red200: '#fecaca',
  red600: '#dc2626',
  red700: '#b91c1c',
  red800: '#991b1b',

  // Amarillos (rating/advertencias)
  yellow400: '#fbbf24',
  yellow500: '#f59e0b',

  // Azules (información)
  blue50: '#eff6ff',
  blue100: '#dbeafe',
  blue600: '#2563eb',

  // Blanco y negro
  white: '#ffffff',
  black: '#000000',
};

// Tamaños de fuente
export const FONT_SIZES = {
  xs: '0.75rem',      // 12px
  sm: '0.875rem',     // 14px
  base: '1rem',       // 16px
  lg: '1.125rem',     // 18px
  xl: '1.25rem',      // 20px
  xl2: '1.5rem',      // 24px
  xl3: '1.875rem',    // 30px
  xl4: '2.25rem',     // 36px
  xl5: '3rem',        // 48px
};

// Espaciado
export const SPACING = {
  xs: '0.25rem',      // 4px
  sm: '0.5rem',       // 8px
  md: '1rem',         // 16px
  lg: '1.5rem',       // 24px
  xl: '2rem',         // 32px
  xl2: '3rem',        // 48px
  xl3: '4rem',        // 64px
};

// Border radius
export const BORDER_RADIUS = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  full: '50%',
};

// Sombras
export const SHADOWS = {
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 2px 8px rgba(0,0,0,0.1)',
  lg: '0 8px 25px rgba(0,0,0,0.15)',
  xl: '0 20px 25px rgba(0,0,0,0.15)',
};

// Breakpoints para responsive
export const BREAKPOINTS = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1200px',
};

// Transiciones
export const TRANSITIONS = {
  fast: '0.15s ease',
  normal: '0.2s ease',
  slow: '0.3s ease',
};

// Z-index layers
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  modal: 1030,
  popover: 1040,
  tooltip: 1050,
};
