import App from "./app";
import { env } from "./env";
import { ExceptionHandler } from "./exceptions/systemException";
import { db } from "./prisma/db";
async function bootstrap() {
    try {
        ExceptionHandler.init();
        await db.connect({ url: env.DATABASE_URL });
        const server = new App(env.PORT);
        server.initServer();
    }
    catch (error) {
        console.error("Bootstrap Error", error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=index.js.map