import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../lib/asyncWrapper";
import type { Request, Response } from "express";
import { db } from "../../prisma/db";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "../../lib/crypto";
import { User } from "../../interfaces/typeDefs";

export const register = asyncWrapper(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "All fields are required",
    });
  }
  const doesExist = await db.orm.public.User.where({
    email: email!,
  }).first();

  if (doesExist) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "User already exists",
    });
  }
  const password_hash = hashPassword(password);
  const user = await db.orm.public.User.select("id", "name", "email").create({
    name,
    email,
    password_hash,
    role,
  });
  res.status(StatusCodes.OK).json({
    message: "Success",
    data: user,
  });
});
export const login = asyncWrapper(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "All fields are required",
    });
  }
  const user = await db.orm.public.User.select(
    "id",
    "email",
    "role",
    "password_hash",
  )
    .where({
      email: email!,
    })
    .first();

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "User not found",
    });
  }

  const isMatch = await comparePassword(password, user.password_hash);
  if (!isMatch) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Invalid password",
    });
  }

  const accessToken = generateAccessToken(user);
  // const refreshToken = generateRefreshToken(user);
  // res.cookie("Refresh Token")
  res.status(StatusCodes.OK).json({
    message: "Success",
    data: {
      user,
      accessToken,
      // refreshToken,
    },
  });
});
export const profile = asyncWrapper(async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    message: `From ${req.path} `,
  });
});
