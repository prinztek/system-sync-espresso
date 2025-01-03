function OrderSummary({ cart }) {
  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>₱{calculateSubtotal().toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Shipping Fee:</span>
        <span>₱0.00</span>
      </div>
      <button className="w-full py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
        Proceed to Checkout
      </button>
    </div>
  );
}

export default OrderSummary;
