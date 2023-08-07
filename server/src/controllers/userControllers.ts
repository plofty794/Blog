import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";
import Users from "../models/Users";
import { validatePasswordUserSignUp } from "../utils/signUpValidationSchema";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await Users.find()
      .sort({ _id: "desc" })
      .select(["-password"])
      .exec();
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
  const {
    username,
    email,
    password,
  }: { username?: string; email?: string; password?: string } = req.body;
  try {
    const { error } = validatePasswordUserSignUp(password);
    if (error) {
      throw createHttpError(400, error.details[0].message);
    }
    const userExist = await Users.findOne({ username }).select(["+email"]);
    if (userExist) {
      throw createHttpError(400, "User already exist!");
    }
    const newUser = await Users.create({ ...req.body });
    res.status(201).json({ hasError: false, newUser });
  } catch (error) {
    next(error);
  }
};

export const logInUser: RequestHandler = async (req, res, next) => {
  const { email, password }: { email?: string; password?: string } = req.body;
  try {
    if (!email || !password) {
      throw createHttpError(400, "Parameters are required.");
    }
    const user = await Users.findOne({ email });
    if (!user) {
      throw createHttpError(401, "User doesn't exist.");
    }
    const correctPwd = await bcrypt.compare(password, user.password);
    if (!correctPwd) {
      throw createHttpError(401, "Incorrect user credentials.");
    }
    const { accessToken, refreshToken } = await generateToken(user);
    user.set("password", "");
    res.cookie("user_session", refreshToken, { httpOnly: true });
    res.status(200).json({ hasError: false, user, accessToken });
  } catch (error) {
    next(error);
  }
};
