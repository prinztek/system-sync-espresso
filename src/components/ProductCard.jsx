import { useState } from "react";
import { useAuth } from "../context/UseAuth";

const ProductCard = ({ product, handleAddToCart }) => {
  const { user } = useAuth();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const handleChange = (e) => {
    const sizeId = parseInt(e.target.value);
    const size = product.sizes.find((s) => s.id === sizeId);
    if (size) setSelectedSize(size);
  };

  const handleAddItemToCart = (product, sizeId, quantity) => {
    if (!user) {
      // If user is not logged in, show a message or redirect to login
      alert("Please log in to add items to your cart.");
      return;
    }
    // If user is logged in, proceed with adding to cart
    handleAddToCart(product, sizeId, quantity);
  };

  return (
    <div
      id={"product-" + product.id}
      className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white hover:shadow-xl border border-gray-200"
    >
      {/* Product Image */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          className="w-full h-full object-scale-down rounded-t-lg"
          src={product.image_url}
          alt={product.name}
        />
      </div>

      {/* Product Details */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {product.name}
        </h2>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>

        <div className="mt-4">
          {product.type === "Drink" ? (
            <div className="flex items-center space-x-4 text-sm text-gray-800">
              <select
                id={product.name + product.id}
                value={selectedSize.id}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-neutral-950 focus:outline-none"
              >
                {product.sizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.name}
                  </option>
                ))}
              </select>
              <p className="font-medium">Price: ${selectedSize.price}</p>
            </div>
          ) : (
            <p className="font-medium text-black">
              Price: ${selectedSize.price}
            </p>
          )}

          <div className="flex justify-between mt-6 space-x-4 text-xs sm:text-sm">
            <button
              onClick={() =>
                handleAddItemToCart(
                  product, // ✅ full product object
                  selectedSize.id, // ✅ size ID only
                  1 // ✅ quantity
                )
              }
              className="inline-flex h-12 items-center justify-center w-1/2 rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 shadow-md hover:bg-neutral-900 hover:shadow-lg active:scale-95 transition-transform"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
