import express from "express";
import { test, updateUser } from "../controllers/user.controller";
import { verifyToken } from "../utils/verifyUser";

const userRoutes = express.Router();

userRoutes.get("/test", test);
userRoutes.put("/update/:userId", verifyToken, updateUser);

export default userRoutes;
