// ==============================================
// Login.jsx — Pantalla de Login CRM Vortice
// ==============================================
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertError from '../components/AlertError.jsx';
import { login } from '../services/auth.service.js';

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [errorVariant, setErrorVariant] = useState('error');
  const [loading, setLoading] = useState(false);

  // ── Estado de bloqueo por fuerza bruta ────────────────────
  const [locked, setLocked] = useState(false);
  const [lockCountdown, setLockCountdown] = useState('');
  const lockTimerRef = useRef(null);

  /**
   * Inicia un countdown visual hasta `lockedUntilISO`.
   * Cuando expira, limpia el estado de bloqueo automáticamente.
   */
  const startLockCountdown = useCallback((lockedUntilISO) => {
    // Limpiar timer previo
    if (lockTimerRef.current) clearInterval(lockTimerRef.current);

    const target = new Date(lockedUntilISO).getTime();

    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        clearInterval(lockTimerRef.current);
        lockTimerRef.current = null;
        setLocked(false);
        setLockCountdown('');
        setError('');
        return;
      }
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setLockCountdown(`${mins}:${secs.toString().padStart(2, '0')}`);
    };

    tick(); // Ejecutar inmediatamente
    lockTimerRef.current = setInterval(tick, 1000);
  }, []);

  // Cleanup del timer al desmontar
  useEffect(() => {
    return () => {
      if (lockTimerRef.current) clearInterval(lockTimerRef.current);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (locked) return;
    setError('');
    setLoading(true);

    try {
      const result = await login(identifier, password);
      if (result.success) {
        const userRole = result.data?.user?.rol;
        if (userRole === 'Gestor de Pautas') {
          navigate('/pautas');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      const data = err.data || {};
      const status = err.status;

      // ── Cuenta bloqueada (423) ──────────────────────────
      if (status === 423 || data.code === 'ACCOUNT_LOCKED') {
        setLocked(true);
        setErrorVariant('warning');
        setError(data.error || 'Cuenta bloqueada temporalmente. Intente más tarde.');
        if (data.lockedUntil) {
          startLockCountdown(data.lockedUntil);
        }
        return;
      }

      // ── Credenciales inválidas con intentos restantes ───
      if (data.code === 'INVALID_CREDENTIALS') {
        setErrorVariant('error');
        setError(data.error || 'Credenciales inválidas.');
        return;
      }

      // ── Cuenta suspendida (403) ─────────────────────────
      if (status === 403) {
        setErrorVariant('warning');
        setError(data.error || 'Cuenta suspendida. Contacte al administrador.');
        return;
      }

      // ── Cualquier otro error ────────────────────────────
      setErrorVariant('error');
      setError(data.error || err.message || 'Error de autenticación. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || locked;

  return (
    <div className="flex h-screen w-full">
      {/* Left Side: Gradient & Brand Visual */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(147.99deg, #8DC63F 0%, #55CCD3 35%, #16B1B8 70%, #A1DEE5 100%)' }}>
        {/* Subtle Vortex/Spiral Watermark */}
        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
          <svg fill="white" height="600" viewBox="0 0 512 512" width="600" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-114.7 0-208-93.3-208-208S141.3 48 256 48s208 93.3 208 208-93.3 208-208 208zm-96-208c0-53 43-96 96-96s96 43 96 96-43 96-96 96-96-43-96-96z" fillRule="evenodd" opacity="0.3"></path>
            <circle cx="256" cy="256" fill="none" opacity="0.2" r="150" stroke="white" strokeWidth="2"></circle>
            <circle cx="256" cy="256" fill="none" opacity="0.1" r="100" stroke="white" strokeWidth="2"></circle>
          </svg>
        </div>
        <div className="relative z-10 text-center text-white px-12">
          <div className="mb-8 flex justify-center">
            <div className="p-6 bg-[#F4FAFB]/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
              <img
                src="/Vortice.png"
                alt="2JMC Medios"
                className="w-32 h-32 object-contain drop-shadow-lg"
              />
            </div>
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-4">2JMC Medios</h2>
          <p className="text-white/80 text-lg font-light max-w-md mx-auto">Gestión inteligente de medios y comunicación para la era digital.</p>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#F4FAFB]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#F4FAFB]/10 rounded-full blur-3xl"></div>
      </div>
      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 bg-[#F4FAFB] flex flex-col items-center justify-center p-8 lg:p-24">
        <div className="w-full max-w-md">
          {/* Mobile Logo (shown only on small screens) */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
            <img src="/Vortice-01.png" alt="" className="w-26 h-26 object-contain drop-shadow-lg" />
            <h2 className="text-text-dark text-5xl font-bold font-display ">2JMC Medios</h2>
          </div>
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-text-dark text-3xl font-bold font-display mb-2">Iniciar Sesión</h1>
            <p className="text-text-muted font-light">Bienvenido de nuevo al CRM de 2JMC Medios.</p>
          </div>

          {/* Error / Warning Alert */}
          {error && (
            <AlertError
              message={error}
              variant={errorVariant}
              onClose={locked ? undefined : () => setError('')}
            />
          )}

          {/* Countdown de bloqueo */}
          {locked && lockCountdown && (
            <div className="mb-6 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <span className="material-symbols-outlined text-amber-500 text-xl">timer</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Tiempo restante para desbloqueo</p>
                <p className="text-2xl font-black text-amber-800 font-display tabular-nums">{lockCountdown}</p>
              </div>
              <span className="material-symbols-outlined text-amber-400 text-2xl">lock</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* User Input */}
            <div>
              <label className="block text-text-dark text-sm font-semibold mb-2 font-display">Usuario</label>
              <div className="relative">
                <input
                  className={`w-full h-14 px-4 bg-background-main border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-dark font-display ${isDisabled ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''}`}
                  placeholder="Nombre de usuario o correo"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  autoComplete="username"
                  disabled={isDisabled}
                />
              </div>
            </div>
            {/* Password Input */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-text-dark text-sm font-semibold font-display">Contraseña</label>
                <a className="text-xs text-primary font-medium hover:underline" href="#">¿Olvidó su contraseña?</a>
              </div>
              <div className="relative">
                <input
                  className={`w-full h-14 pl-4 pr-12 bg-background-main border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-dark font-display ${isDisabled ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''}`}
                  placeholder="••••••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  disabled={isDisabled}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors flex items-center justify-center p-1"
                  tabIndex="-1"
                  disabled={isDisabled}
                >
                  <span className="material-symbols-outlined select-none text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>
            {/* Remember Me */}
            <div className="flex items-center">
              <input className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer" id="remember" type="checkbox" disabled={isDisabled} />
              <label className="ml-2 text-sm text-text-muted cursor-pointer" htmlFor="remember">Mantener sesión iniciada</label>
            </div>
            {/* Submit Button */}
            <button
              className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={isDisabled}
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                  <span>Ingresando...</span>
                </>
              ) : locked ? (
                <>
                  <span className="material-symbols-outlined text-xl">lock</span>
                  <span>Cuenta bloqueada</span>
                </>
              ) : (
                <>
                  <span>Ingresar</span>
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">login</span>
                </>
              )}
            </button>
          </form>
          {/* Footer Text */}
          <div className="mt-16 text-center">
            <p className="text-text-muted text-xs tracking-widest font-medium uppercase font-display">
              CRM 2JMC Medios © 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
