import type { NextFunction, Request, Response } from "express";
import { HttpException } from "./HttpException";

export function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let statusCode = 500;
  let message: string | {} = "Internal server error";
  if (err instanceof HttpException) {
    statusCode = err.status;
    message = err.message;
  } 
  res.status(statusCode).json({
    status: statusCode,
    timeStamp: new Date().toISOString(),
    path: req.originalUrl,
    message
  })
}
