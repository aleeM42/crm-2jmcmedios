// ==============================================
// middleware/validateBody.js — Validación de campos requeridos
// ==============================================

/**
 * Factory que retorna un middleware de validación de body.
 * Verifica que todos los campos listados existan y no estén vacíos en req.body.
 *
 * @param {string[]} requiredFields - Campos obligatorios del body
 * @returns {Function} Express middleware
 *
 * @example
 * router.post('/', validateBody(['nombre', 'razon_social']), ctrl.create);
 */
export default function validateBody(requiredFields) {
  return (req, res, next) => {
    const missing = [];

    for (const field of requiredFields) {
      // Soporta campos anidados: 'cliente.nombre'
      const value = field.split('.').reduce((obj, key) => obj?.[key], req.body);

      if (value === undefined || value === null || value === '') {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Campos obligatorios faltantes',
        campos_faltantes: missing,
      });
    }

    next();
  };
}
