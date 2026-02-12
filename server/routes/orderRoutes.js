import express from "express";
import { createOrder, getMyOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { getAllOrders } from "../controllers/orderController.js";

const router = express.Router();

router.get("/my-orders", protect, getMyOrders);
router.post("/", protect, createOrder, getMyOrders);
router.get("/all", protect, isAdmin, getAllOrders);

export default router;
