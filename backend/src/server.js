// ==============================================
// server.js — Entry Point Express CRM 2jmcMedios
// ==============================================

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// ---- Middlewares propios ----
import errorHandler from './middleware/errorHandler.js';

// ---- Importar Routers ----
import authRouter     from './router/auth.router.js';
import clienteRouter  from './router/cliente.router.js';
import contactoRouter from './router/contacto.router.js';
import vendedorRouter from './router/vendedor.router.js';
import visitaRouter   from './router/visita.router.js';
import lugarRouter    from './router/lugar.router.js';
import gastoRouter    from './router/gasto.router.js';
import perfilRouter     from './router/perfil.router.js';
import dashboardRouter  from './router/dashboard.router.js';
import pautaRouter      from './router/pauta.router.js';
import aliadoRouter     from './router/aliado.router.js';
import notificacionRouter from './router/notificacion.router.js';
import coberturaRouter from './router/cobertura.router.js';
import categoriaRouter from './router/categoria.router.js';
import oportunidadRouter from './router/oportunidad.router.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ---- Seguridad HTTP Headers ----
app.use(helmet());

// ---- CORS ----
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));

// ---- Body Parser ----
app.use(express.json({ limit: '1mb' }));

// ---- Rate Limiting Global ----
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 200,                  // 200 requests por ventana
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Demasiadas solicitudes. Intente más tarde.' },
});
app.use(globalLimiter);

// ---- Rate Limiting Estricto para Login ----
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10,                   // 10 intentos de login por ventana
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Demasiados intentos de login. Espere 15 minutos.' },
});

// ---- Rutas API ----
app.use('/api/auth',       loginLimiter, authRouter);
app.use('/api/clientes',   clienteRouter);
app.use('/api/contactos',  contactoRouter);
app.use('/api/vendedores', vendedorRouter);
app.use('/api/visitas',    visitaRouter);
app.use('/api/lugares',    lugarRouter);
app.use('/api/gastos',     gastoRouter);
app.use('/api/perfil',     perfilRouter);
app.use('/api/dashboard',  dashboardRouter);
app.use('/api/pautas',     pautaRouter);
app.use('/api/aliados',    aliadoRouter);
app.use('/api/notificaciones', notificacionRouter);
app.use('/api/coberturas', coberturaRouter);
app.use('/api/categorias', categoriaRouter);
app.use('/api/oportunidades', oportunidadRouter);

// ---- Health Check ----
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ---- Manejador Global de Errores (SIEMPRE al final) ----
app.use(errorHandler);

// ---- Start Server ----
import pool from './config/db.js';

const startServer = async () => {
  try {
    console.log('[DEBUG] ⏳ Intentando conectar a la base de datos PostgreSQL...');
    await pool.query('SELECT 1');
    console.log('[DEBUG] ✅ Conexión a PostgreSQL confirmada.');

    app.listen(PORT, () => {
      console.log(`🚀 CRM 2jmcMedios API corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('\n======================================================');
    console.error('❌ [FATAL ERROR] Fallo al iniciar el servidor o conectar a BD:');
    console.error('Mensaje de error:', err.message);
    console.error('Stack trace:', err.stack);
    console.error('======================================================\n');
    process.exit(1);
  }
};

startServer();
