import { createContext, useState } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export default function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };
  return <CartProvider value={value}>{children}</CartProvider>;
}
