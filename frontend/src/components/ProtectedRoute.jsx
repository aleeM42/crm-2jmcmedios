// ==============================================
// components/ProtectedRoute.jsx — Wrapper de rutas con RBAC
// ==============================================
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../services/auth.service.js';

/**
 * Envuelve rutas que requieren autenticación.
 * Redirige a /login si no hay token JWT almacenado.
 * Implementa RBAC según los roles permitidos y las reglas globales.
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles) {
    const user = getCurrentUser();
    const rol = user?.rol || '';

    // Regla Global: Director General y Director tienen acceso a todo
    if (rol === 'Director General' || rol === 'Director') {
      return children;
    }

    if (!allowedRoles.includes(rol)) {
      // Regla Global Extraídas del Backend: Invitado y Vendedor tienen lectura global de vistas autorizadas
      // Pero si se les protege específicamente para prohibir lectura (ej. Pantallas de Admin exclusivas)
      // Redirigen al dashboard / unauthorized
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}
