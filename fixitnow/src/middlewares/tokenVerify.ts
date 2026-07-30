
import { RequestExtended } from "../interfaces";
import { asyncWrapper } from "../lib/asyncWrapper.js";
import type { NextFunction, Response } from "express";
import { verifyAccessToken } from "../lib/crypto.js";
import { JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const jwtVerify = asyncWrapper(
    async (req: RequestExtended, res: Response, next: NextFunction) => {
        //console.log("JWT middleware");
        const authHeaderRaw
            = req.headers.authorization || req.headers.Authorization;
        const authHeader = Array.isArray(authHeaderRaw)
            ? authHeaderRaw[0]
            : authHeaderRaw;
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You are not authorized. Token malformed",
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = verifyAccessToken(token);
        if (!decoded) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You are not authorized",
            });

        }
        req.user = decoded as JwtPayload;
        //console.log("JWT middleware passed");
        //console.log(req.user);
        next();

    },
);
export default jwtVerify;
