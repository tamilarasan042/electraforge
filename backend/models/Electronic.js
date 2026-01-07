import mongoose from "mongoose";

const ElectronicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  reviewUrl: { type: String },
}, { timestamps: true });

export default mongoose.model("Electronic", ElectronicSchema);
