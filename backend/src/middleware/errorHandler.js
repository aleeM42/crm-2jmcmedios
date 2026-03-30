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

// Mapa de constraints conocidos → mensaje amigable
const CONSTRAINT_MESSAGES = {
  // Clientes
  clientes_rif_fiscal_key:        'El RIF fiscal ya está registrado. Verifique el número ingresado.',
  clientes_razon_social_key:      'Ya existe un cliente con esa razón social.',
  // Aliados Comerciales
  aliados_comerciales_rif_key:    'El RIF fiscal de la emisora ya está registrado.',
  aliados_comerciales_razon_social_key: 'Ya existe una emisora con esa razón social.',
  // Usuarios / Vendedores
  usuarios_correo_key:            'El correo electrónico ya está registrado en el sistema.',
  usuarios_nombre_usuario_key:    'El nombre de usuario ya está en uso. Elija uno diferente.',
  usuarios_email_key:             'El correo electrónico ya está registrado en el sistema.',
  // Teléfonos
  telefonos_pkey:                 'Ya existe un teléfono con ese código de área y número.',
};

/**
 * Extrae un mensaje amigable de un error de violación UNIQUE (23505).
 * Busca en el constraint y en el detalle del error.
 */
function resolveUniqueViolation(err) {
  const constraint = (err.constraint || '').toLowerCase();
  const detail    = (err.detail     || '').toLowerCase();

  // 1. Buscar por nombre de constraint exacto
  for (const [key, msg] of Object.entries(CONSTRAINT_MESSAGES)) {
    if (constraint.includes(key.toLowerCase())) return msg;
  }

  // 2. Buscar por palabras clave en el detalle
  if (detail.includes('rif'))              return 'El RIF fiscal ya está registrado en el sistema.';
  if (detail.includes('correo') || detail.includes('email')) return 'El correo electrónico ya está registrado.';
  if (detail.includes('nombre_usuario'))   return 'El nombre de usuario ya está en uso. Elija uno diferente.';
  if (detail.includes('razon_social'))     return 'Ya existe un registro con esa razón social.';
  if (detail.includes('nombre_emisora'))   return 'Ya existe una emisora con ese nombre.';

  // 3. Fallback genérico
  return 'Ya existe un registro con ese valor. Verifique los campos únicos (RIF, correo, usuario).';
}

export default function errorHandler(err, req, res, _next) {
  // --- Errores de validación de negocio (lanzados con statusCode propio) ---
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // --- Errores de PostgreSQL ---
  if (err.code) {
    switch (err.code) {
      // Unique violation — mensaje específico por campo
      case '23505':
        return res.status(409).json({
          success: false,
          error: resolveUniqueViolation(err),
          detalle: err.detail || '',
          constraint: err.constraint || '',
        });

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
          constraint: err.constraint || '',
        });

      // Not null violation
      case '23502':
        return res.status(400).json({
          success: false,
          error: `Campo obligatorio faltante: ${err.column || 'desconocido'}`,
        });

      // Value too long
      case '22001':
        return res.status(400).json({
          success: false,
          error: 'Un campo excede la longitud máxima permitida',
          detalle: err.message,
        });
    }
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
