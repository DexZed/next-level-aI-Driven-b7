import type { NextFunction, Response } from "express";

import type { RequestExtended } from "../types/index.js";

import {
  ForbiddenException,
  UnauthorizedException,
} from "../errors/HttpException.js";

export default function verifyRoles(...roles: string[]) {
  return (req: RequestExtended, res: Response, next: NextFunction) => {
    if (!req.user) {
      return new UnauthorizedException("Unauthorized");
    }
    const userRole = req.user.role;
    if (!roles.find(r => userRole.includes(r))) {
      return new ForbiddenException("Forbidden");
    }
    else {
      next();
    }
  };
}
