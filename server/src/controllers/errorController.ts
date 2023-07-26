import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  if (isHttpError(err)) {
    return res
      .status(err.status)
      .json({ hasError: true, message: err.message });
  }
  res.status(500).json({ hasError: true, message: "Internal Server Error!" });
};
