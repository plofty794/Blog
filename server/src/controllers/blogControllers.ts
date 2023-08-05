import { RequestHandler } from "express";
import Blogs from "../models/Blogs";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const getBlogs: RequestHandler = async (req, res, next) => {
  try {
    const blogs = await Blogs.find({}).sort({ _id: "desc" }).exec();
    if (!blogs.length) {
      throw createHttpError(400, "No blogs found.");
    }
    res.status(200).json({ hasError: false, blogs });
  } catch (error) {
    next(error);
  }
};

export const getBlogsPerPage: RequestHandler = async (req, res, next) => {
  const user = req.user;
  const limit = 6;
  const page: number = parseInt(req.params.page as string) ?? 1;
  try {
    if (page < 1) {
      throw createHttpError(400, "Invalid page number.");
    }
    const totalBlogs = await Blogs.countDocuments({});
    const totalPages = Math.ceil(totalBlogs / limit);
    if (page > totalPages) {
      throw createHttpError(404, "This page could not be found.");
    }
    const blogs = await Blogs.find({ user })
      .skip((page - 1) * limit)
      .populate({ select: "username", path: "user" })
      .limit(limit)
      .sort({ _id: "desc" })
      .exec();
    if (!blogs.length) {
      throw createHttpError(400, "No blogs found.");
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
  const user = req.user;
  try {
    const blogExist = await Blogs.findOne({ title });
    if (blogExist) {
      throw createHttpError(400, "Title already exist!");
    }
    const newBlog = await Blogs.create({ ...req.body, user });
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
