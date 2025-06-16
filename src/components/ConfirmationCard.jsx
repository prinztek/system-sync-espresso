import { useNavigate } from "react-router-dom";

function ConfirmationCard({ orderSummary }) {
  const navigate = useNavigate();
  const { id, name, address, cartItems, total_price, created_at } =
    orderSummary;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-2">
          ✅ Thank you for your order!
        </h2>
        <p className="text-gray-600 text-lg">
          Your food is being prepared and will be delivered to your address.
        </p>
        <p className="text-gray-500 text-sm mt-2">Order ID: {id}</p>
        <p className="text-gray-500 text-sm mt-1">
          Order Date: {new Date(created_at).toLocaleString()}
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Customer Information
        </h3>
        <p className="text-gray-700">
          <strong>Full Name:</strong> {name}
        </p>
        <p className="text-gray-700">
          <strong>Shipping Address:</strong> {address}
        </p>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-orange-100 text-gray-800">
            <tr>
              <th className="px-4 py-2 text-left border-b">Product</th>
              <th className="px-4 py-2 text-left border-b">Size</th>
              <th className="px-4 py-2 text-center border-b">Price</th>
              <th className="px-4 py-2 text-center border-b">Quantity</th>
              <th className="px-4 py-2 text-right border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{item.product_name}</td>
                <td className="px-4 py-2">{item.size_name}</td>
                <td className="px-4 py-2 text-center">${item.price}</td>
                <td className="px-4 py-2 text-center">{item.quantity}</td>
                <td className="px-4 py-2 text-right">
                  ${item.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center text-lg font-semibold mt-6">
        <span className="text-gray-800 mr-4">Total Amount:</span>
        <span className="text-green-700 text-xl">
          ${total_price.toFixed(2)}
        </span>
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate("/menu")}
          className="bg-amber-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md"
        >
          🍽️ Order More
        </button>
      </div>
    </div>
  );
}

export default ConfirmationCard;
