import { asyncWrapper } from "../../lib/asyncWrapper.js";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../../prisma/db.js";

interface ServiceInput {
    service_id: string;
    price: number;
}
export const profile = asyncWrapper(async (req: Request, res: Response) => {
    //console.log("profile controller");
    const { id, bio, city, is_available, services } = req.body
    if (!id || !bio || !city || is_available === undefined || !services) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Missing required fields"
        });
    }
    //console.log("data:", req.body);
    const result = await db.transaction(async (tx) => {

        const technician = await tx.orm.public.Technician.select("id", "user_id", "bio", "city", "is_available")
            .upsert({
                create: { user_id: id, bio, city, is_available },
                update: { bio, city, is_available },
            });


        const serviceUpserts = services.map((item: ServiceInput) =>
            tx.orm.public.TechnicianService.select("id", "service_id", "price").upsert({
                create: {
                    technician_id: technician.id,
                    service_id: item.service_id,
                    price: item.price,
                },
                update: {
                    price: item.price,
                },
            })
        );

        const technicianServices = await Promise.all(serviceUpserts);

        return { technician, technicianServices };
    });
    const writeData = {
        ...result.technician,
        services: result.technicianServices
    }
    res.status(StatusCodes.OK).json({
        message: "Profile changed successfully",
        data: writeData
    })
})

export const availability = asyncWrapper(async (req: Request, res: Response) => {
    const { id, is_available } = req.body
    if (!id || is_available === undefined) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Missing required fields"
        });
    }
    const result = await db.orm.public.Technician.where({ id: id }).update({
        is_available: is_available
    })
    res.status(StatusCodes.OK).json({
        message: "Success, availability updated",
        data: result
    })
})

export const getBookings = asyncWrapper(async (req: Request, res: Response) => {
    const id = req.body.id;
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Missing required fields"
        });
    }
    const result = await db.orm.public.Booking.select("user_id", "service_id", "status", "scheduled_at", "total_price").where({ technician_id: id }).all()

    res.status(StatusCodes.OK).json({
        message: "Success, bookings fetched",
        data: result
    })
})

export const updateBookingStatus = asyncWrapper(async (req: Request, res: Response) => {
    const { id, status } = req.body;
    if (!id || !status) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Missing required fields"
        });
    }
    const result = await db.orm.public.Booking.select("id", "status").where({
        id
    }).update({
        status
    })
    res.status(StatusCodes.OK).json({
        message: "Success, booking status updated",
        data: result
    })
})