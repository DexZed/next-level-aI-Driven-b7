"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = exports.UnauthorizedException = exports.NotFoundException = exports.BadRequestException = exports.HttpException = void 0;
class HttpException extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.HttpException = HttpException;
class BadRequestException extends HttpException {
    details;
    constructor(message = "Bad Request", details) {
        super(400, message);
        this.details = details;
    }
}
exports.BadRequestException = BadRequestException;
class NotFoundException extends HttpException {
    constructor(message = "Not Found") {
        super(404, message);
    }
}
exports.NotFoundException = NotFoundException;
class UnauthorizedException extends HttpException {
    constructor(message = "Unauthorized") {
        super(401, message);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends HttpException {
    constructor(message = "Forbidden") {
        super(403, message);
    }
}
exports.ForbiddenException = ForbiddenException;
//# sourceMappingURL=HttpException.js.map