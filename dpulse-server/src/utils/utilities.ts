import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import type { User } from "./interfaces";
import jwt from "jsonwebtoken";

type AsyncRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

function asyncHandler(fn: AsyncRouteHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default asyncHandler;

export function hashPassword(password: string) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export function generateToken(
  user: Omit<User, "password" | "created_at" | "updated_at" | "email">,
) {
  const token = jwt.sign(user, process.env.TOKEN as string, {
    expiresIn: "7d",
  });
  return token;
}
