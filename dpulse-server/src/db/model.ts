import Pool from "pg";

const pool = new Pool.Pool({
  user: "postgres",
  host: "localhost",
  database: "dpulse",
  password: "password",
  port: 5432,
});

export default pool;