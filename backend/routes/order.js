// routes/orders.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";

const router = express.Router();

// Create order
router.post("/", protect, async (req, res) => {
  try {
    const order = await Order.create({ user: req.user._id, ...req.body });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's orders
router.get("/", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("items.electronic");
  res.json(orders);
});

export default router;
