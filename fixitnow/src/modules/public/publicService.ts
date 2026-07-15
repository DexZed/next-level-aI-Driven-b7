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
    res.status(StatusCodes.OK).json({
      message: `From ${req.path} `,
    });
  },
);
export const getTechniciansById = asyncWrapper(
  async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
      message: `From ${req.path} `,
    });
  },
);
export const getCategories = asyncWrapper(
  async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
      message: `From ${req.path} `,
    });
  },
);
