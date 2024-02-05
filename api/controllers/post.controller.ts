import { NextFunction } from "express";
import { ERequest, EResponse } from "../models/api.model";
import { errorHandler } from "../utils/error";
import Post from "../models/post.model";

export const createPost = async (
  req: ERequest,
  res: EResponse,
  next: NextFunction
) => {
  if (!req.data.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.data.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (
  req: ERequest,
  res: EResponse,
  next: NextFunction
) => {
  try {
    const startIndex = parseInt(req.query.startIndex as string) || 0;
    const limit = parseInt(req.query.limit as string) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const query: Record<any, any> = {};

    if (req.query.userId) {
      query.userId = req.query.userId;
    }
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.slug) {
      query.slug = req.query.slug;
    }
    if (req.query.postId) {
      query._id = req.query.postId;
    }
    if (req.query.searchTerm) {
      query.$or = [
        { title: { $regex: req.query.searchTerm, $options: "i" } },
        { content: { $regex: req.query.searchTerm, $options: "i" } },
      ];
    }

    const posts = await Post.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthsPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthsPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: ERequest,
  res: EResponse,
  next: NextFunction
) => {
  if (!req.data.isAdmin || req.data.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    next(error);
  }
};
