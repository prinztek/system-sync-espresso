function CartItems({
  cart,
  products,
  handleRemoveFromCart,
  handleQuantityChange,
}) {
  return (
    <div className="w-full space-y-4">
      {cart.map((item) => {
        const product = products.find((p) => p.id === item.product_id);
        if (!product) return null;

        const sizeObj = product.sizes.find((size) => size.id === item.size_id);
        const price = sizeObj ? sizeObj.price : 0;
        const sizeName = sizeObj ? sizeObj.name : "Unknown size";
        const totalPrice = price * item.quantity;

        return (
          <div
            key={`cart-${item.product_id}-${item.size_id}`}
            className="flex flex-col sm:flex-row items-center border p-4 rounded-lg"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg sm:w-24 sm:h-24"
            />
            <div className="mt-2 sm:mt-0 sm:ml-4 flex-grow">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{sizeName}</p>
              <p className="text-sm text-orange-600">
                ${price.toFixed(2)} each
              </p>
              <p className="text-sm font-semibold">
                Total: ${totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-center items-center mt-2 sm:mt-0 sm:ml-4">
              <button
                className="px-2 py-1 border rounded"
                onClick={() =>
                  handleQuantityChange(
                    item.product_id,
                    item.size_id,
                    item.quantity - 1
                  )
                }
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="px-4">{item.quantity}</span>
              <button
                className="px-2 py-1 border rounded"
                onClick={() =>
                  handleQuantityChange(
                    item.product_id,
                    item.size_id,
                    item.quantity + 1
                  )
                }
              >
                +
              </button>
              <button
                className="ml-5 sm:mt-0 sm:ml-4 text-red-600 hover:underline"
                onClick={() =>
                  handleRemoveFromCart(item.product_id, item.size_id)
                }
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CartItems;
