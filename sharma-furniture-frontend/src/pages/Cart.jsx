// src/pages/Cart.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } =
    useContext(CartContext);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h2>
        <Link
          to="/"
          className="px-6 py-3 bg-black text-white rounded-full hover:opacity-80"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-10">Shopping Cart</h1>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b pb-6"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={item.image || "https://via.placeholder.com/150?text=Furniture"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-medium">{item.name}</h2>
                    <p className="text-gray-500">₹{item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="px-3 py-1 border rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item._id)}
                        className="px-3 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 text-sm mt-3"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="font-semibold">₹{totalPrice.toLocaleString()}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 rounded-full hover:opacity-80 transition"
            >
              {user ? "Proceed to Checkout" : "Login to Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
