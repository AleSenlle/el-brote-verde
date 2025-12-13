// src/components/Product/DeleteModal.jsx
import React from 'react';
import { FiAlertTriangle, FiInfo } from 'react-icons/fi';
import styled from 'styled-components';
import Modal from '../Common/Modal';

const WarningIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fef2f2;
  color: #dc2626;
  margin: 0 auto 1.5rem;
  
  svg {
    width: 30px;
    height: 30px;
  }
`;

const ProductInfo = styled.div`
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
`;

const ProductName = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
`;

const ProductDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const WarningMessage = styled.div`
  background-color: #fffbeb;
  border: 1px solid #fbbf24;
  border-radius: 6px;
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  
  svg {
    color: #d97706;
    flex-shrink: 0;
    margin-top: 0.125rem;
  }
`;

const WarningText = styled.p`
  color: #92400e;
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const DeleteModal = ({ 
  isOpen, 
  onClose, 
  product, 
  onDelete, 
  loading = false 
}) => {
  const handleDelete = async () => {
    const result = await onDelete(product.id);
    if (result?.success) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar Producto"
      onConfirm={handleDelete}
      confirmText={loading ? 'Eliminando...' : 'Sí, eliminar'}
      confirmVariant="danger"
      cancelText="Cancelar"
    >
      <WarningIcon>
        <FiAlertTriangle />
      </WarningIcon>

      <p style={{ textAlign: 'center', color: '#374151', marginBottom: '1.5rem' }}>
        ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
      </p>

      {product && (
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductDetails>
            <DetailItem>
              <strong>ID:</strong> {product.id}
            </DetailItem>
            <DetailItem>
              <strong>Precio:</strong> ${product.price}
            </DetailItem>
            {product.category && (
              <DetailItem>
                <strong>Categoría:</strong> {product.category}
              </DetailItem>
            )}
            {product.inStock !== undefined && (
              <DetailItem>
                <strong>Stock:</strong> {product.inStock ? 'Disponible' : 'Agotado'}
              </DetailItem>
            )}
          </ProductDetails>
        </ProductInfo>
      )}

      <WarningMessage>
        <FiInfo />
        <WarningText>
          Esta acción eliminará permanentemente el producto de la base de datos.
          Los usuarios no podrán verlo ni comprarlo.
        </WarningText>
      </WarningMessage>
    </Modal>
  );
};

export default DeleteModal;