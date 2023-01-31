import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};

export const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartItems, isCartOpen, cartCount, cartTotal } = state;

  function addItemToCart(productToAdd) {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemReducer(newCartItems);
  }

  function removeItemFromCart(cartItemToRemove) {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemReducer(newCartItems);
  }

  function clearItemFromCart(cartItemToClear) {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemReducer(newCartItems);
  }

  function updateCartItemReducer(newCartItems) {
    const newCartCount = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);

    const newCartTotal = newCartItems.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  }

  function setIsCartOpen(bool) {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
