import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";
import { handleTokenExpired } from "../utils/handleTokenExpired";

export const errorHandler: ErrorRequestHandler = async (err, _, res, __) => {
  if (err.name === "TokenExpiredError") {
    return handleTokenExpired(err, res);
  }
  if (isHttpError(err)) {
    return res
      .status(err.status)
      .json({ hasError: true, message: err.message });
  }
  res.status(500).json({ hasError: true, message: err.message });
};
