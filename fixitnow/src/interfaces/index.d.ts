import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export type RequestExtended = {
    user?: JwtPayload;
} & Request;
