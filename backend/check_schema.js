import pool from './src/config/db.js';
async function main() {
  try {
    const res = await pool.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'historico_negociaciones'
      ORDER BY ordinal_position;
    `);
    console.log("Columns:", JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    pool.end();
  }
}
main();
