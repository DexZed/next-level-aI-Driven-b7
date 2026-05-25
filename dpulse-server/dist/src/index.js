"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const model_1 = __importDefault(require("./db/model"));
const ExceptionHandler_1 = require("./errors/ExceptionHandler");
ExceptionHandler_1.ExceptionHandler.init();
async function bootstrap() {
    try {
        await model_1.default.connect();
        model_1.default.status();
        (0, app_1.default)();
    }
    catch (error) {
        console.error("Failed to start server:", error);
    }
}
bootstrap();
//# sourceMappingURL=index.js.map