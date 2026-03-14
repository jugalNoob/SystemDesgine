import mongoose from "mongoose";
import User from "../models/User.js";
import Outbox from "../models/Outbox.js";

export const createUser = async (req, res) => {
  const { email } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {email} =req.id 

    const shortId=shortid.generate()
    // 1️⃣ Create user
 const user = await User.create([{
  email,
  shortId
}], { session });

    // 2️⃣ Create Outbox Event
    await Outbox.create([{
      eventType: "SEND_WELCOME_EMAIL",
      payload: { email }
    }], { session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ success: true, user });

  } catch (err) {

    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
   }


    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: err.message });
  }
};
