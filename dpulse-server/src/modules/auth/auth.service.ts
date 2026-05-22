import dbClient from "../../db/model";
import type { Request, Response } from "express";

export async function register(req: Request, res: Response) {
  const user = req.body;

  if (!user.name || !user.email || !user.password) {
    return res.status(400).json({ success: false, message: "Invalid user data" });
  }

  try {
    const pool = await dbClient.dbQuery();
    
    if (!pool) {
      throw new Error("Database pool could not be initialized.");
    }

    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [user.name, user.email, user.password, user.role || 'user'],
    );


    return res.json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0], // Access the inserted row
    });

  } catch (error) {
    console.error("Database Insertion Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error during registration" 
    });
  }
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
