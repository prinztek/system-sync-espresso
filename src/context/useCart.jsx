import { useContext } from "react";
import { CartContext } from "./CartProvider";

// Hook to use cart context
export const useCart = () => useContext(CartContext);
