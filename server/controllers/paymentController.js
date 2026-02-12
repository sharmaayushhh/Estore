import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/orderModel.js";


// ✅ CREATE ORDER (Razorpay Order)
export const createOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount } = req.body;

    const options = {
      amount: amount * 100, // convert to paisa
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error) {
    console.log("CREATE ORDER ERROR:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
};



// ✅ VERIFY PAYMENT & SAVE ORDER
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
      totalAmount,
      shippingAddress,
    } = req.body;

    // 🔹 Create expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // 🔹 Compare signatures
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // 🔹 Create order in DB
    const order = await Order.create({
      user: req.user._id,
      items: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
      shippingAddress,
      paymentMethod: "Online",
      paymentResult: {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },
      isPaid: true,
      paidAt: Date.now(),
      paymentStatus: "Paid",
    });

    res.status(200).json({
      message: "Payment verified successfully",
      order,
    });

  } catch (error) {
    console.log("VERIFY PAYMENT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
