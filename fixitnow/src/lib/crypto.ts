import bcrypt from "bcrypt";
import { env } from "../env";
import { User } from "../interfaces/typeDefs.js";
import jwt from "jsonwebtoken";

export function hashPassword(password: string) {
  const hashedPassword = bcrypt.hashSync(password, env.BCRYPT_SALT_ROUNDS);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export function generateAccessToken(
  user: Omit<User, "password" | "created_at" | "updated_at" | "name">,
) {
  const token = jwt.sign(user, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as "1d",
  });
  return token;
}

export function generateRefreshToken(
  user: Omit<User, "password" | "created_at" | "updated_at" | "name">,
) {
  const token = jwt.sign(user, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as "7d",
  });
  return token;
}

export function verifyAccessToken(token: string) {
  const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
  return decoded;
}
