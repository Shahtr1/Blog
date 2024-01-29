import jwt from "jsonwebtoken";
import { ERequest, EResponse } from "../models/api.model";
import { NextFunction } from "express";
import { errorHandler } from "./error";

export const verifyToken = (
  req: ERequest,
  res: EResponse,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.data = user;
    next();
  });
};
