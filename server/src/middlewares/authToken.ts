import { JwtPayload, verify } from "jsonwebtoken";
import env from "../utils/envalid";
import createHttpError from "http-errors";
import { RequestHandler } from "express";
import { ObjectId } from "mongoose";

export interface JwtPayloadId extends JwtPayload {
  _id: ObjectId;
}

export const authUserToken: RequestHandler = (req, _, next) => {
  try {
    const authToken = req.headers["authorization"]?.split(" ")[1];
    console.log(authToken);
    if (!authToken) {
      throw createHttpError(401, "Token is required.");
    }
    const accessToken = verify(
      authToken,
      env.ACCESS_TOKEN_KEY
    ) as JwtPayloadId | null;
    if (!accessToken) {
      throw createHttpError(400, "Invalid or expired token.");
    }
    req.user = accessToken?._id;
    next();
  } catch (error) {
    next(error);
  }
};

declare module "express-serve-static-core" {
  interface Request {
    user?: {};
  }
  interface Response {
    myField?: string;
  }
}
