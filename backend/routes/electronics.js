// backend/routes/electronics.js
import express from "express";
import multer from "multer";
import path from "path";
import Electronic from "../models/Electronic.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder name (ensure it exists)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpg|jpeg|png|gif|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

// Public: Get all electronics
router.get("/", async (req, res) => {
  try {
    const electronics = await Electronic.find();
    res.json(electronics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin only: Create new electronic
router.post("/", protect, admin, upload.single("image"), async (req, res) => {
  try {
    const { name, category, price, reviewUrl } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !category || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newElectronic = await Electronic.create({
      name,
      category,
      price: parseFloat(price),
      image,
      reviewUrl,
    });

    res.status(201).json(newElectronic);
  } catch (err) {
    console.error("❌ Error creating electronic:", err);
    res.status(500).json({ message: err.message });
  }
});

// Admin only: Update electronic
router.put("/:id", protect, admin, upload.single("image"), async (req, res) => {
  try {
    const { name, category, price } = req.body;
    const updateData = { name, category, price };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await Electronic.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Not found" });

    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating electronic:", err);
    res.status(500).json({ message: err.message });
  }
});

// Admin only: Delete electronic
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const deleted = await Electronic.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
