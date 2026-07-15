
import { UnauthorizedException } from "../exceptions/httpException";
import { RequestExtended } from "../interfaces";
import { asyncWrapper } from "../lib/asyncWrapper";
import type { NextFunction, Response } from "express";
import { verifyAccessToken } from "../lib/crypto";
import { JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const jwtVerify = asyncWrapper(
    async (req: RequestExtended, res: Response, next: NextFunction) => {
        const authHeaderRaw
            = req.headers.authorization || req.headers.Authorization;
        const authHeader = Array.isArray(authHeaderRaw)
            ? authHeaderRaw[0]
            : authHeaderRaw;
        if (!authHeader?.startsWith("Bearer ")) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You are not authorized. Token malformed",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        const decoded = verifyAccessToken(token);
        if (!decoded) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You are not authorized",
            });
            return;
        }
        req.user = decoded as JwtPayload;
        next();
    },
);
export default jwtVerify;
