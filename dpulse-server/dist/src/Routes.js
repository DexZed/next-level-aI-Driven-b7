"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./modules/auth/auth.controller"));
const issues_controller_1 = __importDefault(require("./modules/issues/issues.controller"));
const router = (0, express_1.Router)();
const routes = [
    {
        path: "/",
        route: router.get("/", (_, res) => {
            res.send("Hello World");
        }),
    },
    {
        path: "/api/auth",
        route: auth_controller_1.default,
    },
    {
        path: "/api/issues",
        route: issues_controller_1.default,
    },
];
exports.default = routes;
//# sourceMappingURL=Routes.js.map