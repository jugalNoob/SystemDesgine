import { createUserWithOutbox } from "./user.service.js";

export const createUser = async (req, res) => {
  const user = await createUserWithOutbox(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
};
