import type { User } from "../../utils/interfaces";
import type { Request, Response } from "express";

export async function register(req: Request, res: Response) {
  res.json({
    success: true,
    message: "from register",
    data: req.body,
  });
}

export async function login(req: Request, res: Response) {
  res.json({
    success: true,
    message: "from login",
    data: req.body,
  });
}

export async function logout(req: Request, res: Response) {
  res.json({
    success: true,
    message: "from logout",
    data: req.body,
  });
}

export async function refresh(req: Request, res: Response) {
  res.json({
    success: true,
    message: "from refresh",
    data: req.body,
  });
}
