// ==============================================
// pauta.router.js — Rutas de Pautas
// ==============================================
import { Router } from 'express';
import * as PautaController from '../controller/pauta.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

// Todas las rutas protegidas por JWT
router.use(authenticate);

// Rutas específicas primero (antes de /:id para evitar conflicto de matching)
router.get('/oc/:numeroOC', PautaController.getByOC);
router.get('/oc/:numeroOC/monto', PautaController.getMontoDisponible);

router.post('/', PautaController.create);
router.get('/', PautaController.getAll);
router.get('/:id', PautaController.getById);
router.put('/:id', PautaController.update);
router.delete('/:id', PautaController.remove);

export default router;
