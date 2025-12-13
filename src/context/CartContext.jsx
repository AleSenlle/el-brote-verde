// src/context/CartContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

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
      return JSON.parse(savedCart);
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
      const existingItemIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id
      );

      let updatedItems;

      if (existingItemIndex !== -1) {
        updatedItems = state.cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
      }

      newState = {
        ...state,
        cartItems: updatedItems,
        totalAmount: parseFloat((state.totalAmount + action.payload.price).toFixed(2)),
        totalItems: state.totalItems + 1,
      };
      break;

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.cartItems.find(item => item.id === action.payload);
      const filteredItems = state.cartItems.filter(item => item.id !== action.payload);

      const removedAmount = itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0;
      const removedItems = itemToRemove ? itemToRemove.quantity : 0;

      newState = {
        ...state,
        cartItems: filteredItems,
        totalAmount: parseFloat((state.totalAmount - removedAmount).toFixed(2)),
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
        total + (item.price * item.quantity), 0
      );
      
      const newItemsCount = updatedCartItems.reduce((total, item) => 
        total + item.quantity, 0
      );

      newState = {
        ...state,
        cartItems: updatedCartItems,
        totalAmount: parseFloat(newTotal.toFixed(2)),
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
    return cartState.totalAmount > 50 ? 0 : 10;
  };

  const calculateTotal = () => {
    const shipping = calculateShipping();
    return parseFloat((cartState.totalAmount + shipping).toFixed(2));
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