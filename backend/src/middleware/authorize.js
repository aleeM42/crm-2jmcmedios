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
 * router.get('/', authenticate, authorize('Administrador', 'Director General'), ctrl.getAll);
 */
export default function authorize(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Autenticación requerida',
      });
    }

    const { rol } = req.user;

    // 1. Director General: Acceso total (Lectura, Escritura, Borrado y Auditoría)
    if (rol === 'Director General') {
      return next();
    }

    // 2. Invitado: Ingreso de Solo Consulta (Lectura global)
    if (rol === 'Invitado' && req.method === 'GET') {
      return next();
    }

    // 3. Vendedor: Lectura del resto. Sus permisos de gestión (POST/PUT/DELETE)
    // se validan en rolesPermitidos y dentro de los controladores.
    if (rol === 'Vendedor' && req.method === 'GET') {
      return next();
    }

    // 4. Validar si el rol actual está explícitamente en la lista de permitidos (ej. Administrador, Pauta)
    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({
        success: false,
        error: 'No tiene autorización',
      });
    }

    next();
  };
}
