"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = init;
const express_1 = __importDefault(require("express"));
const chalk_1 = __importDefault(require("chalk"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const Routes_1 = __importDefault(require("./Routes"));
const HttpException_1 = require("./errors/HttpException");
const GlobalError_1 = require("./errors/GlobalError");
const env_1 = require("./env");
const APP = (0, express_1.default)();
function initMiddlewares() {
    APP.use(express_1.default.json());
    APP.use(express_1.default.urlencoded({ extended: true }));
    APP.use((0, cookie_parser_1.default)());
    APP.use((0, cors_1.default)());
    APP.use((0, helmet_1.default)());
    APP.use((0, morgan_1.default)((tokens, req, res) => {
        const status = Number(tokens.status?.(req, res));
        const color = status >= 500
            ? chalk_1.default.red
            : status >= 400
                ? chalk_1.default.yellow
                : status >= 300
                    ? chalk_1.default.cyan
                    : chalk_1.default.green;
        return [
            chalk_1.default.gray(tokens.method?.(req, res)),
            chalk_1.default.blue(tokens.url?.(req, res)),
            color(tokens.status?.(req, res)),
            chalk_1.default.magenta(`${tokens["response-time"]?.(req, res)} ms`),
        ].join(" ");
    }));
}
function initRoutes(routes) {
    routes.forEach(({ path, route, middleware }) => {
        middleware?.length
            ? APP.use(path, ...middleware, route)
            : APP.use(path, route);
    });
}
function initErrorHandler() {
    APP.use((req, res, next) => {
        next(new HttpException_1.NotFoundException(`Route ${req.originalUrl} not found`));
    });
    APP.use(GlobalError_1.globalErrorHandler);
}
function initServer(port) {
    APP.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
function init() {
    initMiddlewares();
    initRoutes(Routes_1.default);
    initErrorHandler();
    initServer(Number(env_1.env.PORT) ?? 3000);
}
//# sourceMappingURL=app.js.map