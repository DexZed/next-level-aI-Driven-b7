import type { Issue } from "../utils/interfaces";
import { getQueryPool } from "./UserModel";

export async function createIssue(
  issue: Omit<Issue, "id" | "created_at" | "updated_at" | "status">,
) {
  const pool = await getQueryPool();
  const result = await pool.query(
    "INSERT INTO issues (title, description, type, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [issue.title, issue.description, issue.type, issue.reporter_id],
  );
  return result.rows[0];
}

export async function getIssues(queryParams?: {
  sort: string;
  type: string;
  status: string;
}) {
  const pool = await getQueryPool();
  const result = await pool.query("SELECT * FROM issues");
  return result.rows;
}

export async function getIssueById(id: number) {
  const pool = await getQueryPool();
  const result = await pool.query("SELECT * FROM issues WHERE id = $1", [id]);
  return result.rows[0];
}

export async function updateIssue(id: number, issue: Issue) {
  const pool = await getQueryPool();
  const result = await pool.query(
    "UPDATE issues SET title = $1, description = $2, type = $3 WHERE id = $4",
    [issue.title, issue.description, issue.type, id],
  );
  return result.rows[0];
}

export async function deleteIssue(id: number) {
  const pool = await getQueryPool();
  const result = await pool.query("DELETE FROM issues WHERE id = $1", [id]);
  return result.rows[0];
}
