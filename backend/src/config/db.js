// ==============================================
// config/db.js — Connection Pool de PostgreSQL (pg)
// ==============================================

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('✅ Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error fatal en PostgreSQL', err);
  process.exit(-1);
});

export default pool;
