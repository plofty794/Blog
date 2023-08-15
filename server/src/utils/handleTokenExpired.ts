import { ErrorRequestHandler, Response } from "express";
import { isRefreshToken } from "./isRefreshToken";

export const handleTokenExpired = async (err: any, res: Response) => {
  const tokenExpired = await isRefreshToken(err.expiredAt);
  if (!tokenExpired) {
    return res
      .status(401)
      .json({ hasError: true, message: `Access ${err.message}` });
  }
  return res
    .status(403)
    .json({ hasError: true, message: tokenExpired.message });
};
