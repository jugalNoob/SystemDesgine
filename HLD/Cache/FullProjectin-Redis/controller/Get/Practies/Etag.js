
import crypto from 'node:crypto'
// 🔥 ETag generator
export function generateETag(data) {
  return crypto
    .createHash("md5")
    .update(JSON.stringify(data))
    .digest("hex");
}
 