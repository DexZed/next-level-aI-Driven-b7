import { asyncWrapper } from "../../lib/asyncWrapper.js";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../../prisma/db.js";

export const profile = asyncWrapper(async (req: Request, res: Response) => {

    res.status(StatusCodes.OK).json({
        message: `From path ${req.url}, From ${req.method} request`,
        data: "random text"
    })
})

export const availability = asyncWrapper(async (req: Request, res: Response) => {

    res.status(StatusCodes.OK).json({
        message: `From path ${req.url}, From ${req.method} request`,
        data: "random text"
    })
})

export const getBookings = asyncWrapper(async (req: Request, res: Response) => {

    res.status(StatusCodes.OK).json({
        message: `From path ${req.url}, From ${req.method} request`,
        data: "random text"
    })
})

export const updateBookingStatus = asyncWrapper(async (req: Request, res: Response) => {

    res.status(StatusCodes.OK).json({
        message: `From path ${req.url}, From ${req.method} request`,
        data: "random text"
    })
})