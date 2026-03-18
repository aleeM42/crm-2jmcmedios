// ==============================================
// middleware/authenticate.js — Verificación JWT
// ==============================================

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'crm-2jmc-dev-secret-change-in-prod';

/**
 * Middleware que verifica el token JWT del header Authorization.
 * Inyecta req.user = { id, rol, correo, nombre_usuario } si válido.
 * Retorna 401 si no hay token o es inválido/expirado.
 */
export default function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Token de autenticación requerido',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    const message =
      err.name === 'TokenExpiredError'
        ? 'Token expirado, inicie sesión nuevamente'
        : 'Token inválido';

    return res.status(401).json({ success: false, error: message });
  }
}
