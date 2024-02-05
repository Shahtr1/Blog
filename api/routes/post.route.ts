import express from "express";
import { verifyToken } from "../utils/verifyUser";
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/post.controller";

const postRoutes = express.Router();

postRoutes.post("/create", verifyToken, createPost);
postRoutes.get("/getposts", getPosts);
postRoutes.delete("/deletepost/:postId/:userId", verifyToken, deletePost);
postRoutes.put("/update/:postId/:userId", verifyToken, updatePost);

export default postRoutes;
