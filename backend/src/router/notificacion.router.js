// ==============================================
// router/notificacion.router.js
// ==============================================
import { Router } from 'express';
import { getNotificaciones } from '../controller/notificacion.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);
router.get('/', getNotificaciones);

export default router;
