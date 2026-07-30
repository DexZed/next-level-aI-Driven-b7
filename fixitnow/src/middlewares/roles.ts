import { NextFunction, Response } from "express";
import { RequestExtended } from "../interfaces";
import { StatusCodes } from "http-status-codes";

export default function verifyRoles(...roles: string[]) {
    return (req: RequestExtended, res: Response, next: NextFunction) => {
        //console.log("verifyRoles");
        if (!req.user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Unauthorized",
            });
        }
        //console.log(req.user)
        const userRole = req.user.role;
        if (!roles.find(r => userRole.includes(r))) {
            return res.status(StatusCodes.FORBIDDEN).json({
                message: `Forbidden, only ${roles.join(", ")} can do this`,
            });
        }
        //console.log("veirfy roles passed")
        next();
    };
}
