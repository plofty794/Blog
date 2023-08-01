import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";
import Users from "../models/Users";
import { validatePasswordUserSignUp } from "../utils/blogValidationSchema";

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await Users.find().sort({ _id: "desc" }).exec();
    if (!users.length) {
      throw createHttpError(400, "No such users!");
    }
    res.status(200).json({ hasError: false, users });
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) {
      throw createHttpError(400, "Invalid user ID!");
    }
    const userExist = await Users.findById(id);
    if (!userExist) {
      throw createHttpError(400, "User doesn't exist!");
    }
    res.status(200).json({ hasError: false, user: { ...userExist } });
  } catch (error) {
    next(error);
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const { error } = validatePasswordUserSignUp(password);
    if (error) {
      throw createHttpError(400, error.details[0].message);
    }
    const usernameExist = await Users.findOne({ username });
    if (usernameExist) {
      throw createHttpError(400, "Username already exist!");
    }
    const emailExist = await Users.findOne({ email });
    if (emailExist) {
      throw createHttpError(400, "Email already exist!");
    }
    const newUser = await Users.create({ ...req.body });
    res.status(201).json({ hasError: false, newUser });
  } catch (error) {
    next(error);
  }
};
