"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpException_1 = require("../errors/HttpException");
const utilities_1 = __importDefault(require("../utils/utilities"));
const env_1 = require("../env");
const jwtVerify = (0, utilities_1.default)(async (req, res, next) => {
    const authHeaderRaw = req.headers.authorization || req.headers.Authorization;
    const authHeader = Array.isArray(authHeaderRaw)
        ? authHeaderRaw[0]
        : authHeaderRaw;
    if (!authHeader?.startsWith("Bearer ")) {
        return new HttpException_1.UnauthorizedException("UnAuthorized");
    }
    const token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, env_1.env.TOKEN, (err, decoded) => {
        err
            ? new HttpException_1.UnauthorizedException("Invalid or expired token")
            : (req.user = decoded);
        next();
    });
});
exports.default = jwtVerify;
//# sourceMappingURL=jwt.validation.js.map