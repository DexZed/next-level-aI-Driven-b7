import express from "express";
import { availability, getBookings, updateBookingStatus, profile } from "./tecServices.js";


const technicianRouter = express.Router();


technicianRouter.put("/profile", profile)
technicianRouter.put("/availability", availability)
technicianRouter.get("/bookings", getBookings)
technicianRouter.patch("/bookings/:id", updateBookingStatus)

export default technicianRouter;