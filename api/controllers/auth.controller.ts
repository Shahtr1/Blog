import { NextFunction } from "connect";
import { ERequest, EResponse } from "../models/api.model";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";

export const signup = async (
  req: ERequest,
  res: EResponse,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  if (!username?.trim() || !password?.trim() || !email?.trim()) {
    return next({ statusCode: 400, message: "All fields are required" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};
