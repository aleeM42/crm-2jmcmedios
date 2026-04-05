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

    if (Number(data.montoOC) <= Number(data.montoOT)) {
      return res.status(400).json({ success: false, error: 'El monto OC debe ser mayor al monto OT.' });
    }

    // Validar que el monto OT no supere el disponible de la OC (si ya existen registros con esa OC)
    if (data.numeroOc) {
      const distribucion = await PautaModel.getMontoDisponibleOC(data.numeroOc);
      if (distribucion.emisoras.length > 0) {
        const nuevoMontoOT = Number(data.montoOT);
        if (nuevoMontoOT > distribucion.montoDisponible) {
          return res.status(400).json({
            success: false,
            error: `El monto OT ($${nuevoMontoOT}) supera el monto disponible de la OC ($${distribucion.montoDisponible.toFixed(2)}).`
          });
        }
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

    if (Number(data.montoOC) <= Number(data.montoOT)) {
      return res.status(400).json({ success: false, error: 'El monto OC debe ser mayor al monto OT.' });
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
