import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route";
import authRouter from "./routes/auth.route";

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

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
