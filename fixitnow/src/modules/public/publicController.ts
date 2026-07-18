import express from "express";
import { healthCheck, getServices, getTechnicians, getTechnicianById, getCategories } from "./publicService.js";

const publicRouter = express.Router();

publicRouter.get("/", healthCheck);

publicRouter.get("/api/services", getServices);

publicRouter.get("/api/technicians", getTechnicians);

publicRouter.get("/api/technicians/:id", getTechnicianById);

publicRouter.get("/api/categories", getCategories);

export default publicRouter;