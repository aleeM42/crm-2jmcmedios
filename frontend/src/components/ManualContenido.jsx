// ==============================================
// ManualContenido.jsx — Contenido del Manual de Usuario CRM 2JMC
// ==============================================

export default function ManualContenido() {
  return (
    <div className="manual-body" style={{ fontFamily: "'Montserrat', 'Inter', sans-serif", color: '#1F2937' }}>

      {/* ── PORTADA ── */}
      <div className="manual-cover" style={{
        background: 'linear-gradient(135deg, #16B1B8 0%, #0e8a90 50%, #8DC63F 100%)',
        color: 'white',
        padding: '60px 40px',
        textAlign: 'center',
        borderRadius: '12px',
        marginBottom: '40px',
        pageBreakAfter: 'always',
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>📋</div>
        <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
          Manual de Usuario
        </h1>
        <h2 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 20px', opacity: 0.9 }}>
          CRM 2JMC Medios
        </h2>
        <div style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.2)',
          padding: '8px 24px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '1px',
        }}>
          VERSIÓN 1.0 · 2026
        </div>
        <p style={{ marginTop: '24px', fontSize: '14px', opacity: 0.85, maxWidth: '480px', margin: '24px auto 0' }}>
          Guía de funcionamiento por módulo y permisos de roles del sistema de 2JMC Medios.
        </p>
        <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(255,255,255,0.15)', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', color: '#FEF3C7', border: '1px solid #FEF3C7' }}>
          ⚠️ ESTO PUEDE TENER CAMBIOS DENTRO DE POCO.
        </div>
      </div>

      {/* ── ÍNDICE ── */}
      <Section title="Índice de Contenidos" icon="📑">
        <ol style={{ lineHeight: 2, paddingLeft: '20px', color: '#374151' }}>
          <li>Roles del Sistema y Permisos Sencillos</li>
          <li>Confiabilidad y Conexión de Datos</li>
          <li>Dashboard — Vista Principal</li>
          <li>Mi Perfil</li>
          <li>Equipo de Ventas</li>
          <li>Pautas</li>
          <li>Aliados Comerciales</li>
          <li>Actividad Comercial (Visitas y Gastos)</li>
          <li>Pipeline de Ventas</li>
          <li>Clientes</li>
          <li>Reportes</li>
        </ol>
      </Section>

      {/* ── 1. ROLES Y PERMISOS ── */}
      <Section title="1. Roles del Sistema y Permisos" icon="👥" pageBreak>
        <p style={pStyle}>
          El CRM controla de manera estricta y clara qué operaciones puede realizar cada usuario, clasificándolo en un rol que le permite ver o hacer lo indicado a continuación.
        </p>

        <RoleCard rol="Director (Director General)" color="#EA580C" icon="🏆">
          <ul style={ulStyle}>
            <li><strong>Clientes:</strong> Puede agregar, modificar y eliminar clientes. Permisos totales.</li>
            <li><strong>Vendedores:</strong> Puede agregar y eliminar vendedores. En el equipo de ventas, puede ver <em>todos los perfiles</em>.</li>
            <li><strong>Aliados Comerciales:</strong> Puede agregar, eliminar y modificar. Tiene total permiso con los aliados comerciales.</li>
            <li><strong>Visitas y Gastos:</strong> Tiene total permiso, y adicionalmente puede seleccionar a qué vendedor se le adjunta la visita.</li>
            <li><strong>Pipeline:</strong> Tiene total permiso.</li>
            <li><strong>Pautas:</strong> <span style={{ color: '#DC2626', fontWeight: 'bold' }}>Solo puede consultar. No puede agregar pautas.</span></li>
            <li><strong>Dashboard:</strong> Puede ver los datos del dashboard.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Administrador" color="#7C3AED" icon="⚙️">
          <ul style={ulStyle}>
            <li><strong>Clientes:</strong> Puede agregar, eliminar, modificar y consultar.</li>
            <li><strong>Vendedores:</strong> Puede agregar, eliminar, modificar y consultar.</li>
            <li><strong>Aliados Comerciales:</strong> Puede agregar, eliminar, modificar y consultar.</li>
            <li><strong>Visitas y Gastos:</strong> Puede agregar una visita o gasto, modificarlos, eliminarlos y consultarlos.</li>
            <li><strong>Pautas:</strong> Puede agregar una pauta nueva, eliminarla, modificarla y consultarla.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Vendedor" color="#16A34A" icon="📈">
          <ul style={ulStyle}>
            <li><strong>Dashboard:</strong> Puede ver el dashboard global.</li>
            <li><strong>Su Perfil:</strong> Puede consultarlo y modificarlo.</li>
            <li><strong>Otros Perfiles:</strong> Solo puede consultar los perfiles ajenos, <span style={{ color: '#DC2626', fontWeight: 'bold' }}>mas no agregar, modificar o eliminar</span> ninguno de estos.</li>
            <li><strong>Clientes:</strong> Por ahora, solo puede consultar los clientes.</li>
            <li><strong>Pipeline:</strong> Tiene total permiso con el pipeline.</li>
            <li><strong>Aliados Comerciales:</strong> Puede consultarlos y modificarlos.</li>
            <li><strong>Visitas y Gastos:</strong> Tiene total permiso para agregar, modificar y eliminar, <span style={{ color: '#DC2626', fontWeight: 'bold' }}>solo para su usuario</span>, no para un compañero del equipo de ventas. Puede consultar historial de visitas y gastos por clientes.</li>
            <li><strong>Pautas:</strong> Puede agregar pauta nueva, modificar sus datos, eliminar pauta y consultar pautas en general.</li>
          </ul>
        </RoleCard>
      </Section>

      {/* ── 2. CONFIABILIDAD DE DATOS ── */}
      <Section title="2. Confiabilidad y Conexión de Datos" icon="🔗" pageBreak>
        <p style={pStyle}>
          El CRM funciona como un ecosistema conectado. Ningún dato queda al azar, lo que garantiza que todo lo reportado es <strong>100% confiable y rastreable</strong>.
        </p>
        <ul style={ulStyle}>
          <li><strong>Módulos enlazados:</strong> Cualquier pauta requiere la selección previa de un Cliente y de un Aliado Comercial. Esto evita escribir mal los nombres en cada contrato.</li>
          <li><strong>Histórico Real:</strong> Las visitas que carga un vendedor quedan fijadas a él y al cliente visitado. El Director puede trazar y auditar exactamente desde el Pipeline cuándo la visita generó una venta.</li>
          <li><strong>Centralización:</strong> Si el nombre de un aliado (Emisora) se corrige, el sistema actualiza de inmediato reportes y recibos antiguos. Nada se duplica y todo funciona en sincronía total para una tranquilidad absoluta en las métricas.</li>
        </ul>
      </Section>

      {/* ── 3. DASHBOARD ── */}
      <Section title="3. Dashboard — Vista Principal" icon="📊" pageBreak>
        <p style={pStyle}>
          Es el punto de arranque. Brinda resúmenes gráficos a usuarios como el Director y Vendedor para tener un pulso del progreso general e individual ante las metas.
        </p>
      </Section>

      {/* ── 4. MI PERFIL ── */}
      <Section title="4. Mi Perfil" icon="👤" pageBreak>
        <p style={pStyle}>
          Zona de KPI y métricas personales de cada Vendedor, donde pueden actualizar sus datos. Otros roles también tienen su ficha personal aquí para consulta rápida de rendimientos.
        </p>
      </Section>

      {/* ── 5. EQUIPO DE VENTAS ── */}
      <Section title="5. Equipo de Ventas" icon="👥" pageBreak>
        <p style={pStyle}>
          Directorio de la fuerza operativa. Los Directores pueden analizar cada ficha y asignar metas; y Vendedores ven a quién pedir soporte dentro del equipo.
        </p>
      </Section>

      {/* ── 6. PAUTAS ── */}
      <Section title="6. Pautas" icon="📋" pageBreak>
        <p style={pStyle}>
          Aquí se gestionan las campañas publicitarias vendidas. Los Vendedores y Administradores hacen todo el trabajo de registro y estatus, mientras los Directores monitorizan todo con permiso de lectura general.
        </p>
      </Section>

      {/* ── 7. ALIADOS COMERCIALES ── */}
      <Section title="7. Aliados Comerciales" icon="🤝" pageBreak>
        <p style={pStyle}>
          Directorio de las emisoras y espacios que transmiten. Gestionado operativamente por Todos (Vendedores y Administradores) como pilar en la creación de Pautas.
        </p>
      </Section>

      {/* ── 8. ACTIVIDAD COMERCIAL ── */}
      <Section title="8. Actividad Comercial (Visitas y Gastos)" icon="📍" pageBreak>
        <p style={pStyle}>
          Diario de calle vital para que existan evidencias del trabajo al momento de que el Director exija un informe de por qué hay ventas (o faltan). Cada movimiento está anclado a un cliente del directorio para no falsear datos.
        </p>
      </Section>

      {/* ── 9. PIPELINE DE VENTAS ── */}
      <Section title="9. Pipeline de Ventas" icon="🔄" pageBreak>
        <p style={pStyle}>
          Es el corazón progresivo donde un prospecto (idea) pasa gradualmente de "Negociación" hasta hacerse "Cliente" oficial, manteniendo las expectativas de ingresos transparentes para el equipo gerencial.
        </p>
      </Section>

      {/* ── 10. CLIENTES ── */}
      <Section title="10. Clientes" icon="🏢" pageBreak>
        <p style={pStyle}>
          Padrón oficial de entidades que compran. Únicamente Director y Administrador tienen poder de agregarlos o borrarlos, dándole limpieza de datos a la plataforma. Luego todos los vendedores los consumen para hacer Pautas.
        </p>
      </Section>

      {/* ── 11. REPORTES ── */}
      <Section title="11. Reportes" icon="📊" pageBreak>
        <p style={pStyle}>
          Extracción inteligente de todos los módulos anteriores unificados, garantizando una herramienta confiable para auditar mes a mes el desempeño y la salud financiera.
        </p>
      </Section>

      {/* ── PIE DE PÁGINA ── */}
      <div style={{
        marginTop: '48px',
        padding: '24px',
        background: 'linear-gradient(135deg, #F0FAFA, #F5F7FA)',
        borderRadius: '12px',
        borderTop: '3px solid #16B1B8',
        textAlign: 'center',
      }}>
        <p style={{ margin: 0, color: '#6B7280', fontSize: '13px' }}>
          <strong>CRM 2JMC Medios</strong> · Manual de Usuario v1.1
        </p>
        <p style={{ margin: '4px 0 0', color: '#9CA3AF', fontSize: '12px' }}>
          Para soporte técnico, contactar al administrador del sistema.
        </p>
      </div>
    </div>
  );
}

// ── COMPONENTES AUXILIARES ──

const pStyle = { color: '#374151', lineHeight: 1.7, marginBottom: '16px', fontSize: '14px' };
const ulStyle = { lineHeight: 1.9, paddingLeft: '20px', margin: '4px 0', fontSize: '14px', color: '#374151' };

function Section({ title, icon, children, pageBreak }) {
  return (
    <div style={{ marginBottom: '40px', pageBreakBefore: pageBreak ? 'always' : 'auto' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        borderBottom: '2px solid #16B1B8', paddingBottom: '10px', marginBottom: '20px',
      }}>
        <span style={{ fontSize: '22px' }}>{icon}</span>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function RoleCard({ rol, color, icon, children }) {
  return (
    <div style={{
      marginBottom: '16px',
      border: `1px solid ${color}30`,
      borderLeft: `4px solid ${color}`,
      borderRadius: '8px',
      padding: '14px 16px',
      background: `${color}08`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ fontSize: '16px' }}>{icon}</span>
        <strong style={{ color, fontSize: '13px', fontWeight: '700' }}>{rol}</strong>
      </div>
      {children}
    </div>
  );
}

function InfoBox({ color, border, title, children }) {
  return (
    <div style={{
      marginTop: '16px',
      background: color,
      border: `1px solid ${border}`,
      borderRadius: '8px',
      padding: '14px 16px',
    }}>
      <p style={{ margin: '0 0 4px', fontWeight: '700', fontSize: '13px', color: '#1F2937' }}>{title}</p>
      <p style={{ margin: 0, fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>{children}</p>
    </div>
  );
}
