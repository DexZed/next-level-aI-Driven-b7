import type { RequestHandler, Request, Response } from "express";
import { Router } from "express";
import authRouter from "./modules/auth/auth.controller";
import issuesRouter from "./modules/issues/issues.controller";
import jwtVerify from "./middlewares/jwt.validation";

export type RouteDefinition = {
  path: string;
  route: Router;
  middleware?: Array<RequestHandler>;
};

const router = Router();

const routes: RouteDefinition[] = [
  {
    path: "/",
    route: router.get("/", (_: Request, res: Response) => {
      res.send("Hello World");
    }),
  },
  {
    path: "/api/auth",
    route: authRouter,
  },
  {
    path: "/api/issues",
    route: issuesRouter,
    middleware: [jwtVerify],
  },
];

export default routes;
