import type { RequestHandler, Router } from "express";
import publicRouter from "../modules/public/publicController.js";
import authRouter from "../modules/auth/authController.js";
import bookingRouter from "../modules/bookings/bookingsController.js";
import technicianRouter from "../modules/technician/tecController.js";

type RouteDefinition = {
  path: string;
  controller: Router;
  middleware?: Array<RequestHandler>;
};
const routes: RouteDefinition[] = [
  { path: "/", controller: publicRouter },
  { path: "/api/auth", controller: authRouter },
  { path: "/api/bookings", controller: bookingRouter },
  { path: "/api/technician", controller: technicianRouter }
];

export default routes;
