import express from "express";
import {
  deleteUser,
  signOut,
  test,
  updateUser,
  getUsers,
  getUser,
} from "../controllers/user.controller";
import { verifyToken } from "../utils/verifyUser";

const userRoutes = express.Router();

userRoutes.get("/test", test);
userRoutes.put("/update/:userId", verifyToken, updateUser);
userRoutes.delete("/delete/:userId", verifyToken, deleteUser);
userRoutes.post("/signout", signOut);
userRoutes.get("/getusers", verifyToken, getUsers);
userRoutes.get("/:userId", getUser);

export default userRoutes;
