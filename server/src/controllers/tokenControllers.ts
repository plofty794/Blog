import { RequestHandler } from "express";
import { verify, sign } from "jsonwebtoken";
import env from "../utils/envalid";
import createHttpError from "http-errors";
import { JwtPayloadId } from "../middlewares/authToken";
import Token from "../models/UserToken";

export const verifyRefreshToken: RequestHandler = async (req, res, next) => {
  const refreshToken = req.headers.cookie?.split("=")[1];
  try {
    if (!refreshToken) {
      throw createHttpError(400, "Token is required.");
    }
    const userToken = await Token.findOne({ token: refreshToken });
    if (!userToken) {
      throw createHttpError(400, "Refresh Token not found.");
    }
    verify(refreshToken, env.REFRESH_TOKEN_KEY) as JwtPayloadId;
    const accessToken = sign(
      { _id: userToken.userId, type: "access" },
      env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "30secs",
      }
    );
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
