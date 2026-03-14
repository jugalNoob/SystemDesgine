import mongoose from "mongoose";

const outboxSchema = new mongoose.Schema({
  type: { type: String, required: true },
  payload: { type: Object, required: true },
  status: {
    type: String,
    enum: ["PENDING", "PROCESSING", "DONE", "FAILED"],
    default: "PENDING"
  },
  retryCount: { type: Number, default: 0 }
}, { timestamps: true });

outboxSchema.index({ status: 1, createdAt: 1 });

export const Outbox = mongoose.model("Outbox", outboxSchema);
