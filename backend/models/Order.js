// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      electronic: { type: mongoose.Schema.Types.ObjectId, ref: "electronic", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, default: "pending" },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
