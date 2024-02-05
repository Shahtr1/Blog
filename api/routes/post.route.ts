import express from "express";
import { verifyToken } from "../utils/verifyUser";
import { createPost, getPosts } from "../controllers/post.controller";

const postRoutes = express.Router();

postRoutes.post("/create", verifyToken, createPost);
postRoutes.get("/getposts", getPosts);

export default postRoutes;
