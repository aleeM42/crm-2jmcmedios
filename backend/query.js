import 'dotenv/config';
import pool from './src/config/db.js';

async function alterDb() {
  try {
    const res = await pool.query("ALTER TABLE ALIADOS_COMERCIALES DROP CONSTRAINT IF EXISTS check_ac_categoria");
    const res2 = await pool.query("ALTER TABLE ALIADOS_COMERCIALES ALTER COLUMN categoria TYPE VARCHAR(255)");
    console.log("DB altered successfully", res, res2);
  } catch (err) {
    console.log("Error altering DB:", err.message);
  }
  process.exit();
}
alterDb();
