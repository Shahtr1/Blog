import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route";
import authRouter from "./routes/auth.route";
import { ERequest, EResponse, IError } from "./models/api.model";
import { NextFunction } from "connect";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.route";
import commentRoutes from "./routes/comment.route";
import path from "path";

dotenv.config();

mongoose
  .connect(process.env.MONGO!)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.error(err));

const __dirname = path.resolve();

const app = express();

app.use(cookieParser());

// create application/json parser
const jsonParser = bodyParser.json();

/*
  // create application/x-www-form-urlencoded parser
  const urlencodedParser = bodyParser.urlencoded({ extended: false });
*/

app.use("/api/user", jsonParser, userRoutes);
app.use("/api/post", jsonParser, postRoutes);
app.use("/api/auth", jsonParser, authRouter);
app.use("/api/comment", jsonParser, commentRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req: ERequest, res: EResponse) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

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
