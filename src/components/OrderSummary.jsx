import { useEffect } from "react";

function OrderSummary({ cart, products }) {
  useEffect(() => {
    console.log("OrderSummary component mounted or updated");
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
    <div className="p-4 border rounded-lg bg-white shadow">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

      {/* Table of Products */}
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left border-b">Product</th>
              <th className="px-3 py-2 text-left border-b">Size</th>
              <th className="px-4 py-2 text-center border-b">Price</th>
              <th className="px-3 py-2 text-center border-b">Qty</th>
              <th className="px-3 py-2 text-right border-b">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              const product = products.find((p) => p.id === item.product_id);
              const size = product?.sizes?.find((s) => s.id === item.size_id);
              const price = size?.price ?? 0;
              const sizeName = size?.name ?? "Unknown";

              return (
                <tr
                  key={`${item.product_id}-${item.size_id}`}
                  className="border-b"
                >
                  <td className="px-3 py-2">{product?.name ?? "Unknown"}</td>
                  <td className="px-3 py-2">{sizeName}</td>
                  <td className="px-3 py-2 text-center">${price.toFixed(2)}</td>
                  <td className="px-3 py-2 text-center">{item.quantity}</td>
                  <td className="px-3 py-2 text-right">
                    ${(price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Subtotal and Action */}
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>${calculateSubtotal().toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Shipping Fee:</span>
        <span>$0.00</span>
      </div>
    </div>
  );
}

export default OrderSummary;
