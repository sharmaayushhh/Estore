import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (!user) {
      alert("Please login to proceed to checkout!");
      navigate("/login");
    } else {
      setFormData({
        name: user.name || "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
      });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= CASH ON DELIVERY ================= */
  const handleCOD = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const order = {
      items: cartItems,
      total: totalPrice,
      paymentMethod: "COD",
      shipping: formData,
      date: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));

    alert("Order Placed Successfully 🎉 (Cash on Delivery)");
    clearCart();
    navigate("/profile");
  };

  /* ================= ONLINE PAYMENT ================= */
  const handleOnlinePayment = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:8000/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ amount: totalPrice }),
        }
      );

      const order = await res.json();

      const options = {
        key: "rzp_test_SF9cLbkt15TBhL", // replace this
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Sharma Furnitures",
        description: "Furniture Purchase",
        handler: function (response) {
          const newOrder = {
            items: cartItems,
            total: totalPrice,
            paymentMethod: "Online",
            paymentId: response.razorpay_payment_id,
            shipping: formData,
            date: new Date().toISOString(),
          };

          const existingOrders =
            JSON.parse(localStorage.getItem("orders")) || [];

          localStorage.setItem(
            "orders",
            JSON.stringify([...existingOrders, newOrder])
          );

          alert("Payment Successful 🎉");
          clearCart();
          navigate("/profile");
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white px-8 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Shipping Form */}
        <div>
          <h1 className="text-3xl font-semibold mb-8">Shipping Details</h1>

          <form onSubmit={handleCOD} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <textarea
              name="address"
              placeholder="Full Address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              required
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg"
            />

            {/* COD Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-full hover:opacity-80 transition"
            >
              Place Order (Cash on Delivery)
            </button>
          </form>

          {/* Online Payment Button */}
          <button
            onClick={handleOnlinePayment}
            className="w-full mt-4 bg-[#1e9eff] text-white py-3 rounded-full hover:opacity-80 transition"
          >
            Pay Online (Razorpay)
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-sm h-fit">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between mb-4 border-b pb-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="font-semibold">
                ₹{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}

          <div className="flex justify-between mt-6 text-lg font-semibold">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
