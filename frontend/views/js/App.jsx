// ==============================================
// App.jsx — Pantalla Principal / Login
// ==============================================

function App() {
  return (
    <div className="flex h-screen w-full">
      {/* Left Side: Gradient & Brand Visual */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(147.99deg, #8DC63F 0%, #55CCD3 35%, #16B1B8 70%, #A1DEE5 100%)' }}>
        {/* Subtle Vortex/Spiral Watermark */}
        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
          <svg fill="white" height="600" viewBox="0 0 512 512" width="600" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-114.7 0-208-93.3-208-208S141.3 48 256 48s208 93.3 208 208-93.3 208-208 208zm-96-208c0-53 43-96 96-96s96 43 96 96-43 96-96 96-96-43-96-96z" fill-rule="evenodd" opacity="0.3"></path>
            <circle cx="256" cy="256" fill="none" opacity="0.2" r="150" stroke="white" stroke-width="2"></circle>
            <circle cx="256" cy="256" fill="none" opacity="0.1" r="100" stroke="white" stroke-width="2"></circle>
          </svg>
        </div>
        <div className="relative z-10 text-center text-white px-12">
          <div className="mb-8 flex justify-center">
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
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
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-8 lg:p-24">
        <div className="w-full max-w-md">
          {/* Mobile Logo (shown only on small screens) */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
            <img src="/Vortice-01.png" alt="" />
            <h2 className="text-text-dark text-2xl font-bold font-display">2JMC Medios</h2>
          </div>
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-text-dark text-3xl font-bold font-display mb-2">Iniciar Sesión</h1>
            <p className="text-text-muted font-light">Bienvenido de nuevo al CRM de 2JMC Medios.</p>
          </div>
          <form className="space-y-6">
            {/* User Input */}
            <div>
              <label className="block text-text-dark text-sm font-semibold mb-2 font-display">Usuario</label>
              <div className="relative">
                <input className="w-full h-14 px-4 bg-background-main border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-dark font-display" placeholder="Nombre de usuario o correo" type="text" />
              </div>
            </div>
            {/* Password Input */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-text-dark text-sm font-semibold font-display">Contraseña</label>
                <a className="text-xs text-primary font-medium hover:underline" href="#">¿Olvidó su contraseña?</a>
              </div>
              <div className="relative">
                <input className="w-full h-14 px-4 bg-background-main border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-dark font-display" placeholder="••••••••••••" type="password" />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors" type="button">
                  <span className="material-symbols-outlined text-xl">visibility</span>
                </button>
              </div>
            </div>
            {/* Remember Me */}
            <div className="flex items-center">
              <input className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer" id="remember" type="checkbox" />
              <label className="ml-2 text-sm text-text-muted cursor-pointer" htmlFor="remember">Mantener sesión iniciada</label>
            </div>
            {/* Submit Button */}
            <button className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group" type="submit">
              <span>Ingresar</span>
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">login</span>
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

export default App;
