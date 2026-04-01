// ==============================================
// AgregarAliado.jsx — Formulario Agregar Aliado Comercial
// ==============================================
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import AlertError from '../components/AlertError.jsx';
import { resolveErrorMessage } from '../utils/errorMessages.js';

// Fecha máxima para fecha de nacimiento (hoy)
const today = new Date().toISOString().split('T')[0];

function AgregarAliado() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // RIF controlado
  const [rif, setRif] = useState('');
  const [rifError, setRifError] = useState('');

  // Frecuencia controlada (debe terminar en FM o AM)
  const [frecuencia, setFrecuencia] = useState('');
  const [frecuenciaError, setFrecuenciaError] = useState('');

  const handleFrecuenciaChange = (val) => {
    setFrecuencia(val);
    if (val && !/\b(FM|AM)$/i.test(val.trim())) {
      setFrecuenciaError('La frecuencia debe terminar en FM o AM (ej: 107.3 FM)');
    } else {
      setFrecuenciaError('');
    }
  };

  const handleRifChange = (rawValue) => {
    // Normalizar: quitar guiones y espacios
    let val = rawValue.replace(/-/g, '').replace(/\s/g, '');

    // Primera letra: solo J, G, V, P (mayúscula)
    if (val.length === 0) { setRif(''); setRifError(''); return; }

    const firstChar = val[0].toUpperCase();
    const validPrefixes = ['J', 'G', 'V', 'P'];
    if (!validPrefixes.includes(firstChar)) {
      setRifError('El RIF debe comenzar con J, G, V o P');
      // Permitir solo si es una letra válida al inicio
      return;
    }

    // El resto: solo dígitos, máx 9
    const digits = val.slice(1).replace(/\D/g, '').slice(0, 9);
    const formatted = firstChar + digits;
    setRif(formatted);

    if (digits.length > 0 && digits.length < 9) {
      setRifError('El RIF debe tener exactamente 9 dígitos después de la letra');
    } else {
      setRifError('');
    }
  };

  // Estados para contactos y teléfonos dinámicos
  const [contactos, setContactos] = useState([{ primer_nombre: '', segundo_nombre: '', primer_apellido: '', departamento: '', correo: '', rol: '', fecha_nacimiento: '', anotaciones_especiales: '' }]);
  const [telefonos, setTelefonos] = useState([{ codigo_area: '', numero: '' }]);

  const handleContactoChange = (idx, field, value) => {
    let finalValue = value;
    // Validar que fecha_nacimiento no sea mayor a hoy
    if (field === 'fecha_nacimiento' && value && value > today) {
      return; // Ignorar fechas futuras
    }
    const newContactos = [...contactos];
    newContactos[idx] = { ...newContactos[idx], [field]: finalValue };
    setContactos(newContactos);
  };
  const addContacto = () => setContactos([...contactos, { primer_nombre: '', segundo_nombre: '', primer_apellido: '', departamento: '', correo: '', rol: '', fecha_nacimiento: '', anotaciones_especiales: '' }]);
  const removeContacto = (idx) => setContactos(contactos.filter((_, i) => i !== idx));

  const handleTelefonoChange = (idx, field, value) => {
    let newVal = value;
    if (field === 'numero') newVal = newVal.replace(/\D/g, '').slice(0, 7);
    const newTelefonos = [...telefonos];
    newTelefonos[idx] = { ...newTelefonos[idx], [field]: newVal };
    setTelefonos(newTelefonos);
  };
  const addTelefono = () => setTelefonos([...telefonos, { codigo_area: '', numero: '' }]);
  const removeTelefono = (idx) => setTelefonos(telefonos.filter((_, i) => i !== idx));

  // Estados para opciones dinámicas
  const [regiones, setRegiones] = useState([]);
  const [estados, setEstados] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState('');
  const [ciudades, setCiudades] = useState([]);
  const [coberturas, setCoberturas] = useState([]);
  const [categorias, setCategorias] = useState([
    { id: 'multitarget', nombre: 'Multitarget' },
    { id: 'comunitaria', nombre: 'Comunitaria' },
    { id: 'juvenil', nombre: 'Juvenil' },
    { id: 'adulto joven', nombre: 'Adulto joven' },
    { id: 'popular', nombre: 'Popular' },
    { id: 'adulto', nombre: 'Adulto' },
    { id: 'deportiva', nombre: 'Deportiva' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resRegiones, resEstados, resCoberturas, resCategorias] = await Promise.all([
          api.get('/lugares?tipo=Region').catch(err => ({ success: false })),
          api.get('/lugares?tipo=Estado').catch(err => ({ success: false })),
          api.get('/coberturas').catch(err => ({ success: false })),
          api.get('/categorias').catch(err => ({ success: false })),
        ]);

        if (resRegiones.success) setRegiones(resRegiones.data);
        if (resEstados.success) setEstados(resEstados.data);
        if (resCoberturas.success) setCoberturas(resCoberturas.data);
        if (resCategorias.success && resCategorias.data.length > 0) {
          setCategorias(resCategorias.data);
        }
      } catch (err) {
        console.error('Error fetching select options:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedEstado) {
      setCiudades([]);
      return;
    }
    const fetchCiudades = async () => {
      try {
        const res = await api.get(`/lugares?padre_id=${selectedEstado}`);
        if (res.success) {
          setCiudades(res.data);
        }
      } catch (err) {
        console.error('Error fetching ciudades:', err);
      }
    };
    fetchCiudades();
  }, [selectedEstado]);

  const EMAIL_RE_ALIADO = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  const PHONE_RE_ALIADO = /^\d{7}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ── Validar RIF ──────────────────────────────────────
    if (!rif || rif.slice(1).replace(/\D/g, '').length !== 9) {
      setRifError('El RIF debe tener la letra (J/G/V/P) + exactamente 9 dígitos');
      return;
    }

    // ── Validar Frecuencia ───────────────────────────────
    if (!frecuencia?.trim()) {
      setFrecuenciaError('La frecuencia es obligatoria.');
      return;
    }
    if (!/\b(FM|AM)$/i.test(frecuencia.trim())) {
      setFrecuenciaError('La frecuencia debe terminar en FM o AM (ej: 107.3 FM)');
      return;
    }

    // ── Validar correos de contactos ─────────────────────
    const contactosActivos = contactos.filter(c => c.primer_nombre && c.primer_apellido);
    for (let i = 0; i < contactosActivos.length; i++) {
      const c = contactosActivos[i];
      const label = `Contacto ${i + 1}`;
      if (c.correo && !EMAIL_RE_ALIADO.test(c.correo))
        return setError(`${label}: el correo "${c.correo}" no tiene un formato válido (ej: nombre@dominio.com).`);
    }

    // ── Validar teléfonos ────────────────────────────────
    for (let i = 0; i < telefonos.length; i++) {
      const t = telefonos[i];
      if (t.codigo_area || t.numero) {
        if (!t.codigo_area)
          return setError(`Teléfono ${i + 1}: seleccione el código de área.`);
        if (!PHONE_RE_ALIADO.test(t.numero))
          return setError(`Teléfono ${i + 1}: el número debe tener exactamente 7 dígitos numéricos.`);
      }
    }

    const formData = new FormData(e.target);
    const categoriasSeleccionadas = formData.getAll('categoria');

    if (categoriasSeleccionadas.length === 0) {
      setError('Debe seleccionar al menos una categoría.');
      return;
    }

    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      rif,
      categoria: categoriasSeleccionadas.join(', '),
      frecuencia: frecuencia.trim().toUpperCase(),
      fk_lugar: parseInt(data.lugar, 10) || null,
      fk_region: parseInt(data.region, 10) || null,
      fk_cobertura: parseInt(data.cobertura, 10) || null,
      contactos: contactosActivos,
      telefonos: telefonos.filter(t => t.codigo_area && PHONE_RE_ALIADO.test(t.numero))
    };

    try {
      setError('');
      const response = await api.post('/aliados', payload);
      if (response.success) {
        navigate('/aliados-comerciales');
      }
    } catch (err) {
      console.error('Error creating aliado:', err);
      setError(resolveErrorMessage(err, 'aliados'));
    }
  };

  return (
    <>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
            <Link to="/aliados-comerciales" className="hover:text-primary transition-colors">Aliados Comerciales</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-900">Nuevo Aliado</span>
          </nav>
          <h2 className="text-3xl font-bold text-slate-900 font-display">Agregar Aliado Comercial</h2>
        </div>
      </header>

      {error && <AlertError message={error} onClose={() => setError('')} />}

      <div className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <form className="p-8 space-y-12" onSubmit={handleSubmit}>
          {/* Section 1: Datos de la Emisora */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <span className="material-symbols-outlined text-primary">radio</span>
              <h3 className="text-lg font-bold font-display uppercase tracking-tight text-slate-800">Datos de la Emisora</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Razón Social<span className="text-red-500 ml-0.5">*</span></label>
                <input name="razon_social" required className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Ej: Circuito Radiofonico Nacional C.A." type="text" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nombre de la Emisora<span className="text-red-500 ml-0.5">*</span></label>
                <input name="nombre_emisora" required className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Ej: La Mega 107.3" type="text" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">RIF<span className="text-red-500 ml-0.5">*</span></label>
                <input
                  name="rif"
                  required
                  value={rif}
                  onChange={(e) => handleRifChange(e.target.value)}
                  className={`w-full rounded-lg bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary ${rifError ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200'}`}
                  placeholder="J123456789"
                  type="text"
                  maxLength={10}
                />
                {rifError && <p className="text-xs text-red-500 mt-1">{rifError}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Frecuencia<span className="text-red-500 ml-0.5">*</span></label>
                <input
                  name="frecuencia"
                  required
                  value={frecuencia}
                  onChange={(e) => handleFrecuenciaChange(e.target.value)}
                  className={`w-full rounded-lg bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary ${frecuenciaError ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200'}`}
                  placeholder="Ej: 107.3 FM"
                  type="text"
                />
                {frecuenciaError && <p className="text-xs text-red-500 mt-1">{frecuenciaError}</p>}
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Categorías<span className="text-red-500 ml-0.5">*</span></label>
                <div className="flex flex-wrap gap-2">
                  {categorias.map(cat => (
                    <label key={cat.id || cat.nombre} className="flex items-center gap-2 text-sm bg-white border border-slate-200 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
                      <input type="checkbox" name="categoria" value={cat.nombre.toLowerCase()} className="text-primary rounded-md border-slate-300 focus:ring-primary w-4 h-4" />
                      <span className="text-slate-700 font-medium">{cat.nombre}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Estado<span className="text-red-500 ml-0.5">*</span></label>
                <select name="estado" required className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary">
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="cerrado">Cerrado</option>
                </select>
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Dirección<span className="text-red-500 ml-0.5">*</span></label>
                <textarea name="direccion" required className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Av. Principal de las Mercedes..." rows="2"></textarea>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Región<span className="text-red-500 ml-0.5">*</span></label>
                <select name="region" required className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary">
                  <option value="">Seleccione una región</option>
                  {regiones.map(reg => (
                    <option key={reg.id} value={reg.id}>{reg.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Estado Geográfico<span className="text-red-500 ml-0.5">*</span></label>
                <select name="estado_geografico" required value={selectedEstado} onChange={(e) => setSelectedEstado(e.target.value)} className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary">
                  <option value="">Seleccione el estado</option>
                  {estados.map(est => (
                    <option key={est.id} value={est.id}>{est.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Ciudad<span className="text-red-500 ml-0.5">*</span></label>
                <select name="lugar" required disabled={!selectedEstado} className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary disabled:opacity-50">
                  <option value="">Seleccione la ciudad</option>
                  {ciudades.map(ciu => (
                    <option key={ciu.id} value={ciu.id}>{ciu.nombre}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Section 2: Cobertura */}
          <section>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">broadcast_on_home</span>
                <h3 className="text-lg font-bold font-display uppercase tracking-tight text-slate-800">Cobertura</h3>
              </div>
            </div>
            <div className="space-y-1.5 md:w-1/2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Seleccione Cobertura<span className="text-red-500 ml-0.5">*</span></label>
              <select name="cobertura" required className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary">
                <option value="">Seleccione una cobertura</option>
                {coberturas.map(cob => (
                  <option key={cob.id} value={cob.id}>{cob.descripcion}</option>
                ))}
              </select>
            </div>
          </section>
          {/* Section 3: Contacto de la Emisora */}
          <section>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                <h3 className="text-lg font-bold font-display uppercase tracking-tight text-slate-800">Contactos de la Emisora</h3>
              </div>
              <button onClick={addContacto} className="flex items-center gap-1 text-xs font-bold text-primary hover:text-secondary transition-colors" type="button">
                <span className="material-symbols-outlined text-[18px]">add_circle</span>Agregar Contacto
              </button>
            </div>

            <div className="space-y-8">
              {contactos.map((contacto, idx) => (
                <div key={idx} className="relative bg-white border border-slate-100 p-6 rounded-xl shadow-sm">
                  {contactos.length > 1 && (
                    <button type="button" onClick={() => removeContacto(idx)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  )}
                  <h4 className="text-sm font-bold text-slate-700 mb-4">Contacto #{idx + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Primer Nombre<span className="text-red-500 ml-0.5">*</span></label>
                      <input value={contacto.primer_nombre} onChange={(e) => handleContactoChange(idx, 'primer_nombre', e.target.value)} required className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Ej: Juan" type="text" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Segundo Nombre</label>
                      <input value={contacto.segundo_nombre} onChange={(e) => handleContactoChange(idx, 'segundo_nombre', e.target.value)} className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Ej: Alberto" type="text" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Primer Apellido<span className="text-red-500 ml-0.5">*</span></label>
                      <input value={contacto.primer_apellido} onChange={(e) => handleContactoChange(idx, 'primer_apellido', e.target.value)} required className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Ej: Pérez" type="text" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Departamento<span className="text-red-500 ml-0.5">*</span></label>
                      <input value={contacto.departamento} onChange={(e) => handleContactoChange(idx, 'departamento', e.target.value)} required className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Ej: Ventas" type="text" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Correo Electrónico<span className="text-red-500 ml-0.5">*</span></label>
                      <input value={contacto.correo} onChange={(e) => handleContactoChange(idx, 'correo', e.target.value)} required className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="ejemplo@correo.com" type="email" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Rol en la Emisora<span className="text-red-500 ml-0.5">*</span></label>
                      <input value={contacto.rol} onChange={(e) => handleContactoChange(idx, 'rol', e.target.value)} required className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Ej: Gerente General" type="text" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Fecha de Nacimiento</label>
                      <input
                        value={contacto.fecha_nacimiento}
                        onChange={(e) => handleContactoChange(idx, 'fecha_nacimiento', e.target.value)}
                        className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary"
                        type="date"
                        max={today}
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Anotaciones Especiales</label>
                      <textarea value={contacto.anotaciones_especiales} onChange={(e) => handleContactoChange(idx, 'anotaciones_especiales', e.target.value)} className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Información adicional sobre el contacto..." rows="1"></textarea>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Teléfonos */}
          <section>
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">call</span>
                <h3 className="text-lg font-bold font-display uppercase tracking-tight text-slate-800">Teléfonos</h3>
              </div>
              <button onClick={addTelefono} className="flex items-center gap-1 text-xs font-bold text-primary hover:text-secondary transition-colors" type="button">
                <span className="material-symbols-outlined text-[18px]">add_circle</span>Agregar Teléfono
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              {telefonos.map((tel, idx) => (
                <div key={idx} className="flex gap-3 items-end bg-white border border-slate-100 p-4 rounded-xl shadow-sm relative">
                  <div className="w-24 flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Cód.</label>
                    <select value={tel.codigo_area} onChange={(e) => handleTelefonoChange(idx, 'codigo_area', e.target.value)} className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary">
                      <option value="">—</option>
                      <option value="0412">0412</option>
                      <option value="0422">0422</option>
                      <option value="0414">0414</option>
                      <option value="0424">0424</option>
                      <option value="0416">0416</option>
                      <option value="0426">0426</option>
                    </select>
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Número</label>
                    <input value={tel.numero} onChange={(e) => handleTelefonoChange(idx, 'numero', e.target.value)} className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="1234567" type="tel" maxLength="7" pattern="[0-9]{7}" title="Debe tener exactamente 7 dígitos" />
                  </div>
                  {telefonos.length > 1 && (
                    <button type="button" onClick={() => removeTelefono(idx)} className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg hover:bg-red-50 hover:text-red-500 text-slate-400 mb-[1px] transition-colors">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Action Footer */}
          <div className="pt-8 flex flex-col sm:flex-row justify-end gap-4 border-t border-slate-100">
            <Link to="/aliados-comerciales" className="px-6 py-2.5 border border-red-400 text-red-500 rounded-lg font-bold text-sm bg-red-50 hover:bg-red-50 transition-all text-center">Cancelar</Link>
            <button className="px-10 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all" type="submit">Finalizar Registro</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AgregarAliado;
