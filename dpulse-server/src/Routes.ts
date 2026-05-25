import type { Request, RequestHandler, Response } from "express";

import { Router } from "express";

import authRouter from "./modules/auth/auth.controller";
import issuesRouter from "./modules/issues/issues.controller";

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
  },
];

export default routes;
