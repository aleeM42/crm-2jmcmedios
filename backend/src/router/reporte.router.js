// ==============================================
// reporte.router.js — Router de Reportes
// ==============================================

import { Router } from 'express';
import ReporteController from '../controller/reporte.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

// Middleware de autenticación opcional o requerido según las convenciones del CRM
router.use(authenticate);

// Ruta unificada para todos los reportes analíticos
router.get('/:nombreReporte', ReporteController.getReportData);

export default router;
