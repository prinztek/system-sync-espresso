import { createContext, useState, useEffect } from "react";
import {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../services/CartService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart from PHP session
    const fetchCart = async () => {
      const cart = await getCart();
      setCartItems(cart);
    };

    fetchCart();
  }, []);

  const addItem = async (product, size, quantity = 1) => {
    // console.log(product);
    // console.log(size);
    // console.log(quantity);

    await addToCart(product, size, quantity);
    const updatedCart = await getCart();
    setCartItems(updatedCart);
  };

  const updateItemQuantity = async (productId, size, quantity) => {
    await updateQuantity(productId, size, quantity);
    const updatedCart = await getCart();
    setCartItems(updatedCart);
  };

  const removeItem = async (productId, size) => {
    await removeFromCart(productId, size);
    const updatedCart = await getCart();
    setCartItems(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        updateItemQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
