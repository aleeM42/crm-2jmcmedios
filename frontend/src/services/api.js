// ==============================================
// services/api.js — Fetch wrapper base con JWT
// ==============================================

const BASE_URL = '/api';

/**
 * Wrapper genérico para fetch con autenticación JWT.
 * Inyecta automáticamente el token desde localStorage.
 * Redirige a /login si recibe 401.
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('crm_token');

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  // Si el token expiró, limpiar y redirigir a login (excepto si estamos intentando hacer login)
  if (response.status === 401 && !endpoint.includes('/auth/login')) {
    localStorage.removeItem('crm_token');
    localStorage.removeItem('crm_user');
    window.location.href = '/login';
    throw new Error('Sesión expirada');
  }

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || 'Error en la solicitud');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, body) =>
    request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) =>
    request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export default api;
