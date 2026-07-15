import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../lib/asyncWrapper.js";
import type { Request, Response } from "express";
import { db } from "../../prisma/db.js";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "../../lib/crypto.js";
import { User } from "../../interfaces/typeDefs.js";
import { env } from "../../env.js";
import { RequestExtended } from "../../interfaces/index.js";

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
  const refreshToken = generateRefreshToken(user);
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24
  })
  res.status(StatusCodes.OK).json({
    message: "Success",
    data: {
      user,
      accessToken,
    },
  });
});
export const profile = asyncWrapper(async (req: RequestExtended, res: Response) => {
  const userObject = req.user!;
  console.log(userObject);
  const user = await db.orm.public.User.select("id", "name", "email").where({
    id: userObject.id,
  }).first();
  res.status(StatusCodes.OK).json({
    message: `From ${req.path} `,
    data: user,
  });
});
