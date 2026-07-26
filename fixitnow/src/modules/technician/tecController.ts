import express from "express";
import verifyRoles from "../../middlewares/roles.js";
import { availability, getBookings, updateBookingStatus, profile } from "./tecServices.js";


const technicianRouter = express.Router();


technicianRouter.put("/profile", verifyRoles("technician"), profile)
technicianRouter.put("/availability", verifyRoles("technician"), availability)
technicianRouter.get("/bookings", verifyRoles("technician"), getBookings)
technicianRouter.patch("/bookings/:id", verifyRoles("technician"), updateBookingStatus)

export default technicianRouter;