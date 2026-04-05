// ==============================================
// router/auth.router.js — Endpoints de autenticación
// ==============================================

import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as AuthCtrl from '../controller/auth.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,                  // 100 intentos de login por ventana (para prevenir bloqueos por NAT/desarrollo)
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Demasiados intentos de login. Espere 15 minutos.' },
});

// POST /api/auth/login  — público
router.post('/login', loginLimiter, AuthCtrl.login);

// GET  /api/auth/me     — protegido (requiere JWT)
router.get('/me', authenticate, AuthCtrl.me);

export default router;
