import { NextFunction, Response } from "express";
import { RequestExtended } from "../interfaces";
import { StatusCodes } from "http-status-codes";

export default function verifyRoles(...roles: string[]) {
    return (req: RequestExtended, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
            return;
        }
        const userRole = req.user.role;
        if (!roles.find(r => userRole.includes(r))) {
            res.status(StatusCodes.FORBIDDEN).json({
                message: "Forbidden",
            });
            return;
        }
        else {
            next();
        }
    };
}
