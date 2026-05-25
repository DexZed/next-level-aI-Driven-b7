import express, {
  Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config'
import helmet from "helmet";
import morgan from "morgan";
import type { RouteDefinition } from "./Routes.js";
import routes from "./Routes";
import { NotFoundException } from "./errors/HttpException";
import { globalErrorHandler } from "./errors/GlobalError";
import { env } from "./env";


const APP: Application = express();

function initMiddlewares() {
  APP.use(express.json());
  APP.use(express.urlencoded({ extended: true }));
  APP.use(cookieParser());
  APP.use(cors());
  APP.use(helmet());
  APP.use(
    morgan((tokens, req, res) => {
      const status = Number(tokens.status?.(req, res));

      const color =
        status >= 500
          ? chalk.red
          : status >= 400
            ? chalk.yellow
            : status >= 300
              ? chalk.cyan
              : chalk.green;

      return [
        chalk.gray(tokens.method?.(req, res)),
        chalk.blue(tokens.url?.(req, res)),
        color(tokens.status?.(req, res)),
        chalk.magenta(`${tokens["response-time"]?.(req, res)} ms`),
      ].join(" ");
    }),
  );
}

function initRoutes(routes: RouteDefinition[]) {
  routes.forEach(({ path, route, middleware }) => {
    middleware?.length
      ? APP.use(path, ...middleware, route)
      : APP.use(path, route);
  });
}

function initErrorHandler() {
  APP.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundException(`Route ${req.originalUrl} not found`));
  });
  APP.use(globalErrorHandler);
}

function initServer(port: number) {
  APP.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default function init() {
  initMiddlewares();
  initRoutes(routes);
  initErrorHandler();
  initServer(Number(env.PORT) ?? 3000);
}
