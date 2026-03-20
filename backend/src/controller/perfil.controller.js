// ==============================================
// controller/perfil.controller.js — Datos del perfil del usuario logueado
// ==============================================

import * as AuthModel from '../model/auth.model.js';
import * as VendedorModel from '../model/vendedor.model.js';

/**
 * GET /api/perfil
 * Retorna datos completos del usuario autenticado.
 * Si es Vendedor/Director, incluye meta, clientes asignados, etc.
 */
export const getPerfil = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const rol = req.user.rol;

    // Si es vendedor o director, traer perfil completo con datos de vendedor
    if (rol === 'Vendedor' || rol === 'Director') {
      const perfil = await VendedorModel.findById(userId);
      if (!perfil) {
        return res.status(404).json({ success: false, error: 'Perfil no encontrado' });
      }
      return res.json({ success: true, data: perfil });
    }

    // Para otros roles, datos básicos de usuario
    const user = await AuthModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    }
    return res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
