import { useState, useEffect } from "react";
import { useCart } from "../context/useCart";
import OrderSummary from "../components/OrderSummary";
import { useAuth } from "../context/UseAuth";
import { useNavigate } from "react-router-dom";
import ConfirmationCard from "../components/ConfirmationCard";

function Checkout({ products }) {
  const navigate = useNavigate();
  const { cartItems, clearCartItems } = useCart();
  const { user } = useAuth();

  const [orderSummary, setOrderSummary] = useState({
    id: "",
    name: "",
    address: "",
    total_price: 0,
    cartItems: [],
  });

  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // optional - grab the user details from the last order (useEffect) to display their information

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (cartItems.length === 0 && !submitted) {
      navigate("/menu");
    }
  }, [user, cartItems, navigate, submitted]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ensure name and address are not empty or whitespace
    if (!formData.name.trim() || !formData.address.trim()) {
      alert("Name and address cannot be empty or just whitespace.");
      return; // Exit the function if validation fails
    }

    const response = await fetch(
      "http://localhost/php-backend/submit_order.php",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData, cartItems }),
      }
    );

    if (response.ok) {
      setSubmitted(true);
      clearCartItems();

      const responseData = await response.json();
      setOrderSummary(responseData.order);

      console.log("Order placed successfully:", responseData);
      // console.log("Order submitted:", { ...formData, cartItems });
    } else {
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="mt-[90px]">
      <div className="max-w-[1240px] mx-auto min-h-screen flex flex-col px-4 py-16">
        {submitted ? (
          <ConfirmationCard orderSummary={orderSummary} />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md space-y-6"
          >
            <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 border rounded-md"
            />

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Shipping Address"
              required
              rows="3"
              className="w-full px-4 py-2 border rounded-md"
            />

            <OrderSummary cart={cartItems} products={products} />
            <div className="flex justify-end items-center w-full">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md"
              >
                Place Order (Cash on Delivery)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Checkout;
