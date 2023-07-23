import { ErrorRequestHandler, RequestHandler } from "express";
import Blogs from "../models/Blogs";
import { validateBlog } from "../utils/blogValidationSchema";
import createHttpError, { isHttpError } from "http-errors";
import { isValidObjectId } from "mongoose";

export const getBlogs: RequestHandler = async (req, res, next) => {
  try {
    const blogs = await Blogs.find({}).sort({ createdAt: "desc" }).exec();
    if (!blogs.length) {
      throw createHttpError(400, "No such blogs!");
    }
    res.status(200).json({ hasError: false, blogs });
  } catch (error) {
    next(error);
  }
};

interface BlogTypes {
  title?: string;
  body?: string;
}

export const createBlog: RequestHandler = async (req, res, next) => {
  const { title, body }: BlogTypes = req.body;
  try {
    const { error } = validateBlog({ title, body });
    if (error) {
      throw createHttpError(400, error.details[0].message);
    }
    const blogExist = await Blogs.findOne({ title });
    if (blogExist) {
      throw createHttpError(400, "Title already exist!");
    }
    const newBlog = await Blogs.create({ ...req.body });
    res.status(201).json({ hasError: false, newBlog });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) {
      throw createHttpError(400, "Invalid Blog ID");
    }
    const blogExist = Blogs.findById(id);
    if (!blogExist) {
      throw createHttpError(400, "Blog doesn't exist!");
    }
    await Blogs.findByIdAndDelete(id);
    res.status(200).json({ hasError: false, message: "Blog has been deleted" });
  } catch (error) {
    next(error);
  }
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  if (isHttpError(err)) {
    return res
      .status(err.status)
      .json({ hasError: true, message: err.message });
  }
  res.status(500).json({ hasError: true, message: "Internal Server Error!" });
};
