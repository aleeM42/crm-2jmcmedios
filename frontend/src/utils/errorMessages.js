// ==============================================
// utils/errorMessages.js — Diccionario centralizado de errores amigables
// Mapea códigos HTTP, palabras clave del backend y mensajes técnicos
// a texto comprensible para el usuario final.
// ==============================================

/**
 * Diccionario organizado por módulo.
 * Cada módulo contiene:
 *   - byStatus: mapeo por código HTTP → mensaje amigable
 *   - byKeyword: fragmentos de texto del backend → mensaje amigable
 *   - fallback: mensaje genérico si nada coincide
 */
const ERROR_DICTIONARY = {

  // ─── Auth / Usuarios ───────────────────────────────────
  auth: {
    byStatus: {
      400: 'Debe proporcionar usuario/correo y contraseña para iniciar sesión.',
      401: 'Credenciales inválidas. Verifique su usuario y contraseña.',
      403: 'Su cuenta está suspendida. Contacte al administrador.',
      423: 'Cuenta bloqueada por múltiples intentos fallidos. Intente más tarde o contacte al administrador.',
      404: 'No se encontró una cuenta con esos datos.',
      429: 'Demasiados intentos. Espere unos minutos antes de volver a intentar.',
    },
    byKeyword: [
      ['bloqueada',          'Su cuenta ha sido bloqueada temporalmente por seguridad. Contacte al administrador.'],
      ['suspendido',         'Su cuenta se encuentra suspendida. Comuníquese con el administrador del sistema.'],
      ['contraseña',         'Contraseña incorrecta. Verifique e intente nuevamente.'],
      ['no encontrado',      'No se encontró un usuario con los datos proporcionados.'],
      ['usuario y contraseña', 'Debe proporcionar usuario y contraseña para continuar.'],
      ['intentos',           'Ha excedido el número máximo de intentos. Su cuenta fue bloqueada temporalmente.'],
      ['token',              'Su sesión ha expirado. Inicie sesión nuevamente.'],
    ],
    fallback: 'Error de autenticación. Verifique sus credenciales e intente nuevamente.',
  },

  // ─── Clientes ──────────────────────────────────────────
  clientes: {
    byStatus: {
      400: 'Datos inválidos. Revise el formulario antes de continuar.',
      404: 'El cliente solicitado no fue encontrado en el sistema.',
      409: 'Ya existe un cliente con ese RIF fiscal o razón social registrado.',
      500: 'Error interno al procesar la solicitud del cliente. Intente nuevamente.',
    },
    byKeyword: [
      ['rif fiscal ya está registrado',  'El RIF fiscal ingresado ya se encuentra registrado en el sistema.'],
      ['rif',                'El RIF fiscal está duplicado o tiene formato incorrecto (debe ser J/G/V/P + 9 dígitos).'],
      ['razón social',       'Ya existe un cliente con esa razón social.'],
      ['razon_social',       'La razón social es un campo obligatorio y no puede estar vacía.'],
      ['correo',             'El correo electrónico ya está registrado o tiene un formato incorrecto.'],
      ['nombre_usuario',     'El nombre de usuario ya está en uso.'],
      ['fk_vendedor',        'Debe seleccionar un vendedor asignado para este cliente.'],
      ['fk_lugar',           'Debe seleccionar la ubicación (estado) del cliente.'],
      ['violates not-null',  'Uno o más campos obligatorios están vacíos. Revise el formulario.'],
      ['sub-empresa',        'Error al crear la sub-empresa. Verifique que todos los datos estén completos.'],
      ['duplicate',          'Ya existe un registro con esos datos. Verifique el RIF o la razón social.'],
      ['unique',             'Ya existe un cliente con ese dato único (RIF o razón social).'],
      ['teléfono',           'El teléfono tiene un formato incorrecto. Debe incluir código de área y 7 dígitos.'],
    ],
    fallback: 'Error al procesar la solicitud del cliente. Revise los datos e intente nuevamente.',
  },

  // ─── Aliados Comerciales (Emisoras) ────────────────────
  aliados: {
    byStatus: {
      400: 'Datos inválidos. Revise el formulario antes de continuar.',
      404: 'No se encontró el aliado comercial solicitado.',
      409: 'Ya existe un aliado comercial con ese RIF o razón social.',
      500: 'Error interno al registrar el aliado comercial.',
    },
    byKeyword: [
      ['rif fiscal de la emisora ya está registrado', 'El RIF de la emisora ya está registrado en el sistema.'],
      ['rif',               'El RIF ingresado ya está registrado o tiene un formato inválido (debe comenzar con J, G, V o P seguido de 9 dígitos).'],
      ['razón social',      'Ya existe una emisora con esa razón social.'],
      ['razon_social',      'La razón social del aliado es obligatoria.'],
      ['nombre_emisora',    'El nombre de la emisora es un campo obligatorio o ya existe.'],
      ['fk_categoria',      'Debe seleccionar una categoría para el aliado comercial.'],
      ['frecuencia',        'La frecuencia debe terminar en FM o AM (ej: 107.3 FM).'],
      ['correo',            'El correo electrónico del contacto tiene un formato inválido.'],
      ['telefono',          'El teléfono tiene un formato incorrecto. Debe incluir código de área y exactamente 7 dígitos.'],
      ['contacto',          'Los datos del contacto están incompletos. Verifique nombre y apellido.'],
      ['duplicate',         'Ya existe un aliado con esos datos. Verifique el RIF o la razón social.'],
      ['unique',            'Dato duplicado. Ya existe un aliado comercial con esa información.'],
    ],
    fallback: 'Error al procesar la solicitud del aliado comercial. Revise los datos e intente nuevamente.',
  },

  // ─── Pautas ────────────────────────────────────────────
  pautas: {
    byStatus: {
      400: 'Datos inválidos. Revise el formulario antes de continuar.',
      404: 'No se encontró la pauta solicitada.',
      409: 'Ya existe una pauta con datos similares para ese período.',
      500: 'Error interno al registrar la pauta. Intente nuevamente.',
    },
    byKeyword: [
      ['monto ot debe ser mayor',     'El monto OT debe ser mayor al monto OC.'],
      ['monto oc',                    'El monto OC debe ser un valor positivo mayor a cero.'],
      ['monto ot',                    'El monto OT debe ser un valor positivo mayor a cero.'],
      ['fecha de inicio de la cuña',  'La fecha de inicio de la cuña debe ser igual o posterior a la fecha de emisión.'],
      ['fecha',                       'Las fechas de la pauta son inválidas. Verifique que la fecha de inicio sea anterior a la de fin.'],
      ['costo',                       'El costo por cuña debe ser un valor positivo.'],
      ['disponibilidad',              'No hay disponibilidad en las emisoras seleccionadas para ese período.'],
      ['monto',                       'El monto es obligatorio y debe ser un número válido y positivo.'],
      ['fk_cliente',                  'Debe seleccionar un cliente asociado a esta pauta.'],
      ['fk_vendedor',                 'Debe seleccionar el vendedor responsable de esta pauta.'],
      ['fk_marca',                    'Debe seleccionar la marca asociada a esta pauta.'],
      ['emisora',                     'Debe seleccionar al menos una emisora para la pauta.'],
      ['coordinadora',                'Debe seleccionar una coordinadora para esta pauta.'],
      ['cuña',                        'Los datos de la cuña están incompletos. Verifique duración y mensaje.'],
    ],
    fallback: 'Error al procesar la pauta. Revise todos los campos e intente nuevamente.',
  },

  // ─── Vendedores ────────────────────────────────────────
  vendedores: {
    byStatus: {
      400: 'Datos inválidos. Revise el formulario antes de continuar.',
      403: 'No tiene permisos para registrar vendedores.',
      404: 'El vendedor solicitado no fue encontrado.',
      409: 'Ya existe un vendedor con ese correo o nombre de usuario.',
      500: 'Error interno al registrar el vendedor.',
    },
    byKeyword: [
      ['nombre de usuario ya está en uso',  'El nombre de usuario ya está en uso. Elija uno diferente.'],
      ['correo electrónico ya está registrado', 'El correo electrónico ya está registrado. Use uno diferente.'],
      ['nombre_usuario',    'El nombre de usuario ya se encuentra registrado en el sistema.'],
      ['correo',            'El correo electrónico ya está registrado o tiene un formato inválido.'],
      ['meta anual',        'La meta anual no puede ser un número negativo.'],
      ['meta',              'La meta de ventas debe ser un valor numérico positivo válido.'],
      ['teléfono',          'El teléfono tiene un formato incorrecto. Debe incluir código de área y exactamente 7 dígitos.'],
      ['duplicate',         'Ya existe un vendedor con los mismos datos de acceso.'],
      ['unique',            'Dato duplicado: el correo o nombre de usuario ya existe.'],
      ['password',          'La contraseña es obligatoria y debe cumplir los requisitos de seguridad.'],
    ],
    fallback: 'Error al procesar la solicitud del vendedor. Revise los datos e intente nuevamente.',
  },

  // ─── Actividad Comercial / Gastos ──────────────────────
  actividad: {
    byStatus: {
      400: 'Datos inválidos. Revise el formulario antes de enviar.',
      404: 'No se encontró el registro solicitado.',
      500: 'Error interno al guardar la actividad comercial.',
    },
    byKeyword: [
      ['monto del gasto debe ser',  'El monto del gasto debe ser un número positivo mayor a cero.'],
      ['monto',             'El monto ingresado no es válido. Debe ser un número positivo mayor a cero.'],
      ['fecha',             'La fecha es obligatoria y debe tener un formato válido.'],
      ['fk_contacto',       'Debe seleccionar el contacto asociado a esta visita.'],
      ['fk_vendedor',       'Debe seleccionar el vendedor responsable.'],
      ['concepto',          'El concepto del gasto es un campo obligatorio.'],
      ['visita no encontrada', 'La visita asociada no fue encontrada en el sistema.'],
      ['permiso',           'No tiene permisos para realizar esta operación.'],
    ],
    fallback: 'Error al registrar la actividad comercial. Revise los datos e intente nuevamente.',
  },

  // ─── Gastos (módulo separado de marketing) ─────────────
  gastos: {
    byStatus: {
      400: 'Datos inválidos. Revise el formulario antes de enviar.',
      404: 'No se encontró el gasto solicitado.',
      500: 'Error interno al guardar el gasto.',
    },
    byKeyword: [
      ['monto del gasto debe ser',  'El monto del gasto debe ser un número positivo mayor a cero.'],
      ['monto',             'El monto ingresado debe ser un valor positivo mayor a cero.'],
      ['concepto',          'El concepto del gasto es obligatorio.'],
      ['fecha',             'La fecha del gasto es obligatoria.'],
    ],
    fallback: 'Error al registrar el gasto. Revise los datos e intente nuevamente.',
  },

  // ─── General (fallback global) ─────────────────────────
  general: {
    byStatus: {
      400: 'La solicitud contiene datos inválidos. Revise el formulario.',
      401: 'Su sesión ha expirado. Inicie sesión nuevamente.',
      403: 'No tiene permisos para realizar esta acción.',
      404: 'El recurso solicitado no fue encontrado.',
      409: 'Conflicto: ya existe un registro con datos similares.',
      422: 'Los datos enviados no son válidos. Revise los campos del formulario.',
      429: 'Demasiadas solicitudes. Espere un momento antes de intentar nuevamente.',
      500: 'Error interno del servidor. Intente nuevamente en unos minutos.',
      502: 'El servidor no está disponible temporalmente. Intente más tarde.',
      503: 'Servicio no disponible. Intente más tarde.',
    },
    byKeyword: [
      ['network',           'Error de conexión. Verifique su conexión a internet e intente nuevamente.'],
      ['fetch',             'No se pudo conectar con el servidor. Verifique que el servicio esté activo.'],
      ['timeout',           'La solicitud tardó demasiado en responder. Intente nuevamente.'],
      ['Failed to fetch',   'No se pudo conectar con el servidor. Verifique su conexión a internet.'],
      ['ECONNREFUSED',      'El servidor no está disponible. Contacte al administrador del sistema.'],
      ['JSON',              'Error al procesar la respuesta del servidor. Intente nuevamente.'],
    ],
    fallback: 'Ocurrió un error inesperado. Si el problema persiste, contacte al administrador.',
  },
};


/**
 * Resuelve un mensaje amigable a partir del error capturado.
 *
 * @param {Error|Object} error  — El error del catch (tiene .status, .data, .message)
 * @param {string}       module — Clave del módulo: 'auth', 'clientes', 'aliados', etc.
 * @returns {string}             Mensaje amigable para mostrar al usuario.
 *
 * Prioridad de resolución:
 *   1. byStatus del módulo específico
 *   2. byKeyword del módulo específico (busca coincidencia en el mensaje del error)
 *   3. byStatus del módulo "general"
 *   4. byKeyword del módulo "general"
 *   5. Fallback del módulo específico
 *   6. Fallback general
 */
export function resolveErrorMessage(error, module = 'general') {
  const status = error?.status || error?.response?.status || null;
  const rawMsg = (
    error?.data?.error
    || error?.data?.detail
    || error?.response?.data?.error
    || error?.response?.data?.detail
    || error?.message
    || ''
  ).toLowerCase();

  const moduleDef = ERROR_DICTIONARY[module];
  const generalDef = ERROR_DICTIONARY.general;

  // 1. Status match en módulo específico
  if (moduleDef?.byStatus?.[status]) return moduleDef.byStatus[status];

  // 2. Keyword match en módulo específico
  if (moduleDef?.byKeyword) {
    for (const [keyword, msg] of moduleDef.byKeyword) {
      if (rawMsg.includes(keyword.toLowerCase())) return msg;
    }
  }

  // 3. Status match general
  if (generalDef.byStatus[status]) return generalDef.byStatus[status];

  // 4. Keyword match general
  for (const [keyword, msg] of generalDef.byKeyword) {
    if (rawMsg.includes(keyword.toLowerCase())) return msg;
  }

  // 5. Fallback del módulo → 6. Fallback general
  return moduleDef?.fallback || generalDef.fallback;
}

export default ERROR_DICTIONARY;
