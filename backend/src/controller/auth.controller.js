// ==============================================
// controller/auth.controller.js — Login y sesión del usuario
// ==============================================

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as AuthModel from '../model/auth.model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'crm-2jmc-dev-secret-change-in-prod';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';

/**
 * POST /api/auth/login
 * Body: { identifier, password }
 * identifier puede ser correo electrónico o nombre de usuario.
 */
export const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        error: 'Correo/usuario y contraseña son obligatorios',
      });
    }

    // 1. Buscar usuario por correo o nombre_usuario
    const user = await AuthModel.findByIdentifier(identifier);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas',
      });
    }

    // 2. Verificar que la cuenta no esté suspendida
    if (user.estado === 'Suspendido') {
      return res.status(403).json({
        success: false,
        error: 'Cuenta suspendida. Contacte al administrador.',
      });
    }

    // 3. Verificar bloqueo temporal por intentos fallidos
    if (user.bloqueado_hasta && new Date(user.bloqueado_hasta) > new Date()) {
      const minutosRestantes = Math.ceil(
        (new Date(user.bloqueado_hasta) - new Date()) / 60000
      );
      return res.status(423).json({
        success: false,
        code: 'ACCOUNT_LOCKED',
        error: `Cuenta bloqueada temporalmente. Intente en ${minutosRestantes} minuto(s).`,
        lockedUntil: user.bloqueado_hasta,
        minutesRemaining: minutosRestantes,
      });
    }

    // 4. Comparar password con bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      const failure = await AuthModel.updateLoginFailure(user.id);
      const intentosRestantes = 3 - failure.intentos_fallidos;

      // La cuenta acaba de bloquearse con este intento
      if (failure.bloqueado_hasta && new Date(failure.bloqueado_hasta) > new Date()) {
        return res.status(423).json({
          success: false,
          code: 'ACCOUNT_LOCKED',
          error: 'Cuenta bloqueada por demasiados intentos fallidos. Intente en 15 minutos.',
          lockedUntil: failure.bloqueado_hasta,
          minutesRemaining: 15,
        });
      }

      return res.status(401).json({
        success: false,
        code: 'INVALID_CREDENTIALS',
        error: `Credenciales inválidas. ${intentosRestantes} intento(s) restante(s).`,
        attemptsRemaining: intentosRestantes,
      });
    }

    // 5. Login exitoso — resetear intentos y generar JWT
    await AuthModel.updateLoginSuccess(user.id);

    const tokenPayload = {
      id: user.id,
      correo: user.correo,
      nombre_usuario: user.nombre_usuario,
      rol: user.rol,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          primer_nombre: user.primer_nombre,
          primer_apellido: user.primer_apellido,
          correo: user.correo,
          nombre_usuario: user.nombre_usuario,
          rol: user.rol,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/auth/me
 * Retorna los datos del usuario autenticado (requiere authenticate middleware).
 */
export const me = async (req, res, next) => {
  try {
    const user = await AuthModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado',
      });
    }

    return res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
