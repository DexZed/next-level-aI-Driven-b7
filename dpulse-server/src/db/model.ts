import Pool from "pg";

class PostgresClient {
  private pool!: Pool.Pool;
  private connectionString = process.env.DATABASE_URL;
  private static instance: PostgresClient;
  private isConnected = false;
  private constructor() {}
  public static getInstance(): PostgresClient {
    if (!PostgresClient.instance) {
      PostgresClient.instance = new PostgresClient();
    }
    return PostgresClient.instance;
  }
  public async connect(): Promise<void> {
    console.log(this.connectionString);
    if (this.isConnected) {
      return;
    }
    this.pool = new Pool.Pool({
      connectionString: this.connectionString,
    });
    try {
      await this.pool.connect();
      this.isConnected = true;
      console.info("Client Connected");
    } catch (err) {
      console.error("Connection Error", err);
    }
  }
  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }
    await this.pool.end();
    this.isConnected = false;
    console.info("Client Disconnected");
  }
  public async status(){
    if (!this.isConnected) {
      return;
    }
    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
    const result = await this.pool.query('SELECT NOW()');
    console.log(result.rows[0]);
  }
}

const dbClient =  PostgresClient.getInstance();
export default dbClient;