import { asyncWrapper } from "../../lib/asyncWrapper.js";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../../prisma/db.js";

export const profile = asyncWrapper(async (req: Request, res: Response) => {
    const { id, bio, city, is_available, services } = req.body
    if (!id || !bio || !city || !is_available || !services) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Missing required fields"
        });
    }
    const result = await db.orm.public.Technician.select("id", "user_id", "bio", "city", "is_available", "services").upsert({
        create: { bio, city, is_available, user_id: id },
        update: { bio, city, is_available, user_id: id },
    })
    const technicianToServices = await db.orm.public.TechnicianService.select("id", "technician_id", "service_id", "price").upsert({
        create: { technician_id: result.id, service_id: services, price: services.price },
        update: { technician_id: result.id, service_id: services, price: services.price },
    })
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