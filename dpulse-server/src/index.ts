
import init from "./app";
import dbClient from "./db/model";
import { ExceptionHandler } from "./errors/ExceptionHandler";

ExceptionHandler.init();

async function bootstrap() {
  try {
    await dbClient.connect();
    dbClient.status();
    init();
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

bootstrap();
