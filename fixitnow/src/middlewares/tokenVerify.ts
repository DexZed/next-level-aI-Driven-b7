
import { UnauthorizedException } from "../exceptions/httpException";
import { RequestExtended } from "../interfaces";
import { asyncWrapper } from "../lib/asyncWrapper";
import type { NextFunction, Response } from "express";
import { verifyAccessToken } from "../lib/crypto";
import { JwtPayload } from "jsonwebtoken";

const jwtVerify = asyncWrapper(
    async (req: RequestExtended, _: Response, next: NextFunction) => {
        const authHeaderRaw
            = req.headers.authorization || req.headers.Authorization;
        const authHeader = Array.isArray(authHeaderRaw)
            ? authHeaderRaw[0]
            : authHeaderRaw;
        if (!authHeader?.startsWith("Bearer ")) {
            return new UnauthorizedException();
        }
        const token = authHeader.split(" ")[1];
        const decoded = verifyAccessToken(token);
        req.user = decoded as JwtPayload;
        next();
    },
);
export default jwtVerify;
