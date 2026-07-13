import App from "./app.js";
import { env } from "./env";
import { ExceptionHandler } from "./exceptions/systemException.js";
import { db } from "./prisma/db.js";

async function bootstrap() {
  try {
    ExceptionHandler.init();
    await db.connect({ url: env.DATABASE_URL! });
    const server = new App(env.PORT);
    server.initServer();
  } catch (error) {
    console.error("Bootstrap Error", error);
    process.exit(1);
  }
}

bootstrap();
