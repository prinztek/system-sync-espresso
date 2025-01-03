import { useState } from "react";

const ProductCard = ({ product, handleAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(
    product.size_options[0].toLowerCase()
  );
  const [selectedPrice, setSelectedPrice] = useState(
    product.price[product.size_options[0].toLowerCase()]
  );

  const handleChange = (e) => {
    const size = e.target.value;
    setSelectedSize(size);

    // Use the price object with the size as the key
    const price = product.price[size.toLowerCase()] || 0;
    setSelectedPrice(price);
  };

  return (
    <div
      id={"product-" + product.id}
      className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white hover:shadow-xl border border-gray-200"
    >
      {/* Product Image */}
      <img
        className="w-full h-64 object-cover rounded-t-lg"
        src={product.image_url}
        alt={product.name}
      />

      {/* Product Details */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {product.name}
        </h2>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>

        <div className="mt-4">
          {/* Pricing varies based on the selected option (dropdown) */}
          {product.type === "Drink" ? (
            <div className="flex items-center space-x-4 text-sm text-gray-800">
              <select
                id={product.name + product.id}
                value={selectedSize}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-neutral-950 focus:outline-none"
              >
                {product.size_options.map((option, index) => (
                  <option key={index} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
              <p className="font-medium">Price: ${selectedPrice}</p>
            </div>
          ) : (
            <p className="font-medium text-black">Price: ${selectedPrice}</p>
          )}
          <div className="flex justify-between mt-6 space-x-4 text-xs sm:text-sm">
            <button
              onClick={() =>
                handleAddToCart(product, selectedSize, selectedPrice)
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
