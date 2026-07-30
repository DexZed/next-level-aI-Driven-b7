import express from "express";
import verifyRoles from "../../middlewares/roles";
import {
    allBookings,
    allCategories,
    allUsers,
    createServiceCategory,
    updateUserStatus,
} from "./adminServices.js";

const adminRouter = express.Router();

adminRouter.get("/users", allUsers);
adminRouter.patch("/users/:id", updateUserStatus);
adminRouter.get("/bookings", allBookings);
adminRouter.get("/categories", allCategories);
adminRouter.post("/categories", createServiceCategory);

export default adminRouter;