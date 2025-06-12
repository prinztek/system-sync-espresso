const api = "http://localhost/php-backend";

export const getCart = async () => {
  try {
    const response = await fetch(`${api}/cart.php`, {
      credentials: "include", // ✅ This is necessary
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
};

export const addToCart = async (product, sizeId, quantity = 1) => {
  try {
    const response = await fetch(`${api}/cart.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // ✅ This is necessary
      body: JSON.stringify({
        product_id: product.id,
        size_id: sizeId,
        quantity: quantity,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

export const updateQuantity = async (productId, sizeId, quantity) => {
  try {
    const response = await fetch(`${api}/cart.php`, {
      method: "PUT",
      credentials: "include", // ✅ This is necessary
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: productId,
        size_id: sizeId,
        quantity,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating cart quantity:", error);
  }
};

export const removeFromCart = async (productId, sizeId) => {
  try {
    const response = await fetch(`${api}/cart.php`, {
      method: "DELETE",
      credentials: "include", // ✅ This is necessary
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `product_id=${productId}&size_id=${sizeId}`,
    });
    return await response.json();
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
};
