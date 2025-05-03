function CartItems({ cart, handleRemoveFromCart, handleQuantityChange }) {
  return (
    <div className="w-full space-y-4">
      {cart.map((item) => (
        <div
          key={"cart-" + item.id + "-" + item.size_options}
          className="flex flex-col sm:flex-row items-center border p-4 rounded-lg"
        >
          <img
            src={item.image_url}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-lg sm:w-24 sm:h-24"
          />
          <div className="mt-2 sm:mt-0 sm:ml-4 flex-grow">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.size_options}</p>
            <p className="text-sm text-orange-600">${item.price}</p>
          </div>
          <div className="flex justify-center items-center mt-2 sm:mt-0 sm:ml-4">
            <button
              className="px-2 py-1 border rounded"
              onClick={() =>
                handleQuantityChange(
                  item.id,
                  item.quantity - 1,
                  item.size_options
                )
              }
            >
              -
            </button>
            <span className="px-4">{item.quantity}</span>
            <button
              className="px-2 py-1 border rounded"
              onClick={() =>
                handleQuantityChange(
                  item.id,
                  item.quantity + 1,
                  item.size_options
                )
              }
            >
              +
            </button>
            <button
              className="ml-5 sm:mt-0 sm:ml-4 text-red-600 hover:underline"
              onClick={() => handleRemoveFromCart(item.id, item.size_options)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartItems;
