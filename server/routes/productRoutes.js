import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

import {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create", protect, isAdmin, createProduct);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);
router.get("/", getProducts);
router.get("/:id", getSingleProduct);



export default router;
