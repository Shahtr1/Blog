import express from "express";
import { deleteUser, test, updateUser } from "../controllers/user.controller";
import { verifyToken } from "../utils/verifyUser";

const userRoutes = express.Router();

userRoutes.get("/test", test);
userRoutes.put("/update/:userId", verifyToken, updateUser);
userRoutes.delete("/delete/:userId", verifyToken, deleteUser);

export default userRoutes;
