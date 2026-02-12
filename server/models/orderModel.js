import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,        // store product name snapshot
        image: String,       // store product image snapshot
        price: Number,       // store price at time of purchase
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    shippingAddress: {
      name: String,
      phone: String,
      address: String,
      city: String,
      pincode: String,
      country: {
        type: String,
        default: "India",
      },
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      required: true,
    },

    paymentResult: {
      razorpay_order_id: String,
      razorpay_payment_id: String,
      razorpay_signature: String,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
