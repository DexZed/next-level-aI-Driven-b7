import { NextFunction } from "express";
import { UnauthorizedException, ForbiddenException } from "../exceptions/httpException";
import { RequestExtended } from "../interfaces";

export default function verifyRoles(...roles: string[]) {
    return (req: RequestExtended, _: Response, next: NextFunction) => {
        if (!req.user) {
            return new UnauthorizedException();
        }
        const userRole = req.user.role;
        if (!roles.find(r => userRole.includes(r))) {
            return new ForbiddenException();
        }
        else {
            next();
        }
    };
}
