import { NextFunction } from "express";
import { ERequest, EResponse } from "../models/api.model";
import { errorHandler } from "../utils/error";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";
import { log } from "console";

export const test = (req: ERequest, res: EResponse) => {
  res.send("test working");
};

export const updateUser = async (
  req: ERequest,
  res: EResponse,
  next: NextFunction
) => {
  if (!req.body) {
    return next(errorHandler(400, "No Data to update"));
  }
  const { username, email, profilePicture } = req.body;
  const { userId } = req.params;

  if (req.data.id !== userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be atleast 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (username) {
    if (username.length < 7 || username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      );
    }

    if (username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain  spaces"));
    }

    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }

    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username,
          email,
          profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    ).lean();

    const { password, ...rest } = updatedUser!;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
