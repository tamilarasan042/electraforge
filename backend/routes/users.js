// backend/routes/users.js
import express from "express";
import User from "../models/User.js";
import { protect, admin } from "../middleware/authMiddleware.js"; 

const router = express.Router();

// GET all users (admin only)
router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password"); 
    res.json(users);
  } catch (err) {
    console.error("Fetch Users Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE user by ID (admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne(); 
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete User Error:", err);

    // Check if it's a bad ObjectId
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE user by ID (admin only)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const { username, email, role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields only if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();
    res.json({ message: "User updated successfully", user: { _id: user._id, username: user.username, email: user.email, role: user.role, createdAt: user.createdAt } });
  } catch (err) {
    console.error("Update User Error:", err);

    // Check if invalid ObjectId
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    res.status(500).json({ message: "Server error" });
  }
});

export default router;
