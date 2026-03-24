import pool from './src/config/db.js';

async function main() {
  try {
    console.log("Truncating HISTORICO_NEGOCIACIONES...");
    await pool.query('TRUNCATE TABLE HISTORICO_NEGOCIACIONES CASCADE;');

    console.log("Dropping fk_pauta column...");
    await pool.query('ALTER TABLE HISTORICO_NEGOCIACIONES DROP COLUMN IF EXISTS fk_pauta CASCADE;');

    console.log("Adding fk_cliente column...");
    await pool.query('ALTER TABLE HISTORICO_NEGOCIACIONES ADD COLUMN fk_cliente INTEGER NOT NULL DEFAULT 0;');
    
    console.log("Removing default...");
    await pool.query('ALTER TABLE HISTORICO_NEGOCIACIONES ALTER COLUMN fk_cliente DROP DEFAULT;');

    console.log("Adding FK constraint...");
    await pool.query('ALTER TABLE HISTORICO_NEGOCIACIONES ADD CONSTRAINT fk_cliente_historico FOREIGN KEY (fk_cliente) REFERENCES CLIENTE(id) ON DELETE CASCADE;');

    console.log("Done! HISTORICO_NEGOCIACIONES now has fk_cliente matching init.sql");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    pool.end();
  }
}

main();
