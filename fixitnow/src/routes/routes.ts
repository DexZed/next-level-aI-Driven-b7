import type { RequestHandler, Router } from "express";
import publicRouter from "../modules/public/publicController.js";
import authRouter from "../modules/auth/authController.js";
import bookingRouter from "../modules/bookings/bookingsController.js";
import technicianRouter from "../modules/technician/tecController.js";
import reviewsRouter from "../modules/reviews/revController.js";
import jwtVerify from "../middlewares/tokenVerify.js";
import verifyRoles from "../middlewares/roles.js";
import adminRouter from "../modules/admin/adminController.js";

type RouteDefinition = {
  path: string;
  controller: Router;
  middleware?: Array<RequestHandler>;
};
const routes: RouteDefinition[] = [
  { path: "/", controller: publicRouter },
  { path: "/api/auth", controller: authRouter },
  { path: "/api/bookings", controller: bookingRouter, middleware: [jwtVerify] },
  { path: "/api/technician", controller: technicianRouter, middleware: [jwtVerify, verifyRoles("technician")] },
  { path: "/api/reviews", controller: reviewsRouter, middleware: [jwtVerify, verifyRoles("customer")] },
  { path: "/api/admin", controller: adminRouter, middleware: [jwtVerify, verifyRoles("admin")] }
];

export default routes;
