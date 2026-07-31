import { asyncWrapper } from "../../lib/asyncWrapper.js";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../../prisma/db.js";

export const createReviews = asyncWrapper(async (req: Request, res: Response) => {
    const { user_id, technician_id, booking_id, rating, comment } = req.body;
    if (!user_id || !technician_id || !booking_id || !rating || !comment) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Missing required fields"
        });
    }
    const result = await db.orm.public.Review.select("id", "user_id", "technician_id", "booking_id", "rating", "comment").create({
        user_id,
        technician_id,
        booking_id,
        rating,
        comment
    })
    res.status(StatusCodes.OK).json({
        message: "Success, review created",
        data: result
    })
})
export const getReviews = asyncWrapper(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await db.orm.public.Review.select("id", "user_id", "technician_id", "booking_id", "rating", "comment").where((i) => i.user_id.eq(id)).all()
    res.status(StatusCodes.OK).json({
        message: "Success, reviews fetched",
        data: result
    })
})