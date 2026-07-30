import { asyncWrapper } from "../../lib/asyncWrapper.js";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../../prisma/db.js";

export const allUsers = asyncWrapper(async (req: Request, res: Response) => {
    const users = await db.orm.public.User.select("id", "email", "name", "role",)
    res.status(StatusCodes.OK).json({
        message: `from path ${req.path} and method ${req.method}`,
        users
    })
})

export const allBookings = asyncWrapper(async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        message: `from path ${req.path} and method ${req.method}`
    })
})

export const allCategories = asyncWrapper(async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        message: `from path ${req.path} and method ${req.method}`
    })
})

export const createServiceCategory = asyncWrapper(async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        message: `from path ${req.path} and method ${req.method}`
    })
})

export const updateUserStatus = asyncWrapper(async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        message: `from path ${req.path} and method ${req.method}`
    })
})