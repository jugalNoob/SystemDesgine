import mongoose from "mongoose";

const outboxSchema = new mongoose.Schema({
  eventType: String,
  payload: Object,
  status: {
  type: String,
  enum: ["PENDING", "PROCESSING", "SENT", "FAILED"],
  default: "PENDING"
}
  
}, { timestamps: true });

export default mongoose.model("Outbox", outboxSchema);



// status: {
//   type: String,
//   enum: ["PENDING", "PROCESSING", "SENT", "FAILED"],
//   default: "PENDING"
// }
