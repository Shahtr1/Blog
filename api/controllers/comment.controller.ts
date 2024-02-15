import { NextFunction } from "express";
import { ERequest, EResponse } from "../models/api.model";
import { errorHandler } from "../utils/error";
import Comment from "../models/comment.model";

export const createComment = async (
  req: ERequest,
  res: EResponse,
  next: NextFunction
) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.data.id) {
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (
  req: ERequest,
  res: EResponse,
  next: NextFunction
) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
