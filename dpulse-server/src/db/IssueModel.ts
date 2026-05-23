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
  sort?: string; 
  type?: string; 
  status?: string;
}) {
  const conditions: string[] = [];
  const values: any[] = [];

  if (queryParams?.type === "bug" || queryParams?.type === "feature_request") {
    values.push(queryParams.type);
    conditions.push(`type = $${values.length}`);
  }

  const validStatuses = ["open", "in_progress", "resolved"];
  if (queryParams?.status && validStatuses.includes(queryParams.status)) {
    values.push(queryParams.status);
    conditions.push(`status = $${values.length}`);
  }

  let queryText = "SELECT * FROM issues";
  if (conditions.length > 0) {
    queryText += ` WHERE ${conditions.join(" AND ")}`;
  }

  const direction = queryParams?.sort === "oldest" ? "ASC" : "DESC";
  queryText += ` ORDER BY created_at ${direction}`;

  const pool = await getQueryPool();
  const result = await pool.query(queryText, values);

  return result.rows;
}

export async function getIssueById(id: number) {
  const pool = await getQueryPool();
  const result = await pool.query("SELECT * FROM issues WHERE id = $1", [id]);
  return result.rows[0];
}

export async function updateIssue(id: number, issue: { title: string; description: string; type: string }) {
  const pool = await getQueryPool();
  const result = await pool.query(
    "UPDATE issues SET title = $1, description = $2, type = $3 WHERE id = $4 RETURNING *",
    [issue.title, issue.description, issue.type, id]
  );
  return result.rows[0];
}
export async function deleteIssue(id: number) {
  const pool = await getQueryPool();
  const result = await pool.query("DELETE FROM issues WHERE id = $1", [id]);
  return result.rows[0];
}
