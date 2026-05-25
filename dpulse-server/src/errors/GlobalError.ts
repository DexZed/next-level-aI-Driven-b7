import type { NextFunction, Request, Response } from "express";

import { BadRequestException, HttpException } from "./HttpException";
import { env } from "../env";

export function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction,
) {
  let statusCode = 500;
  let message = "Internal server error";
  let details: any;

  if (err instanceof HttpException) {
    statusCode = err.status;
    message = err.message;

    if (err instanceof BadRequestException) {
      details = err.details;
    }
  }
  else {
    console.error("💥 Unhandled Application Error:", err);
  }

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    timeStamp: new Date().toISOString(),
    path: req.originalUrl,
    message,
    ...(details && { details }),
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
