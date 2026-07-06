import type { RequestHandler, Router } from "express";

type RouteDefinition = {
  path: string;
  controller: Router;
  middleware?: Array<RequestHandler>;
};

const routes: RouteDefinition[] = []

export default routes;