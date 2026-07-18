import { asyncWrapper } from "../../lib/asyncWrapper.js";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../../prisma/db.js";

export const createBooking = asyncWrapper(async (req: Request, res: Response) => {
    const { user_id, technician_id, service_id, total_price, scheduled_at } = req.body;

    if (!user_id || !technician_id || !service_id || !total_price) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "All fields are required"
        })
    }
    // TODO : Check if Service is available


    // TODO : Check if technician is available for the given time slot

    const result = await db.orm.public.Booking.select("id", "user_id", "technician_id", "service_id", "status", "total_price", "scheduled_at",).create({
        user_id: user_id,
        technician_id: technician_id,
        service_id: service_id,
        total_price: total_price,
        scheduled_at: scheduled_at ?? new Date(),
    })
    res.status(StatusCodes.OK).json({
        message: `Path ${req.path}`,
        data: result,
    })
});

export const getBookingsByUser = asyncWrapper(async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Id is required"
        })
    }
    const result = await db.orm.public.Booking.select("id", "technician_id", "service_id", "status", "total_price", "scheduled_at",).where({
        user_id: id,
    }).all()
    if (result.length === 0) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: `No bookings found for user ${id}`
        });
    }
    res.status(StatusCodes.OK).json({
        message: "Success",
        data: result
    })
});

export const getBookingById = asyncWrapper(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Id is required"
        })
    }
    const result = await db.orm.public.Booking.select("id", "user_id", "technician_id", "service_id", "status", "total_price", "scheduled_at",).where({
        id: id,
    }).first()
    if (!result) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: `No booking found with id ${id}`
        });
    }
    res.status(StatusCodes.OK).json({
        message: "Success",
        data: result
    })
});