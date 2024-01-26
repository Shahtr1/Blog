import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route";
import authRouter from "./routes/auth.route";
import { ERequest, EResponse, IError } from "./models/api.model";
import { NextFunction } from "connect";

dotenv.config();

mongoose
  .connect(process.env.MONGO!)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.error(err));

const app = express();

// create application/json parser
const jsonParser = bodyParser.json();

/*
  // create application/x-www-form-urlencoded parser
  const urlencodedParser = bodyParser.urlencoded({ extended: false });
*/

app.use("/api/user", userRoutes);
app.use("/api/auth", jsonParser, authRouter);

// middleware
app.use((err: IError, req: ERequest, res: EResponse, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
