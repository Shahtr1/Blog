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

export const likeComment = async (
  req: ERequest,
  res: EResponse,
  next: NextFunction
) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    const userIndex = comment.likes.indexOf(req.data.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.data.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const editComment = async (
  req: ERequest,
  res: EResponse,
  next: NextFunction
) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.data.id && !req.data.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to edit this comment")
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: ERequest,
  res: EResponse,
  next: NextFunction
) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.data.id && !req.data.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to delete this comment")
      );
    }

    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json("Comment has been deleted");
  } catch (error) {
    next(error);
  }
};
export const getComments = async (
  req: ERequest,
  res: EResponse,
  next: NextFunction
) => {
  try {
    if (!req.data.isAdmin)
      return next(errorHandler(403, "You are not allowed to get all comments"));
    const startIndex = parseInt(req.query.startIndex as string) || 0;
    const limit = parseInt(req.query.limit as string) || 9;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    next(error);
  }
};
