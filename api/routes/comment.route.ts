import express from "express";
import { verifyToken } from "../utils/verifyUser";
import {
  createComment,
  getPostComments,
  likeComment,
} from "../controllers/comment.controller";

const commentRoutes = express.Router();

commentRoutes.post("/create", verifyToken, createComment);
commentRoutes.get("/getPostComments/:postId", getPostComments);
commentRoutes.put("/likeComment/:commentId", verifyToken, likeComment);

export default commentRoutes;
