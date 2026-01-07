import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB ");

    const existing = await User.findOne({ email: "admin@test.com" });
    if (existing) {
      console.log("Admin already exists ");
      return mongoose.disconnect();
    }

    const admin = new User({
      username: "Admin",
      email: "admin@test.com",
      password: "admin123", 
      role: "admin",
    });

    await admin.save();
    console.log("Admin created ");

    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding admin:", err);
    mongoose.disconnect();
  }
};

seedAdmin();
