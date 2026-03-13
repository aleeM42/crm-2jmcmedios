// ==============================================
// Pipeline.jsx — Kanban Board de Ventas
// ==============================================

const COLUMNS = [
  {
    title: 'Contacto Inicial', color: 'accent-light', count: 5,
    cards: [
      { name: 'TechNova Solutions', contact: 'Ana Martínez', amount: '$12,500', date: '12 Oct', seller: 'JP', sellerName: 'Juan Pérez', sellerColor: 'primary' },
      { name: 'Alimentos del Sur', contact: 'Roberto Gómez', amount: '$3,200', date: '14 Oct', seller: 'MG', sellerName: 'María García', sellerColor: 'secondary' },
      { name: 'Moda Urbana S.A.', contact: 'Elena Ruiz', amount: '$7,800', date: '15 Oct', seller: 'JP', sellerName: 'Juan Pérez', sellerColor: 'primary' },
    ],
  },
  {
    title: 'Por Firmar', color: 'secondary', count: 3,
    cards: [
      { name: 'Green Energy Group', contact: 'Daniel Castro', amount: '$15,000', date: '10 Oct', seller: 'MG', sellerName: 'María García', sellerColor: 'secondary' },
      { name: 'Inmobiliaria Central', contact: 'Sofía López', amount: '$9,500', date: '11 Oct', seller: 'JP', sellerName: 'Juan Pérez', sellerColor: 'primary' },
    ],
  },
  {
    title: 'Negociado', color: 'accent-green', count: 4,
    cards: [
      { name: 'Constructora Delta', contact: 'Ignacio Vaca', amount: '$21,000', date: '05 Oct', seller: 'MG', sellerName: 'María García', sellerColor: 'secondary', won: true },
      { name: 'Hotel San Juan', contact: 'Laura Méndez', amount: '$4,500', date: '08 Oct', seller: 'JP', sellerName: 'Juan Pérez', sellerColor: 'primary', won: true },
    ],
  },
];

function Pipeline() {
  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 font-display">Pipeline de Ventas</h2>
        <div className="flex items-center gap-4">
          <select className="bg-white border-none rounded-lg px-4 py-2 pr-10 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-primary outline-none cursor-pointer">
            <option>Filtrar por Vendedor</option><option>Juan Pérez</option><option>María García</option><option>Carlos Ruiz</option>
          </select>
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-sm">
            <span className="material-symbols-outlined text-lg">add</span>Nuevo Lead
          </button>
        </div>
      </header>

      {/* KPI BAR */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Leads</span>
          <span className="text-3xl font-bold text-slate-800">12</span>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Valor Estimado Total</span>
          <span className="text-3xl font-bold text-slate-800">$45,000</span>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Tasa de Conversión</span>
          <span className="text-3xl font-bold text-slate-800">33%</span>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col w-[340px] flex-shrink-0 bg-slate-100/50 rounded-xl p-3 border border-slate-200/50">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-6 bg-${col.color} rounded-full`}></div>
                <h3 className="font-bold text-slate-700">{col.title}</h3>
              </div>
              <span className={`bg-${col.color}/30 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full`}>{col.count}</span>
            </div>
            <div className="flex-1 flex flex-col gap-3">
              {col.cards.map((card) => (
                <div key={card.name} className={`bg-white p-4 rounded-xl shadow-sm border-l-4 border-${col.color} hover:shadow-md transition-shadow group relative`}>
                  <div className="absolute right-3 top-3 flex items-center gap-1">
                    {card.won && <span className="material-symbols-outlined text-accent-green text-lg">check_circle</span>}
                    <span className="material-symbols-outlined text-slate-300 text-[18px] group-hover:text-slate-400">drag_indicator</span>
                  </div>
                  <h4 className="font-bold text-slate-800 pr-10">{card.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{card.contact}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">{card.amount}</span>
                    <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-medium">{card.date}</span>
                  </div>
                  <div className={`mt-3 ${card.won ? 'pt-3 border-t border-slate-50' : ''} flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full bg-${card.sellerColor}/20 flex items-center justify-center text-[10px] font-bold text-${card.sellerColor}`}>{card.seller}</div>
                      <span className="text-[11px] text-slate-400">{card.sellerName}</span>
                    </div>
                    {card.won && <a className="text-[10px] text-accent-green font-bold hover:underline cursor-pointer">Agregar a Clientes</a>}
                  </div>
                </div>
              ))}
              <button className="mt-2 w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-2 text-sm font-medium">
                <span className="material-symbols-outlined text-lg">add_circle</span>Agregar Lead
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Pipeline;
