"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_service_1 = require("./auth.service");
const authRouter = express_1.default.Router();
authRouter.post("/signup", auth_service_1.register);
authRouter.post("/login", auth_service_1.login);
authRouter.post("/logout", auth_service_1.logout);
authRouter.post("/refresh", auth_service_1.refresh);
exports.default = authRouter;
//# sourceMappingURL=auth.controller.js.map