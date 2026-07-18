import { asyncWrapper } from "../../lib/asyncWrapper.js";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../../prisma/db.js";

export const healthCheck = asyncWrapper(async (_: Request, res: Response) => {

  res.status(StatusCodes.OK).json({
    message: "Working",
  });
});
export const getServices = asyncWrapper(async (req: Request, res: Response) => {
  const name = req.query.name;


  const services = name ? await db.orm.public.Service.select("name", "description").where(p => p.name.ilike(`%${name}%`)).all() :
    await db.orm.public.Service.select("name", "description").all();
  if (services.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `No such services found for ${name}`,
    })
  }
  return res.status(StatusCodes.OK).json({
    message: "Success",
    data: services
  });
});
export const getTechnicians = asyncWrapper(
  async (req: Request, res: Response) => {
    const { ratingAvg, city, is_available } = req.query;
    const plan = db.sql.public.technicians.as("t").innerJoin(db.sql.public.users.as("u"), (f, fns) => fns.eq(f.u.id, f.t.user_id)).select((f) => ({
      name: f.u.name,
      email: f.u.email,
      bio: f.t.bio,
      ratingAvg: f.t.ratingAvg,
      city: f.t.city,
      is_available: f.t.is_available,
    })).where((f, fns) => fns.and(fns.gte(f.t.ratingAvg, Number(ratingAvg ?? 0)), fns.ilike(f.t.city, city ? `%${city}%` : `%`), fns.eq(f.t.is_available, is_available ?? true))).build();

    const result = await db.runtime().execute(plan);


    return res.status(StatusCodes.OK).json({
      message: "Success",
      data: result
    });
  },
);
export const getTechnicianById = asyncWrapper(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid or malformed id request",
      })
    }
    const plan = db.sql.public.technicians.as("t").innerJoin(db.sql.public.users.as("u"), (f, fns) => fns.eq(f.u.id, f.t.user_id)).select((f) => ({
      name: f.u.name,
      email: f.u.email,
      bio: f.t.bio,
      ratingAvg: f.t.ratingAvg,
      city: f.t.city,
      is_available: f.t.is_available,
    })).where((f, fns) => fns.eq(f.t.user_id, id as string)).build();
    const result = await db.runtime().execute(plan);
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `No technician found for id ${id}`,
      })
    }
    return res.status(StatusCodes.OK).json({
      message: "Success",
      data: result
    });
  },
);
export const getCategories = asyncWrapper(
  async (req: Request, res: Response) => {
    const categories = await db.orm.public.Category.select("name", "description").all();
    if (categories.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No categories found",
      })
    }
    return res.status(StatusCodes.OK).json({
      message: "Success",
      data: categories
    });
  },
);
