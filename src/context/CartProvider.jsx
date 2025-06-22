import { createContext, useState, useEffect } from "react";
import {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../services/CartService";
import { useAuth } from "./UseAuth";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart from PHP session
    const fetchCart = async () => {
      const cart = await getCart();
      setCartItems(cart);
    };

    if (user) {
      fetchCart(); // <-- refetch cart when user changes
    }

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

  const clearCartItems = async () => {
    await clearCart();
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
        clearCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
