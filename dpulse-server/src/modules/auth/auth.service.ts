import type { Request, Response } from "express";
import asyncHandler, {
  comparePassword,
  generateToken,
  hashPassword,
} from "../../utils/utilities";

import { createUser, findUserByEmail } from "../../db/UserModel";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid user data" });
  }

  const hashedPassword = hashPassword(password);
  const newUser = await createUser({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return res.json({
    success: true,
    message: "User registered successfully",
    data: newUser,
  });
});
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  }

  const user = await findUserByEmail(email);
  if (!user || !comparePassword(password, user.password)) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  const token = generateToken({
    id: user.id,
    name: user.name,
    role: user.role,
  });

  return res.json({
    success: true,
    message: "Login successful",
    data: { token, user },
  });
});
export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "from logout",
    data: req.body,
  });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "from refresh",
    data: req.body,
  });
});
