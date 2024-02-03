import express from "express";
import { verifyToken } from "../utils/verifyUser";
import { createPost } from "../controllers/post.controller";

const postRoutes = express.Router();

postRoutes.post("/create", verifyToken, createPost);

export default postRoutes;
