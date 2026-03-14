import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  shortId: { type: String, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,   // ✅ Prevent duplicate email
    lowercase: true,
    trim: true
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
