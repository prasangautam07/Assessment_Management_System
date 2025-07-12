import { Pool } from "pg";

let pool = null;

export const connectToDatabase = async () => {
  try {
    if (!pool) {
      pool = new Pool({
        /* user: "postgres",
        host: "localhost",
        database: "DBMS_PROJECT",
        password: "prasan123",
        port: 5432 */
       // connectionString: 'postgresql://postgres:HcgHOpsEFwwdNBoNpsKCEhhbcEckgpAK@crossover.proxy.rlwy.net:48399/railway',
       connectionString:'postgresql://neondb_owner:npg_MGYqCc9Z4NVX@ep-twilight-sound-a7o6sshl-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
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



