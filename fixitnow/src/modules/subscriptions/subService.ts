import { asyncWrapper } from "../../lib/asyncWrapper.js";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../../prisma/db.js";


export const createIntent = asyncWrapper(async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        message: "success",
        clientSecret: null
    });
});

export const confirmIntent = asyncWrapper(async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        message: `Payment intent confirmed successfully`,
    });
});

export const getPaymentHistory = asyncWrapper(async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        message: `Payment history fetched successfully`,
    });
});

export const getPaymentByUserId = asyncWrapper(async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        message: `Payment details fetched successfully`,
    });
});