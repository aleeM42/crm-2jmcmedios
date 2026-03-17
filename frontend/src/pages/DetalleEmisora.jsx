// ==============================================
// DetalleEmisora.jsx — Detalle de Aliado Comercial
// ==============================================
import { Link, useParams } from 'react-router-dom';

const STATUS_DOT = {
  Activo: 'bg-accent-green',
  Inactivo: 'bg-slate-300',
  Cerrado: 'bg-red-500',
};

export default function DetalleEmisora() {
  const { id } = useParams();

  const emisora = {
    razon_social: 'Circuitos Románticos de Venezuela C.A.',
    nombre_emisora: 'La Romántica 88.9',
    rif: 'J-30492834-1',
    frecuencia: '88.9 FM',
    categoria: 'Musical',
    direccion: 'Av. Principal Las Mercedes, Torre La Castellana, Piso 4, Caracas, Miranda',
    estado: 'Activo',
  };

  const contacto = {
    primer_nombre: 'María',
    segundo_nombre: 'Elena',
    primer_apellido: 'Torres',
    departamento: 'Comercial',
    correo: 'maria.torres@romantica.com',
    rol: 'Directora Comercial',
    fecha_nacimiento: '1985-06-15',
    anotaciones_especiales: 'Prefiere comunicación por email. Disponible L-V 9am-5pm.',
    telefonos: [
      { codigo_area: '0412', cuerpo: '5551234' },
      { codigo_area: '0212', cuerpo: '2634589' },
    ],
  };

  const pautasAsociadas = [
    { numero_OT: 'OT-001', cliente: 'Alimentos Polar', marca: 'Harina PAN', estado: 'En transmisión', cantidad_cuñas: 90, monto_OC: '$5,850' },
    { numero_OT: 'OT-004', cliente: 'Toyota Venezuela', marca: 'Hilux 2024', estado: 'En transmisión', cantidad_cuñas: 120, monto_OC: '$6,600' },
    { numero_OT: 'OT-003', cliente: 'Banesco', marca: 'Cuenta Digital', estado: 'Finalizada', cantidad_cuñas: 40, monto_OC: '$2,720' },
  ];

  const STATUS_STYLE = {
    'En transmisión': 'bg-primary/10 text-primary',
    'Finalizada': 'bg-accent-green/10 text-accent-green',
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/aliados-comerciales">Aliados Comerciales</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-600">{emisora.nombre_emisora}</span>
          </nav>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-slate-900 font-display">{emisora.nombre_emisora}</h2>
            <div className={`h-3 w-3 rounded-full ${STATUS_DOT[emisora.estado]}`} title={emisora.estado}></div>
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">{emisora.frecuencia}</span>
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="px-4 py-2 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">edit</span> Editar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          {/* INFORMACIÓN GENERAL */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">radio</span>
              Información General
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10">
              {[
                { label: 'Razón Social', value: emisora.razon_social },
                { label: 'Nombre Emisora', value: emisora.nombre_emisora },
                { label: 'RIF', value: emisora.rif },
                { label: 'Frecuencia', value: emisora.frecuencia },
                { label: 'Categoría', value: emisora.categoria },
                { label: 'Estado', value: emisora.estado },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-slate-700">{item.value}</p>
                </div>
              ))}
              <div className="col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dirección</p>
                <p className="text-sm font-medium text-slate-700">{emisora.direccion}</p>
              </div>
            </div>
          </section>

          {/* COBERTURA */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">broadcast_on_home</span>
              Cobertura
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Caracas - Los Teques', 'Valles del Tuy', 'Guarenas - Guatire', 'Barlovento'].map((c) => (
                <span key={c} className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-semibold">{c}</span>
              ))}
            </div>
          </section>

          {/* PAUTAS ASOCIADAS */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">campaign</span>
              Pautas Asociadas
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-2 px-4">Nro OT</th>
                    <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-2 px-4">Cliente</th>
                    <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-2 px-4">Marca</th>
                    <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-2 px-4">Cuñas</th>
                    <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-2 px-4">Estado</th>
                    <th className="text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest py-2 px-4">Monto OC</th>
                  </tr>
                </thead>
                <tbody>
                  {pautasAsociadas.map((p) => (
                    <tr key={p.numero_OT} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <Link to={`/pautas/${p.numero_OT}`} className="font-bold text-primary hover:underline">{p.numero_OT}</Link>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{p.cliente}</td>
                      <td className="py-3 px-4 text-slate-600">{p.marca}</td>
                      <td className="py-3 px-4 text-slate-600">{p.cantidad_cuñas}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${STATUS_STYLE[p.estado] || 'bg-slate-100 text-slate-500'}`}>{p.estado}</span>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-slate-800">{p.monto_OC}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-8">
          {/* CONTACTO PRINCIPAL */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">person</span>
              Contacto Principal
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Nombre', value: `${contacto.primer_nombre} ${contacto.segundo_nombre} ${contacto.primer_apellido}` },
                { label: 'Departamento', value: contacto.departamento },
                { label: 'Rol', value: contacto.rol },
                { label: 'Correo', value: contacto.correo, link: true },
                { label: 'Fecha de Nacimiento', value: contacto.fecha_nacimiento },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-xs text-slate-500">{item.label}</span>
                  {item.link ? (
                    <a href={`mailto:${item.value}`} className="text-xs font-bold text-primary hover:underline">{item.value}</a>
                  ) : (
                    <span className="text-xs font-bold text-slate-700">{item.value}</span>
                  )}
                </div>
              ))}
              <div className="py-2">
                <span className="text-xs text-slate-500 block mb-2">Teléfonos</span>
                <div className="space-y-1">
                  {contacto.telefonos.map((t, i) => (
                    <p key={i} className="text-xs font-bold text-slate-700">{t.codigo_area}-{t.cuerpo}</p>
                  ))}
                </div>
              </div>
              {contacto.anotaciones_especiales && (
                <div className="py-2 border-t border-slate-50">
                  <span className="text-xs text-slate-500 block mb-1">Anotaciones</span>
                  <p className="text-xs text-slate-600 italic">{contacto.anotaciones_especiales}</p>
                </div>
              )}
            </div>
          </section>

          {/* ESTADÍSTICAS */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Estadísticas
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Pautas Activas</span>
                <span className="text-sm font-black text-primary">2</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Total Cuñas</span>
                <span className="text-sm font-bold text-slate-800">250</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-xs text-slate-500">Facturación Total</span>
                <span className="text-sm font-black text-primary">$15,170</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
