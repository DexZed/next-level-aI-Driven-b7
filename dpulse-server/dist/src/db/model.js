"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const env_1 = require("../env");
class PostgresClient {
    pool;
    connectionString = env_1.env.DATABASE_URL;
    static instance;
    isConnected = false;
    constructor() { }
    static getInstance() {
        if (!PostgresClient.instance) {
            PostgresClient.instance = new PostgresClient();
        }
        return PostgresClient.instance;
    }
    async connect() {
        if (this.isConnected) {
            return;
        }
        this.pool = new pg_1.default.Pool({
            connectionString: this.connectionString,
            ssl: true,
        });
        try {
            await this.pool.connect();
            this.isConnected = true;
            console.info("Client Connected");
        }
        catch (err) {
            console.error("Connection Error", err);
        }
    }
    async disconnect() {
        if (!this.isConnected) {
            return;
        }
        await this.pool.end();
        this.isConnected = false;
        console.info("Client Disconnected");
    }
    async status() {
        if (!this.isConnected) {
            return;
        }
        this.pool.on("error", (err) => {
            console.error("Unexpected error on idle client", err);
            process.exit(-1);
        });
        const result = await this.pool.query("SELECT NOW()");
        console.log(result.rows[0]);
    }
    async dbQuery() {
        if (!this.isConnected) {
            await this.connect();
        }
        return this.pool;
    }
}
const dbClient = PostgresClient.getInstance();
exports.default = dbClient;
//# sourceMappingURL=model.js.map