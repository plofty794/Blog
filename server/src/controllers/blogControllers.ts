import { RequestHandler } from "express";
import Blogs from "../models/Blogs";
import createHttpError, { isHttpError } from "http-errors";
import { isValidObjectId } from "mongoose";

export const getBlogs: RequestHandler = async (req, res, next) => {
  try {
    const blogs = await Blogs.find({}).sort({ _id: "desc" }).exec();
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
  const { title }: BlogTypes = req.body;
  try {
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
