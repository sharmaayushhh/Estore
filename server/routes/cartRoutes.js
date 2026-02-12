import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/remove/:productId", protect, removeFromCart);
router.put("/update", protect, updateCartItem);


export default router;
