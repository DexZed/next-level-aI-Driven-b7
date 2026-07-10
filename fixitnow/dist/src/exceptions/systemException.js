export class ExceptionHandler {
    static shuttingDown = false;
    static init() {
        process.on("uncaughtException", async (err) => {
            console.error("Uncaught Exception:", err);
            await ExceptionHandler.shutdown(1);
        });
        if (process.listenerCount("unhandledRejection") === 0) {
            process.on("unhandledRejection", (reason) => {
                console.error("Unhandled Rejection:", reason);
            });
        }
        process.on("SIGINT", async () => {
            console.log("SIGINT received");
            await ExceptionHandler.shutdown(0);
        });
        process.on("SIGTERM", async () => {
            console.log("SIGTERM received");
            await ExceptionHandler.shutdown(0);
        });
    }
    static async shutdown(code) {
        if (ExceptionHandler.shuttingDown)
            return;
        ExceptionHandler.shuttingDown = true;
        console.log("Shutting down gracefully...");
        setTimeout(() => {
            process.exit(code);
        }, 1000);
    }
}
//# sourceMappingURL=systemException.js.map