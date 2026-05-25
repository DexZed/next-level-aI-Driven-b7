"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = verifyRoles;
const HttpException_js_1 = require("../errors/HttpException.js");
function verifyRoles(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            return new HttpException_js_1.UnauthorizedException("Unauthorized");
        }
        const userRole = req.user.role;
        if (!roles.find(r => userRole.includes(r))) {
            return new HttpException_js_1.ForbiddenException("Forbidden");
        }
        else {
            next();
        }
    };
}
//# sourceMappingURL=role.validation.js.map