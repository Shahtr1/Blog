import express from "express";
import { verifyToken } from "../utils/verifyUser";
import {
  createComment,
  getPostComments,
} from "../controllers/comment.controller";

const commentRoutes = express.Router();

commentRoutes.post("/create", verifyToken, createComment);
commentRoutes.get("/getPostComments/:postId", getPostComments);

export default commentRoutes;
