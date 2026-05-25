"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryPool = getQueryPool;
exports.createUser = createUser;
exports.findUserByEmail = findUserByEmail;
exports.findUsersByIds = findUsersByIds;
const model_1 = __importDefault(require("./model"));
async function getQueryPool() {
    const pool = await model_1.default.dbQuery();
    if (!pool)
        throw new Error("Database pool could not be initialized.");
    return pool;
}
async function createUser(user) {
    const pool = await getQueryPool();
    const result = await pool.query("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *", [user.name, user.email, user.password, user.role || "user"]);
    return result.rows[0];
}
async function findUserByEmail(email) {
    const pool = await getQueryPool();
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
    ]);
    return result.rows[0];
}
async function findUsersByIds(ids) {
    if (ids.length === 0)
        return [];
    const pool = await getQueryPool();
    const placeholders = ids.map((_, index) => `$${index + 1}`).join(", ");
    const result = await pool.query(`SELECT id, name, role FROM users WHERE id IN (${placeholders})`, ids);
    return result.rows;
}
//# sourceMappingURL=UserModel.js.map