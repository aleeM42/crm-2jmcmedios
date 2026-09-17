// ==============================================
// pauta.controller.js — Controlador de Pautas
// ==============================================
import * as PautaModel from '../model/pauta.model.js';

export async function getAll(req, res, next) {
  try {
    const pautas = await PautaModel.getAllPautas();
    res.json({ success: true, data: pautas });
  } catch (error) {
    next(error);
  }
}

export async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const pauta = await PautaModel.getPautaById(id);
    if (!pauta) {
      return res.status(404).json({ success: false, error: 'Pauta no encontrada' });
    }
    res.json({ success: true, data: pauta });
  } catch (error) {
    next(error);
  }
}

export async function create(req, res, next) {
  try {
    const data = req.body;

    // Validaciones de negocio
    if (!data.aliadoId) {
      return res.status(400).json({ success: false, error: 'Debe seleccionar una emisora (aliado comercial).' });
    }

    // Validar que el numero_ot no esté ya registrado
    if (data.numeroOt) {
      const otExiste = await PautaModel.checkNumeroOtExists(data.numeroOt);
      if (otExiste) {
        return res.status(400).json({
          success: false,
          error: `El número OT "${data.numeroOt}" ya está registrado. Verifica el número e inténtalo de nuevo.`
        });
      }
    }

    // ── Validación de montos OC / OT ──────────────────────────────
    // Regla: OT siempre debe ser estrictamente menor al OC.
    // En multi-emisora: el monto OC real se toma de la BD para evitar duplicación;
    // se valida contra el monto disponible de esa OC.
    const distribucionCreate = await PautaModel.getMontoDisponibleOC(data.numeroOc);

    if (distribucionCreate.emisoras.length > 0) {
      // OC ya existe → usar montoOC de la BD (no del payload)
      const montoOC_BD = distribucionCreate.montoOC;
      const nuevoMontoOT = Number(data.montoOT);
      if (nuevoMontoOT >= montoOC_BD) {
        return res.status(400).json({
          success: false,
          error: `El monto OT ($${nuevoMontoOT.toFixed(2)}) debe ser menor al monto OC ($${montoOC_BD.toFixed(2)}).`
        });
      }
      if (nuevoMontoOT > distribucionCreate.montoDisponible) {
        return res.status(400).json({
          success: false,
          error: `El monto OT ($${nuevoMontoOT.toFixed(2)}) supera el monto disponible de la OC ($${distribucionCreate.montoDisponible.toFixed(2)}).`
        });
      }
      // Forzar el monto OC real de la BD para no guardar valores inconsistentes
      data.montoOC = montoOC_BD.toString();
    } else {
      // OC nueva (primera pauta con este número OC)
      if (Number(data.montoOC) <= 0) {
        return res.status(400).json({ success: false, error: 'El monto OC debe ser mayor a cero.' });
      }
      if (Number(data.montoOT) <= 0) {
        return res.status(400).json({ success: false, error: 'El monto OT debe ser mayor a cero.' });
      }
      if (Number(data.montoOT) >= Number(data.montoOC)) {
        return res.status(400).json({ success: false, error: 'El monto OT debe ser estrictamente menor al monto OC.' });
      }
    }

    const nuevaPautaId = await PautaModel.createPauta(data);
    res.status(201).json({ success: true, message: 'Pauta creada exitosamente', data: { id: nuevaPautaId } });
  } catch (error) {
    console.error('\n[ERROR AL CREAR PAUTA] - Detalle del constraint:', error);
    
    if (error.code && ['23505', '23503', '23502', '23514'].includes(error.code)) {
      return res.status(400).json({
        success: false,
        error: `Error de BD: Violación de constraint. Constraint: ${error.constraint || 'N/A'}. Detalle: ${error.detail || error.message}`
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor al crear Pauta',
    });
  }
}

export async function update(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!data.aliadoId) {
      return res.status(400).json({ success: false, error: 'Debe seleccionar una emisora (aliado comercial).' });
    }

    // Validar que el numero_ot no pertenezca a otra pauta diferente
    if (data.numeroOt) {
      const otExiste = await PautaModel.checkNumeroOtExists(data.numeroOt, id);
      if (otExiste) {
        return res.status(400).json({
          success: false,
          error: `El número OT "${data.numeroOt}" ya está registrado en otra pauta. Verifica el número e inténtalo de nuevo.`
        });
      }
    }

    // ── Validación de montos OC / OT (update) ─────────────────────
    // Excluye la pauta actual del cálculo para no bloquearse a sí misma.
    const distribucionUpdate = await PautaModel.getMontoDisponibleOC(data.numeroOc, id);

    if (distribucionUpdate.emisoras.length > 0) {
      // OC ya tiene otras emisoras → usar montoOC de la BD
      const montoOC_BD = distribucionUpdate.montoOC;
      const nuevoMontoOT = Number(data.montoOT);
      if (nuevoMontoOT >= montoOC_BD) {
        return res.status(400).json({
          success: false,
          error: `El monto OT ($${nuevoMontoOT.toFixed(2)}) debe ser menor al monto OC ($${montoOC_BD.toFixed(2)}).`
        });
      }
      if (nuevoMontoOT > distribucionUpdate.montoDisponible) {
        return res.status(400).json({
          success: false,
          error: `El monto OT ($${nuevoMontoOT.toFixed(2)}) supera el monto disponible de la OC ($${distribucionUpdate.montoDisponible.toFixed(2)}).`
        });
      }
      data.montoOC = montoOC_BD.toString();
    } else {
      // Esta es la única pauta con esta OC
      if (Number(data.montoOC) <= 0) {
        return res.status(400).json({ success: false, error: 'El monto OC debe ser mayor a cero.' });
      }
      if (Number(data.montoOT) <= 0) {
        return res.status(400).json({ success: false, error: 'El monto OT debe ser mayor a cero.' });
      }
      if (Number(data.montoOT) >= Number(data.montoOC)) {
        return res.status(400).json({ success: false, error: 'El monto OT debe ser estrictamente menor al monto OC.' });
      }
    }

    const updated = await PautaModel.updatePauta(id, data);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Pauta no encontrada.' });
    }

    res.json({ success: true, message: 'Pauta actualizada exitosamente', data: updated });
  } catch (error) {
    console.error('\n[ERROR AL ACTUALIZAR PAUTA]:', error);

    if (error.code && ['23505', '23503', '23502', '23514'].includes(error.code)) {
      return res.status(400).json({
        success: false,
        error: `Error de BD: Violación de constraint. Constraint: ${error.constraint || 'N/A'}. Detalle: ${error.detail || error.message}`
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor al actualizar Pauta',
    });
  }
}

export async function getByOC(req, res, next) {
  try {
    const { numeroOC } = req.params;
    const pautas = await PautaModel.getPautasByOC(numeroOC);
    res.json({ success: true, data: pautas });
  } catch (error) {
    next(error);
  }
}

export async function getMontoDisponible(req, res, next) {
  try {
    const { numeroOC } = req.params;
    const distribucion = await PautaModel.getMontoDisponibleOC(numeroOC);
    res.json({ success: true, data: distribucion });
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/pautas/:id
 * Elimina una pauta. ON DELETE CASCADE se encarga de CUNAS y DETALLE_PAUTA.
 */
export async function remove(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await PautaModel.deletePauta(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Pauta no encontrada.' });
    }
    res.json({ success: true, message: 'Pauta eliminada exitosamente.' });
  } catch (error) {
    console.error('\n[ERROR AL ELIMINAR PAUTA]:', error);
    next(error);
  }
}
