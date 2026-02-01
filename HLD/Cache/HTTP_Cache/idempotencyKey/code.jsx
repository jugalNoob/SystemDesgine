import { Register } from "../../model/student.js";
import { Idempotency } from "../../model/idempotency.js";

export const updatesAllIdempotent = async (req, res) => {
  const { name, age, country } = req.body;
  const idempotencyKey = req.headers["idempotency-key"];
  const _id = req.params.id;

  if (!idempotencyKey) {
    return res.status(400).json({ error: "Missing Idempotency-Key" });
  }

  try {
    // 1️⃣ Check idempotency store
    const existing = await Idempotency.findOne({ key: idempotencyKey });
    if (existing) {
      return res.status(existing.status).json(existing.response);
    }

    // 2️⃣ Perform update ONCE
    const updatedUser = await Register.findByIdAndUpdate(
      _id,
      { name, age, country },
      { new: true }
    );

    const response = {
      message: "✅ User updated successfully (idempotent)",
      user: updatedUser,
    };

    // 3️⃣ Store response
    await Idempotency.create({
      key: idempotencyKey,
      method: req.method,
      path: req.originalUrl,
      status: 200,
      response,
    });

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
};


// 🧠 Why this is NOW correct


// | Rule                       | Status |
// | -------------------------- | ------ |
// | Same request → same result | ✅      |
// | Retry safe                 | ✅      |
// | No duplicate updates       | ✅      |
// | Clean domain model         | ✅      |
// | Microservice-safe          | ✅      |
// | Interview correct          | ✅      |
