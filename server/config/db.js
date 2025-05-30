import pg from "pg";


const pool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_DB_PORT,
  database: process.env.POSTGRES_DB,
  connectionTimeoutMillis: 5000
});

export default pool;

