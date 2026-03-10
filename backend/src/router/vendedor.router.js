// ==============================================
// router/vendedor.router.js — Endpoints REST /api/vendedores
// ==============================================

import { Router } from 'express';
import * as VendedorCtrl from '../controller/vendedor.controller.js';

const router = Router();

router.get('/',      VendedorCtrl.getAll);
router.get('/:id',   VendedorCtrl.getById);
router.post('/',     VendedorCtrl.create);
router.put('/:id',   VendedorCtrl.update);
router.delete('/:id', VendedorCtrl.remove);

export default router;
