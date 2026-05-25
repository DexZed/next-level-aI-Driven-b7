"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIssue = createIssue;
exports.getIssues = getIssues;
exports.getIssueById = getIssueById;
exports.updateIssue = updateIssue;
exports.deleteIssue = deleteIssue;
const UserModel_1 = require("./UserModel");
async function createIssue(issue) {
    const pool = await (0, UserModel_1.getQueryPool)();
    const result = await pool.query("INSERT INTO issues (title, description, type, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *", [issue.title, issue.description, issue.type, issue.reporter_id]);
    return result.rows[0];
}
async function getIssues(queryParams) {
    const conditions = [];
    const values = [];
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
    const pool = await (0, UserModel_1.getQueryPool)();
    const result = await pool.query(queryText, values);
    return result.rows;
}
async function getIssueById(id) {
    const pool = await (0, UserModel_1.getQueryPool)();
    const result = await pool.query("SELECT * FROM issues WHERE id = $1", [id]);
    return result.rows[0];
}
async function updateIssue(id, issue) {
    const pool = await (0, UserModel_1.getQueryPool)();
    const result = await pool.query("UPDATE issues SET title = $1, description = $2, type = $3 WHERE id = $4 RETURNING *", [issue.title, issue.description, issue.type, id]);
    return result.rows[0];
}
async function deleteIssue(id) {
    const pool = await (0, UserModel_1.getQueryPool)();
    const result = await pool.query("DELETE FROM issues WHERE id = $1", [id]);
    return result.rows[0];
}
//# sourceMappingURL=IssueModel.js.map