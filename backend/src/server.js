// ==============================================
// server.js — Entry Point Express CRM 2jmcMedios
// ==============================================

import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// ---- Importar Routers ----
import clienteRouter  from './router/cliente.router.js';
import contactoRouter from './router/contacto.router.js';
import vendedorRouter from './router/vendedor.router.js';
import visitaRouter   from './router/visita.router.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ---- Middlewares ----
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));
app.use(express.json());

// ---- Rutas API ----
app.use('/api/clientes',   clienteRouter);
app.use('/api/contactos',  contactoRouter);
app.use('/api/vendedores', vendedorRouter);
app.use('/api/visitas',    visitaRouter);

// ---- Health Check ----
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ---- Start Server ----
app.listen(PORT, () => {
  console.log(`🚀 CRM 2jmcMedios API corriendo en http://localhost:${PORT}`);
});
