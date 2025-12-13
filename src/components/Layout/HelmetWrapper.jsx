// src/components/Layout/HelmetWrapper.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const HelmetWrapper = ({ children, ...props }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Solo renderizar Helmet en el cliente para evitar duplicación en Strict Mode
  if (!isClient) return null;

  return <Helmet {...props}>{children}</Helmet>;
};

export default HelmetWrapper;