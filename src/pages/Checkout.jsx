import { useState, useEffect } from "react";
import { useCart } from "../context/useCart";
import OrderSummary from "../components/OrderSummary";
import { useAuth } from "../context/UseAuth";
import { useNavigate } from "react-router-dom";

function Checkout({ products }) {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Redirect to login if user not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Redirect to home if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally you'd send this to your backend
    setSubmitted(true);
    console.log("Order submitted:", { ...formData, cartItems });
  };

  if (submitted) {
    return (
      <div>
        <h2>Thank you, {formData.name}!</h2>
        <p>Your order has been placed and will be paid via Cash on Delivery.</p>
      </div>
    );
  }

  return (
    <div className="mt-[90px]">
      <div className="max-w-[1240px] mx-auto min-h-screen flex flex-col px-4 py-16">
        {step === 1 && (
          <form onSubmit={handleSubmit}>
            <h2>Shipping Details</h2>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              style={{
                display: "block",
                marginBottom: "10px",
                width: "100%",
              }}
            />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Shipping Address"
              required
              style={{
                display: "block",
                marginBottom: "20px",
                width: "100%",
              }}
            />
            <h2>Order Summary</h2>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} x{item.quantity} - ${item.price * item.quantity}
                </li>
              ))}
            </ul>
            <p>
              <strong>Total: ${total}</strong>
            </p>
            <button type="submit" style={{ marginTop: "20px" }}>
              Place Order (Cash on Delivery)
            </button>
          </form>
        )}
        {step === 2 && (
          <>
            <OrderSummary cart={cartItems} products={products} />
            <button onClick={() => setStep(1)}>Back to Shipping Details</button>
          </>
        )}
        <button onClick={() => setStep(2)} style={{ marginLeft: "10px" }}>
          View Order Summary
        </button>
      </div>
    </div>
  );
}

export default Checkout;
