import type { User } from "../utils/interfaces";
import dbClient from "./model";

export async function getQueryPool() {
  const pool = await dbClient.dbQuery();
  if (!pool) throw new Error("Database pool could not be initialized.");
  return pool;
}

export async function createUser(user: User) {
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
