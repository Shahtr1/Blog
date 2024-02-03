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

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET!
    );

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

export const google = async (
  req: ERequest,
  res: EResponse,
  next: NextFunction
) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    let user = await User.findOne({ email }).lean();
    let response = undefined;

    if (!user) {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      user = await newUser.save();

      const { password, ...rest } = user;
      // TODO: Please fix this, very very bad!
      response = (rest as any)._doc;
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET!
    );
    const { password, ...rest } = user;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(response || rest); // TODO: Please fix this, very very bad!
  } catch (error) {
    next(error);
  }
};
