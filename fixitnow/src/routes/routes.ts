import type { RequestHandler, Router } from "express";
import publicRouter from "../modules/public/publicController.js";
import authRouter from "../modules/auth/authController.js";
import bookingRouter from "../modules/bookings/bookingsController.js";
import technicianRouter from "../modules/technician/tecController.js";
import reviewsRouter from "../modules/reviews/revController.js";
import jwtVerify from "../middlewares/tokenVerify.js";
import verifyRoles from "../middlewares/roles.js";
import adminRouter from "../modules/admin/adminController.js";
import userStatus from "../middlewares/userStatus.js";

type RouteDefinition = {
  path: string;
  controller: Router;
  middleware?: Array<RequestHandler>;
};
const routes: RouteDefinition[] = [
  { path: "/", controller: publicRouter },
  { path: "/api/auth", controller: authRouter },
  { path: "/api/bookings", controller: bookingRouter, middleware: [jwtVerify, userStatus] },
  { path: "/api/technician", controller: technicianRouter, middleware: [jwtVerify, userStatus, verifyRoles("technician")] },
  { path: "/api/reviews", controller: reviewsRouter, middleware: [jwtVerify, userStatus, verifyRoles("customer")] },
  { path: "/api/admin", controller: adminRouter }
];

export default routes;
