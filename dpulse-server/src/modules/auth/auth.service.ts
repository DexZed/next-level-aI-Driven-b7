import dbClient from "../../db/model";
import type { Request, Response } from "express";
import { comparePassword, generateToken, hashPassword } from "../../utils/utilities";
import type { User } from "../../utils/interfaces";

export async function register(req: Request, res: Response) {
  const user = req.body;

  if (!user.name || !user.email || !user.password) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid user data" });
  }
  user.password = hashPassword(user.password);

  try {
    const pool = await dbClient.dbQuery();

    if (!pool) {
      throw new Error("Database pool could not be initialized.");
    }

    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [user.name, user.email, user.password, user.role || "user"],
    );

    return res.json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database Insertion Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during registration",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Bad request. Email and password are required.",
    });
  }
  try {
    const pool = await dbClient.dbQuery();
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!user.rows[0]) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!comparePassword(password, user.rows[0].password)) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    const token = generateToken({
      id: user.rows[0].id,
      name: user.rows[0].name,
      role: user.rows[0].role,
    });
    return res.json({
      success: true,
      message: "Login successful",
      data: {
        token: token,
        user: user.rows[0],
        
      },
    });
  } catch (error) {
    console.error("Database Retrieval Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during login",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
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
