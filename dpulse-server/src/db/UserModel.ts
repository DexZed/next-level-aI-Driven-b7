import type { User } from "../utils/interfaces.js";

import dbClient from "./model";

export async function getQueryPool() {
  const pool = await dbClient.dbQuery();
  if (!pool)
    throw new Error("Database pool could not be initialized.");
  return pool;
}

export async function createUser(user: Omit<User, "id" | "created_at" | "updated_at">) {
  const pool = await getQueryPool();
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [user.name, user.email, user.password, user.role || "user"],
  );
  return result.rows[0];
}

export async function findUserByEmail(email: string) {
  const pool = await getQueryPool();
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
}

export async function findUsersByIds(ids: number[]) {
  if (ids.length === 0)
    return [];
  const pool = await getQueryPool();
  const placeholders = ids.map((_, index) => `$${index + 1}`).join(", ");
  const result = await pool.query(
    `SELECT id, name, role FROM users WHERE id IN (${placeholders})`,
    ids,
  );
  return result.rows;
}
