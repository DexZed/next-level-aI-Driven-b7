"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.generateToken = generateToken;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../env");
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
exports.default = asyncHandler;
function hashPassword(password) {
    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
    return hashedPassword;
}
async function comparePassword(password, hashedPassword) {
    const isMatch = await bcrypt_1.default.compare(password, hashedPassword);
    return isMatch;
}
function generateToken(user) {
    const token = jsonwebtoken_1.default.sign(user, env_1.env.TOKEN, {
        expiresIn: "7d",
    });
    return token;
}
//# sourceMappingURL=utilities.js.map