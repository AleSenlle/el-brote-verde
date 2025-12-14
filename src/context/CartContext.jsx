// src/context/CartContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CART_CONFIG } from '../utils/constants';

const CartContext = createContext();

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalItems: 0,
};

// Cargar carrito desde localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      // Validar que el carrito tenga la estructura esperada
      if (parsed && Array.isArray(parsed.cartItems)) {
        return {
          cartItems: parsed.cartItems || [],
          totalAmount: parsed.totalAmount || 0,
          totalItems: parsed.totalItems || 0,
        };
      }
    }
  } catch (error) {
    console.error('Error loading cart from storage:', error);
  }
  return initialState;
};

// Guardar carrito en localStorage
const saveCartToStorage = (state) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
};

const cartReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'ADD_TO_CART':
      // Validar que el producto tenga los campos necesarios
      if (!action.payload || !action.payload.id || !action.payload.price) {
        return state;
      }

      const existingItemIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id
      );

      let updatedItems;

      if (existingItemIndex !== -1) {
        updatedItems = state.cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      } else {
        updatedItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
      }

      newState = {
        ...state,
        cartItems: updatedItems,
        totalAmount: parseFloat((state.totalAmount + (action.payload.price || 0)).toFixed(CART_CONFIG.DECIMAL_PLACES)),
        totalItems: state.totalItems + 1,
      };
      break;

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.cartItems.find(item => item.id === action.payload);
      const filteredItems = state.cartItems.filter(item => item.id !== action.payload);

      const removedAmount = itemToRemove ? (itemToRemove.price || 0) * (itemToRemove.quantity || 0) : 0;
      const removedItems = itemToRemove ? (itemToRemove.quantity || 0) : 0;

      newState = {
        ...state,
        cartItems: filteredItems,
        totalAmount: parseFloat((state.totalAmount - removedAmount).toFixed(CART_CONFIG.DECIMAL_PLACES)),
        totalItems: state.totalItems - removedItems,
      };
      break;

    case 'UPDATE_QUANTITY':
      const updatedCartItems = state.cartItems.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const newTotal = updatedCartItems.reduce((total, item) =>
        total + ((item?.price || 0) * (item?.quantity || 0)), 0
      );

      const newItemsCount = updatedCartItems.reduce((total, item) =>
        total + (item?.quantity || 0), 0
      );

      newState = {
        ...state,
        cartItems: updatedCartItems,
        totalAmount: parseFloat(newTotal.toFixed(CART_CONFIG.DECIMAL_PLACES)),
        totalItems: newItemsCount,
      };
      break;

    case 'CLEAR_CART':
      newState = initialState;
      break;

    case 'LOAD_CART':
      newState = action.payload;
      break;

    default:
      return state;
  }

  // Guardar en localStorage después de cada cambio
  saveCartToStorage(newState);
  return newState;
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    if (savedCart.cartItems.length > 0) {
      dispatch({ type: 'LOAD_CART', payload: savedCart });
    }
  }, []);

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
    
    toast.success(`${plant.common_name} agregado al carrito!`, {
      icon: '🛒'
    });
  };

  const removeFromCart = (plantId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: plantId });
    toast.info('Producto removido del carrito');
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
    if (cartState.cartItems.length === 0) {
      toast.info('El carrito ya está vacío');
      return;
    }
    
    if (window.confirm('¿Estás seguro de vaciar el carrito?')) {
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Carrito vaciado correctamente');
    }
  };

  const calculateShipping = () => {
    return cartState.totalAmount > CART_CONFIG.FREE_SHIPPING_THRESHOLD ? 0 : CART_CONFIG.SHIPPING_COST;
  };

  const calculateTotal = () => {
    const shipping = calculateShipping();
    return parseFloat((cartState.totalAmount + shipping).toFixed(CART_CONFIG.DECIMAL_PLACES));
  };

  // Obtener cantidad específica de un producto
  const getItemQuantity = (plantId) => {
    const item = cartState.cartItems.find(item => item.id === plantId);
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems: cartState.cartItems,
    totalAmount: cartState.totalAmount,
    totalItems: cartState.totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateShipping,
    calculateTotal,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};