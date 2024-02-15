import express from "express";
import { verifyToken } from "../utils/verifyUser";
import { createComment } from "../controllers/comment.controller";

const commentRoutes = express.Router();

commentRoutes.post("/create", verifyToken, createComment);

export default commentRoutes;
