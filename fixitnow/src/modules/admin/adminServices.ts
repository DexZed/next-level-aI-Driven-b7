import { asyncWrapper } from "../../lib/asyncWrapper.js";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../../prisma/db.js";

export const allUsers = asyncWrapper(async (_: Request, res: Response) => {
    const users = await db.orm.public.User.select("id", "email", "name", "role", "status").all()
    res.status(StatusCodes.OK).json({
        message: "Users Fetched Successfully",
        data: users
    })
})

export const allBookings = asyncWrapper(async (_: Request, res: Response) => {

    const bookings = db.orm.public.Booking.select('id', 'user_id', 'technician_id', 'service_id', 'status', 'scheduled_at', 'total_price', 'created_at', 'updated_at').all()
    res.status(StatusCodes.OK).json({
        message: "Bookings Fetched Successfully",
        data: bookings
    })
})

export const allCategories = asyncWrapper(async (_: Request, res: Response) => {
    const categories = await db.orm.public.Category.select('id', 'name', 'description', 'is_active').all()
    res.status(StatusCodes.OK).json({
        message: "Categories Fetched Successfully",
        data: categories
    })
})

export const createServiceCategory = asyncWrapper(async (req: Request, res: Response) => {
    const { name, description, is_active } = req.body

    if (!name || !description || is_active === undefined) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "All fields are required",
        })
        return;
    }
    const existingCategory = await db.orm.public.Category.where((n) => n.name.ilike(`${name}%`)).first();
    if (existingCategory) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Category already exists",
        })
        return;
    }
    const category = await db.orm.public.Category.create({
        name,
        description,
        is_active

    })
    res.status(StatusCodes.OK).json({
        message: "Category Created Successfully",
        data: category
    })
})

export const updateUserStatus = asyncWrapper(async (req: Request, res: Response) => {
    const id = req.params.id;
    const { status } = req.body;
    const user = await db.orm.public.User.where((i) => i.id.eq(id)).first();
    if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "User not found",
        })
        return;
    }
    const updatedUser = await db.orm.public.User.where((i) => i.id.eq(id)).update({ status })
    res.status(StatusCodes.OK).json({
        message: "User Status Updated Successfully",
        data: updatedUser
    })
})