import express from "express";
import { createBooking, getBookingsByUser, getBookingById } from "./bookingServices";

const bookingRouter = express.Router()

bookingRouter.post("/", createBooking);
bookingRouter.get("/", getBookingsByUser);
bookingRouter.get("/:id", getBookingById);

export default bookingRouter