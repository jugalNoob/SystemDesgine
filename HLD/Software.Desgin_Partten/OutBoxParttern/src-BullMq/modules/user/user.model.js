import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  value: String,
  email: { type: String, unique: true },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
