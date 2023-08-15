import { JwtPayload, verify } from "jsonwebtoken";
import env from "../utils/envalid";
import createHttpError from "http-errors";
import { RequestHandler } from "express";
import { ObjectId } from "mongoose";

export interface JwtPayloadId extends JwtPayload {
  _id: ObjectId;
  type: string;
}

export const authUserToken: RequestHandler = (req, _, next) => {
  try {
    const authToken = req.headers["authorization"]?.split(" ")[1];
    if (!authToken) {
      throw createHttpError(401, "Token is required.");
    }
    const accessToken = verify(
      authToken,
      env.ACCESS_TOKEN_KEY
    ) as JwtPayloadId | null;
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
