import CartItems from "../components/CartItems";
import OrderSummary from "../components/OrderSummary";

function Cart({ user, cart, handleRemoveFromCart, handleQuantityChange }) {
  // console.log(user);

  return (
    <div className="mt-[90px]">
      <div className="max-w-[1240px] mx-auto min-h-screen flex flex-col px-4 py-16">
        {user.email ? (
          <h1 className="text-lg font-medium mb-4">{user.email}'s Cart</h1>
        ) : (
          ""
        )}
        {!cart.length ? (
          <div className="text-gray-500">No items added</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <CartItems
                cart={cart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleQuantityChange={handleQuantityChange}
              />
            </div>
            {/* Cart Items */}
            <div className="col-span-2 md:col-span-1">
              <OrderSummary cart={cart} /> {/* Order Summary */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
