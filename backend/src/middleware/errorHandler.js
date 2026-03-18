// ==============================================
// middleware/errorHandler.js — Manejador global de errores
// ==============================================

/**
 * Middleware global de manejo de errores para Express.
 * Convierte errores de PostgreSQL y errores genéricos a respuestas estándar.
 * Formato: { success: false, error: string }
 *
 * IMPORTANTE: Debe registrarse DESPUÉS de todas las rutas en server.js.
 */
export default function errorHandler(err, req, res, _next) {
  // --- Errores de PostgreSQL ---
  if (err.code) {
    switch (err.code) {
      // Unique violation (RIF duplicado, email duplicado, etc.)
      case '23505': {
        const detail = err.detail || '';
        return res.status(409).json({
          success: false,
          error: 'Ya existe un registro con ese valor',
          detalle: detail,
        });
      }
      // Foreign key violation
      case '23503':
        return res.status(400).json({
          success: false,
          error: 'Referencia inválida: el registro relacionado no existe',
          detalle: err.detail || '',
        });
      // Check constraint violation
      case '23514':
        return res.status(400).json({
          success: false,
          error: 'Valor inválido: no cumple las restricciones de validación',
          detalle: err.detail || err.message,
        });
      // Not null violation
      case '23502':
        return res.status(400).json({
          success: false,
          error: `Campo obligatorio faltante: ${err.column || 'desconocido'}`,
        });
    }
  }

  // --- Errores operacionales con statusCode propio ---
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // --- Errores inesperados ---
  const isProduction = process.env.NODE_ENV === 'production';

  console.error('❌ Error no manejado:', err);

  return res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    ...(isProduction ? {} : { detalle: err.message, stack: err.stack }),
  });
}
