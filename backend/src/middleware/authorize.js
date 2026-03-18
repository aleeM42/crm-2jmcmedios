// ==============================================
// middleware/authorize.js — Control de Acceso por Roles (RBAC)
// ==============================================

/**
 * Factory que retorna un middleware de autorización.
 * Verifica que el rol del usuario autenticado esté en la lista permitida.
 *
 * @param  {...string} rolesPermitidos - Roles autorizados para el endpoint
 * @returns {Function} Express middleware
 *
 * @example
 * router.get('/', authenticate, authorize('Administrador', 'Director'), ctrl.getAll);
 */
export default function authorize(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Autenticación requerida',
      });
    }

    if (!rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({
        success: false,
        error: `Acceso denegado. Roles permitidos: ${rolesPermitidos.join(', ')}`,
      });
    }

    next();
  };
}
