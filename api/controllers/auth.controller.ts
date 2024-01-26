import { NextFunction } from "connect";
import { ERequest, EResponse } from "../models/api.model";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error";
import jwt from "jsonwebtoken";

export const signup = async (
  req: ERequest,
  res: EResponse,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  if (!username?.trim() || !password?.trim() || !email?.trim()) {
    return next(errorHandler(400, "All fields are required!"));
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

export const signin = async (
  req: ERequest,
  res: EResponse,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email.trim() || !password?.trim()) {
    return next(errorHandler(400, "All fields are required!"));
  }

  try {
    const validUser = await User.findOne({ email }).lean();
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET!);

    const { password: pass, ...rest } = validUser;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
