// ==============================================
// components/ProtectedRoute.jsx — Wrapper de rutas protegidas
// ==============================================
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth.service.js';

/**
 * Envuelve rutas que requieren autenticación.
 * Redirige a /login si no hay token JWT almacenado.
 */
export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
