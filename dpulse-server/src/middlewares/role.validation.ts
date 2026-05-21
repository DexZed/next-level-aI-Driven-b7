import type { NextFunction, Response } from "express";
import type { RequestExtended } from "../types";
import {
  ForbiddenException,
  UnauthorizedException,
} from "../errors/HttpException";

export default function verifyRoles(...roles: string[]) {
  return (req: RequestExtended, res: Response, next: NextFunction) => {
    if (!req.user) {
      return new UnauthorizedException("Unauthorized");
    }
    const userRole = req.user.role;
    if (!roles.find((r) => userRole.includes(r))) {
      return new ForbiddenException("Forbidden");
    } else {
      next();
    }
  };
}
