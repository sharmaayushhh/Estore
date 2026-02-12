// src/pages/Profile.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  // Mock Order History (you can replace with API call later)
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="min-h-screen bg-white px-8 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* User Info */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Cart Items:</strong> {cartItems.length}</p>
          <button
            onClick={logout}
            className="mt-4 px-4 py-2 bg-black text-white rounded-full hover:opacity-80"
          >
            Logout
          </button>
        </div>

        {/* Order History */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Order History</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders placed yet.</p>
          ) : (
            orders.map((order, idx) => (
              <div key={idx} className="border-b py-3">
                <p><strong>Order #{idx + 1}</strong></p>
                <p>Total: ₹{order.total.toLocaleString()}</p>
                <p>Items:</p>
                <ul className="ml-4 list-disc">
                  {order.items.map((item) => (
                    <li key={item._id}>
                      {item.name} x {item.quantity} - ₹{(item.price * item.quantity).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
