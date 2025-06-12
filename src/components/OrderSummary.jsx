import { useEffect } from "react";

function OrderSummary({ cart, products }) {
  useEffect(() => {
    console.log("OrderSummary component mounted or updated");
    // You can add any additional logic here if needed
    console.log("Cart items:", cart);
  }, [cart]);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p.id === item.product_id);
      const size = product?.sizes?.find((s) => s.id === item.size_id);
      const price = size?.price ?? 0;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <div className="h-[200px] p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>${calculateSubtotal().toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Shipping Fee:</span>
        <span>$0.00</span>
      </div>
      <button className="w-full py-2 bg-amber-600 text-white rounded hover:bg-orange-700">
        Place Order
      </button>
    </div>
  );
}

export default OrderSummary;
