"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = globalErrorHandler;
const HttpException_1 = require("./HttpException");
const env_1 = require("../env");
function globalErrorHandler(err, req, res, _) {
    let statusCode = 500;
    let message = "Internal server error";
    let details;
    if (err instanceof HttpException_1.HttpException) {
        statusCode = err.status;
        message = err.message;
        if (err instanceof HttpException_1.BadRequestException) {
            details = err.details;
        }
    }
    else {
        console.error("💥 Unhandled Application Error:", err);
    }
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        timeStamp: new Date().toISOString(),
        path: req.originalUrl,
        message,
        ...(details && { details }),
        ...(env_1.env.NODE_ENV === "development" && { stack: err.stack }),
    });
}
//# sourceMappingURL=GlobalError.js.map