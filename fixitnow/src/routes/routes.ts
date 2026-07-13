import type { RequestHandler, Router } from "express";
import publicRouter from "../modules/public/publicController.js";
import authRouter from "../modules/auth/authController.js";

type RouteDefinition = {
  path: string;
  controller: Router;
  middleware?: Array<RequestHandler>;
};
const routes: RouteDefinition[] = [
  { path: "/", controller: publicRouter },
  { path: "/api/auth", controller: authRouter },
];

export default routes;
