import pool from "../db/model";

export class ExceptionHandler {
  private static shuttingDown = false;
  public static init(): void {
    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err);
      ExceptionHandler.shutdown(1);
    });

    process.on("unhandledRejection", (reason) => {
      console.error("Unhandled Rejection:", reason);
      ExceptionHandler.shutdown(1);
    });

    process.on("SIGINT", () => {
      console.log("SIGINT received");
      ExceptionHandler.shutdown(0);
    });

    process.on("SIGTERM", () => {
      console.log("SIGTERM received");
      ExceptionHandler.shutdown(0);
    });
  }
  private static shutdown(code: number): void {
    if (ExceptionHandler.shuttingDown) return;
    ExceptionHandler.shuttingDown = true;

    console.log("Shutting down gracefully...");

    pool.end();
  }
}
