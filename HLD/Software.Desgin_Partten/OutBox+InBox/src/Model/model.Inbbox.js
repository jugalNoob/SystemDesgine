
// InBoxModle.js
import mongoose from 'mongoose';

const inboxSchema = new mongoose.Schema({
  messageId: { type: String, required: true, unique: true },
  processedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Inbox', inboxSchema);
