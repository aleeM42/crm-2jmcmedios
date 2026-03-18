// ==============================================
// services/auth.service.js — Autenticación del usuario
// ==============================================

import api from './api.js';

const TOKEN_KEY = 'crm_token';
const USER_KEY = 'crm_user';

/**
 * Login con correo/nombre de usuario + contraseña.
 * Guarda token y datos del usuario en localStorage.
 */
export const login = async (identifier, password) => {
  const result = await api.post('/auth/login', { identifier, password });

  if (result.success) {
    localStorage.setItem(TOKEN_KEY, result.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(result.data.user));
  }

  return result;
};

/**
 * Cierra la sesión del usuario.
 */
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.location.href = '/login';
};

/**
 * Obtiene el token JWT almacenado.
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY);

/**
 * Obtiene los datos del usuario almacenados.
 */
export const getCurrentUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

/**
 * Verifica si hay una sesión activa.
 */
export const isAuthenticated = () => !!getToken();

/**
 * Obtiene datos actualizados del usuario autenticado desde el servidor.
 */
export const fetchMe = async () => {
  const result = await api.get('/auth/me');
  return result.data;
};
