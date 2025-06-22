import { createContext, useState, useEffect } from "react";
import {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../services/CartService";
import { useAuth } from "./UseAuth";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  const notify = (text, type) => {
    toast[type](text);
  };

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

  useEffect(() => {
    // Load cart from PHP session
    const fetchCart = async () => {
      const cart = await getCart();
      setCartItems(cart);
    };

    if (user) {
      fetchCart(); // fetch for new logged-in user
    } else {
      setCartItems([]); // clear cart visually on logout or unauthenticated
    }
  }, [user]);

  const addItem = async (product, size, quantity = 1) => {
    try {
      await addToCart(product, size, quantity);
      const updatedCart = await getCart();
      setCartItems(updatedCart);
      notify("Product added to cart!", "success");
    } catch (err) {
      console.error(err);
      notify("Failed to add item to cart.", "error");
    }
  };

  const updateItemQuantity = async (productId, size, quantity) => {
    await updateQuantity(productId, size, quantity);
    const updatedCart = await getCart();
    setCartItems(updatedCart);
  };

  const removeItem = async (productId, size) => {
    try {
      await removeFromCart(productId, size);
      const updatedCart = await getCart();
      setCartItems(updatedCart);
    } catch (err) {
      console.error(err);
    }
  };

  const clearCartItems = async () => {
    try {
      setCartItems([]); // instantly clear frontend UI
      await clearCart(); // clear backend cart
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
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
