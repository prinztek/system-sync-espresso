import { useEffect, useState } from "react";

function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost/php-backend/orders.php",
          {
            credentials: "include", // Include credentials for session management
          }
        );

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const response = await fetch(
      "http://localhost/php-backend/update_order_status.php",
      {
        credentials: "include", // Include credentials for session management
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, new_status: newStatus }),
      }
    );

    if (response.ok) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? { ...order, status: newStatus } : order
        )
      );
    }
  };

  return (
    <div className="mt-[90px]">
      <div className="max-w-[1240px] mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold mb-6">Customer Orders</h2>

        {!orders.length ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 border">Order ID</th>
                  <th className="text-left px-4 py-2 border">Date</th>
                  <th className="text-left px-4 py-2 border">Customer</th>
                  <th className="text-left px-4 py-2 border">Address</th>
                  <th className="text-left px-4 py-2 border">Total (₱)</th>
                  <th className="text-left px-4 py-2 border">Status</th>
                  <th className="text-left px-4 py-2 border">Items</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.order_id} className="border-t">
                    <td className="px-4 py-2 border">{order.order_id}</td>
                    <td className="px-4 py-2 border">{order.created_at}</td>
                    <td className="px-4 py-2 border">{order.customer.name}</td>
                    <td className="px-4 py-2 border">
                      {order.customer.address}
                    </td>
                    <td className="px-4 py-2 border">{order.total_price}</td>
                    <td className="px-4 py-2 border">
                      <select
                        className="border rounded px-2 py-1"
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.order_id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 border">
                      <ul className="list-disc list-inside space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.product_name} ({item.size_name}) ×{" "}
                            {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersList;
