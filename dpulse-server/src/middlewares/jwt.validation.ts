import type { NextFunction, Response } from "express";

import jwt from "jsonwebtoken";

import type { RequestExtended } from "../types";

import { UnauthorizedException } from "../errors/HttpException";
import asyncHandler from "../utils/utilities";
import { env } from "../env";

const jwtVerify = asyncHandler(
  async (req: RequestExtended, res: Response, next: NextFunction) => {
    const authHeaderRaw
      = req.headers.authorization || req.headers.Authorization;
    const authHeader = Array.isArray(authHeaderRaw)
      ? authHeaderRaw[0]
      : authHeaderRaw;
    if (!authHeader?.startsWith("Bearer ")) {
      return new UnauthorizedException("UnAuthorized");
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(
      token!,
      env.TOKEN!,
      (err: any, decoded: any) => {
        err
          ? new UnauthorizedException("Invalid or expired token")
          : (req.user = decoded);
        next();
      },
    );
  },
);
export default jwtVerify;
