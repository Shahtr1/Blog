import { ERequest, EResponse } from "../models/api.model";
import User from "../models/user.model";
import { errorHandler } from "./common";
import bcryptjs from "bcryptjs";

export const signup = async (req: ERequest, res: EResponse) => {
  const { username, email, password } = req.body;

  if (!username?.trim() || !password?.trim() || !email?.trim()) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    errorHandler(error, res);
  }
};
