import { Pool } from "pg";

let pool = null;

export const connectToDatabase = async () => {
  try {
    if (!pool) {
      pool = new Pool({
       connectionString:process.env.CONNECTION_STRING,
        ssl: {
          rejectUnauthorized: false, 
        },
      });
    }

    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL");
    client.release();

    return pool;
  } catch (err) {
    console.error("❌ PostgreSQL Connection Error:", err);
    throw err;
  }
};



