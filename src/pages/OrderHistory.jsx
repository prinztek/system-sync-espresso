import { useEffect, useState } from "react";
import { useAuth } from "../context/UseAuth";
import { useNavigate } from "react-router-dom";

function OrderHistory() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      const fetchOrders = async () => {
        try {
          const response = await fetch(
            "http://localhost/php-backend/get_orders.php",
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (response.ok) {
            const data = await response.json();
            setOrders(data.orders);
          } else {
            console.error("Failed to fetch orders");
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

      fetchOrders();
    }
  }, [user, navigate]);

  return (
    <div className="mt-[90px]">
      <div className="max-w-[1240px] mx-auto min-h-screen flex flex-col px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Order History</h1>

        {orders.length === 0 ? (
          <p className="text-gray-600">You have no past orders.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-6 bg-white shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-700">
                      <strong>Status:</strong> {order.status}
                    </p>
                    <p className="text-lg font-bold text-green-700">
                      ${order.total_price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4">Product</th>
                      <th className="py-2 px-4">Size</th>
                      <th className="py-2 px-4 text-center">Qty</th>
                      <th className="py-2 px-4 text-right">Price</th>
                      <th className="py-2 px-4 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="py-2 px-4">{item.product_name}</td>
                        <td className="py-2 px-4">{item.size_name}</td>
                        <td className="py-2 px-4 text-center">
                          {item.quantity}
                        </td>
                        <td className="py-2 px-4 text-right">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="py-2 px-4 text-right">
                          ${item.subtotal.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
