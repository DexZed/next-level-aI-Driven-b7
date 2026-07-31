import { RequestExtended } from "../interfaces";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../lib/asyncWrapper";
import { NextFunction, Response } from "express";
import { db } from "../prisma/db";

export default function userStatus() {
    return asyncWrapper(async (req: RequestExtended, res: Response, next: NextFunction) => {
        const user = await db.orm.public.User.where({ id: req.user?.id }).first();
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "User Not Found",
            })
            return;
        }
        if (user.status !== "active") {
            res.status(StatusCodes.FORBIDDEN).json({
                message: "Account Suspended",
            })
            return;
        }
        next()
    })
}