import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_ROLE,
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
});

export const query = (text, param) => pool.query(text, param);
