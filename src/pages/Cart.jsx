import { useCart } from "../context/useCart";
import { useAuth } from "../context/UseAuth";
import CartItems from "../components/CartItems";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cart({ products }) {
  const { isLoggedIn, user } = useAuth();
  const { cartItems, updateItemQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Cart items:", cartItems);
    console.log("User:", user);
  }, [cartItems, user]);

  function handleCheckout() {
    if (!isLoggedIn()) {
      navigate("/signin");
    } else {
      // Proceed to checkout
      console.log("Proceeding to checkout with items:", cartItems);
      navigate("/checkout");
    }
  }

  return (
    <div className="mt-[90px]">
      <div className="max-w-[1240px] mx-auto min-h-screen flex flex-col px-4 py-16">
        {isLoggedIn() ? (
          <div className="mt-6 text-right">
            <Link
              to="/order-history"
              className="text-blue-600 hover:underline text-sm"
            >
              View Order History →
            </Link>
            <h1 className="text-lg font-medium mb-4">{user.email}'s Cart</h1>
          </div>
        ) : null}
        {!cartItems?.length ? (
          <div className="text-gray-500">No items added</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-3">
              <CartItems
                cart={cartItems}
                products={products}
                handleRemoveFromCart={removeItem}
                handleQuantityChange={updateItemQuantity}
              />
              <button
                onClick={handleCheckout}
                className="w-full py-2 bg-amber-600 text-white rounded hover:bg-orange-700 my-5"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
