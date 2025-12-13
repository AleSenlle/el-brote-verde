// src/pages/AdminProducts.jsx
import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import SEO from '../components/Layout/SEO';
import ProductForm from '../components/Product/ProductForm';
import DeleteModal from '../components/Product/DeleteModal';
import Modal from '../components/Common/Modal';
import { 
  FiPackage, 
  FiEdit2, 
  FiTrash2, 
  FiPlus, 
  FiSearch,
  FiFilter,
  FiDollarSign,
  FiCheck,
  FiX,
  FiAlertCircle,
  FiTag
} from 'react-icons/fi';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 70vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #166534;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background-color: #166534;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #15803d;
  }
  
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #166534;
    box-shadow: 0 0 0 3px rgba(22, 101, 52, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
`;

const Filters = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #166534;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
`;

const ProductImage = styled.div`
  height: 180px;
  background-color: #f3f4f6;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #166534;
  font-size: 2.5rem;
`;

const ProductContent = styled.div`
  padding: 1.5rem;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`;

const ProductName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  flex: 1;
`;

const ProductPrice = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #166534;
  margin-left: 1rem;
`;

const ProductCategory = styled.span`
  background-color: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: inline-block;
`;

const ProductDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0.75rem 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const StockStatus = styled.span`
  background-color: ${props => props.inStock ? '#dcfce7' : '#fef2f2'};
  color: ${props => props.inStock ? '#166534' : '#dc2626'};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #fbbf24;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
`;

const IconButton = styled.button`
  flex: 1;
  background-color: ${props => props.variant === 'edit' ? '#f3f4f6' : '#fef2f2'};
  color: ${props => props.variant === 'edit' ? '#374151' : '#dc2626'};
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.variant === 'edit' ? '#e5e7eb' : '#fee2e2'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  color: #6b7280;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  color: #d1d5db;
  margin-bottom: 1rem;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
`;

const AdminProducts = () => {
  const { 
    filteredProducts, 
    loading, 
    error, 
    searchProducts, 
    filterByCategory,
    categories,
    selectedCategory,
    deleteProduct 
  } = useProducts();
  
  const { user, isAdmin } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Verificar si es admin
  if (!user || !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchProducts(value);
  };

  const handleCategoryChange = (e) => {
    filterByCategory(e.target.value);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setShowFormModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    setShowFormModal(true);
  };

  const handleFormSuccess = () => {
    setShowFormModal(false);
    setSelectedProduct(null);
  };

  const handleDeleteConfirm = async (productId) => {
    await deleteProduct(productId);
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <div className="spinner" style={{
            border: '2px solid #e5e7eb',
            borderTop: '2px solid #166534',
            borderRadius: '50%',
            width: '4rem',
            height: '4rem',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p>Cargando productos...</p>
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <FiAlertCircle style={{ color: '#dc2626', fontSize: '2rem', marginBottom: '1rem' }} />
          <h3 style={{ color: '#991b1b', marginBottom: '0.5rem' }}>Error</h3>
          <p style={{ color: '#b91c1c' }}>{error}</p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <SEO 
        title="Administración de Productos - El Brote Verde"
        description="Panel de administración para gestionar productos. Crear, editar y eliminar productos del catálogo."
      />
      
      <Container>
        <Header>
          <Title>
            <FiPackage />
            Administración de Productos
          </Title>
          
          <Actions>
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <SearchIcon>
                <FiSearch />
              </SearchIcon>
            </SearchContainer>
            
            <ActionButton onClick={handleCreate}>
              <FiPlus />
              Nuevo Producto
            </ActionButton>
          </Actions>
        </Header>

        <Filters>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiFilter />
            <span style={{ fontWeight: '500' }}>Filtrar por familia:</span> 
          </div>
          
          <FilterSelect value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Todas las familias' : category}
              </option>
            ))}
          </FilterSelect>
        </Filters>

        {filteredProducts.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <FiPackage size={48} />
            </EmptyIcon>
            <h3>No hay productos</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              {searchTerm || selectedCategory !== 'all' 
                ? 'No se encontraron productos con los filtros aplicados' 
                : 'Comienza agregando tu primer producto'}
            </p>
            <ActionButton onClick={handleCreate}>
              <FiPlus />
              Crear primer producto
            </ActionButton>
          </EmptyState>
        ) : (
          <>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
              Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
            </p>
            
            <ProductsGrid>
              {filteredProducts.map(product => (
                <ProductCard key={product.id}>
                  <ProductImage>
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <PlaceholderImage>
                        <FiPackage />
                      </PlaceholderImage>
                    )}
                  </ProductImage>
                  
                  <ProductContent>
                    <ProductHeader>
                      <ProductName>{product.name}</ProductName>
                      <ProductPrice>
                        <FiDollarSign size={16} />
                        {parseFloat(product.price).toFixed(2)}
                      </ProductPrice>
                    </ProductHeader>
                    
                    {product.family && (
                      <ProductCategory>
                        <FiTag size={12} style={{ marginRight: '0.25rem' }} />
                        {product.family}
                      </ProductCategory>
                    )}
                    
                    {product.description && (
                      <ProductDescription>{product.description}</ProductDescription>
                    )}
                    
                    <ProductDetails>
                      <StockStatus inStock={product.inStock}>
                        {product.inStock ? <FiCheck /> : <FiX />}
                        {product.inStock ? 'En stock' : 'Sin stock'}
                      </StockStatus>
                      
                      <Rating>
                        {'★'.repeat(Math.floor(product.rating || 0))}
                        {'☆'.repeat(5 - Math.floor(product.rating || 0))}
                        <span style={{ color: '#6b7280', marginLeft: '0.25rem' }}>
                          ({product.rating || 0})
                        </span>
                      </Rating>
                    </ProductDetails>

                    {product.category && (
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: '#6b7280', 
                        marginTop: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <FiPackage size={12} />
                        Categoría: {product.category}
                      </div>
                    )}
                    
                    <ProductActions>
                      <IconButton 
                        variant="edit" 
                        onClick={() => handleEdit(product)}
                        title="Editar producto"
                      >
                        <FiEdit2 />
                        Editar
                      </IconButton>
                      
                      <IconButton 
                        variant="delete" 
                        onClick={() => handleDelete(product)}
                        title="Eliminar producto"
                      >
                        <FiTrash2 />
                        Eliminar
                      </IconButton>
                    </ProductActions>
                  </ProductContent>
                </ProductCard>
              ))}
            </ProductsGrid>
          </>
        )}

        {/* Modal para crear/editar producto */}
        <Modal
          isOpen={showFormModal}
          onClose={() => setShowFormModal(false)}
          title={isEditing ? 'Editar Producto' : 'Nuevo Producto'}
          showFooter={false}
          size="large"
        >
          <ProductForm
            product={selectedProduct}
            onClose={() => setShowFormModal(false)}
            onSubmitSuccess={handleFormSuccess}
          />
        </Modal>

        {/* Modal para eliminar producto */}
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          product={selectedProduct}
          onDelete={handleDeleteConfirm}
          loading={loading}
        />
      </Container>
    </>
  );
};

export default AdminProducts;