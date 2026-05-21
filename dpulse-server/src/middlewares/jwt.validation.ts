import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/utilities";
import type { RequestExtended } from "../types";
import { UnauthorizedException } from "../errors/HttpException";

const jwtVerify = asyncHandler(
  async (req: RequestExtended, res: Response, next: NextFunction) => {
    const authHeaderRaw =
      req.headers.authorization || req.headers.Authorization;
    const authHeader = Array.isArray(authHeaderRaw)
      ? authHeaderRaw[0]
      : authHeaderRaw;
    if (!authHeader?.startsWith("Bearer ")) {
      return new UnauthorizedException("UnAuthorized");
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token!,
      process.env.ACCESS_TOKEN!,
      (err: any, decoded: any) => {
        err
          ? new UnauthorizedException("Invalid or expired token")
          : (req.user = decoded);
        next();
      },
    );
  },
);
