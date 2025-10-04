// src/context/CartContext.jsx
import { createContext, useContext, useReducer } from 'react';

// Crear el Context
const CartContext = createContext();

// Estado inicial del carrito
const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalItems: 0,
};

// Reducer para manejar las acciones del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id
      );

      let updatedItems;

      if (existingItemIndex !== -1) {
        // Si el item ya existe, aumentar la cantidad
        updatedItems = state.cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si es un item nuevo, agregarlo al carrito
        updatedItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
      }

      const newTotalAmount = state.totalAmount + action.payload.price;
      const newTotalItems = state.totalItems + 1;

      return {
        ...state,
        cartItems: updatedItems,
        totalAmount: parseFloat(newTotalAmount.toFixed(2)),
        totalItems: newTotalItems,
      };

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.cartItems.find(item => item.id === action.payload);
      const filteredItems = state.cartItems.filter(item => item.id !== action.payload);

      const removedAmount = itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0;
      const removedItems = itemToRemove ? itemToRemove.quantity : 0;

      return {
        ...state,
        cartItems: filteredItems,
        totalAmount: parseFloat((state.totalAmount - removedAmount).toFixed(2)),
        totalItems: state.totalItems - removedItems,
      };

    case 'UPDATE_QUANTITY':
      const updatedCartItems = state.cartItems.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const newTotal = updatedCartItems.reduce((total, item) => 
        total + (item.price * item.quantity), 0
      );
      
      const newItemsCount = updatedCartItems.reduce((total, item) => 
        total + item.quantity, 0
      );

      return {
        ...state,
        cartItems: updatedCartItems,
        totalAmount: parseFloat(newTotal.toFixed(2)),
        totalItems: newItemsCount,
      };

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// Provider Component
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  // Acciones del carrito
  const addToCart = (plant) => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: {
        id: plant.id,
        name: plant.common_name,
        scientific_name: plant.scientific_name,
        price: plant.price,
        image_url: plant.image_url,
        family: plant.family
      }
    });
  };

  const removeFromCart = (plantId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: plantId });
  };

  const updateQuantity = (plantId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(plantId);
      return;
    }
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { 
        id: plantId, 
        quantity: parseInt(quantity) 
      } 
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Calcular costo de envío (mock)
  const calculateShipping = () => {
    return cartState.totalAmount > 50 ? 0 : 10; // Envío gratis sobre $50
  };

  // Calcular total final
  const calculateTotal = () => {
    const shipping = calculateShipping();
    return parseFloat((cartState.totalAmount + shipping).toFixed(2));
  };

  // Valor que se proveerá a los componentes
  const value = {
    cartItems: cartState.cartItems,
    totalAmount: cartState.totalAmount,
    totalItems: cartState.totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateShipping,
    calculateTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
