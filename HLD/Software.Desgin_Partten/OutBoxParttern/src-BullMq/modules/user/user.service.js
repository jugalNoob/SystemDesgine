import mongoose from "mongoose";
import { User } from "./user.model.js";
import { Outbox } from "../../outbox/outbox.model.js";

export async function createUserWithOutbox(data) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.create([data], { session });

    await Outbox.create([{
      type: "SEND_WELCOME_EMAIL",
      payload: {
        userId: user[0]._id,
        email: user[0].email
      }
    }], { session });

    await session.commitTransaction();
    session.endSession();

    return user[0];

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}
