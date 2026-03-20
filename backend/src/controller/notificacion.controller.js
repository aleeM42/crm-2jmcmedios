// ==============================================
// controller/notificacion.controller.js
// ==============================================
import * as NotificacionModel from '../model/notificacion.model.js';

export const getNotificaciones = async (req, res, next) => {
  try {
    const { id, rol } = req.user;
    const notificaciones = await NotificacionModel.getNotificaciones(id, rol);
    res.json({ success: true, data: notificaciones });
  } catch (error) {
    next(error);
  }
};
