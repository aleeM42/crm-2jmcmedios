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
          Guía completa de funcionamiento por módulo y rol de usuario para el sistema CRM de 2JMC Medios.
        </p>
      </div>

      {/* ── ÍNDICE ── */}
      <Section title="Índice de Contenidos" icon="📑">
        <ol style={{ lineHeight: 2, paddingLeft: '20px', color: '#374151' }}>
          <li>Roles del Sistema</li>
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

      {/* ── 1. ROLES ── */}
      <Section title="1. Roles del Sistema" icon="👥" pageBreak>
        <p style={pStyle}>
          El CRM 2JMC Medios usa un sistema de control de acceso basado en roles (RBAC). Cada usuario tiene
          un único rol que determina qué módulos puede ver y qué acciones puede realizar.
        </p>

        <div style={{ overflowX: 'auto', marginTop: '20px' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <Th>Rol</Th>
                <Th>Dashboard al Login</Th>
                <Th>Nivel de Acceso</Th>
              </tr>
            </thead>
            <tbody>
              <Tr color="#FFF7ED">
                <Td><Badge color="#EA580C">Director General</Badge></Td>
                <Td>Resumen global de todos los módulos</Td>
                <Td>Lectura, Escritura, Borrado y Auditoría de <strong>todo</strong></Td>
              </Tr>
              <Tr>
                <Td><Badge color="#7C3AED">Administrador</Badge></Td>
                <Td>Vista Equipo de Ventas / Dashboard resumen</Td>
                <Td>CRUD de Clientes, Vendedores, Pautas y Aliados</Td>
              </Tr>
              <Tr color="#F0FDF4">
                <Td><Badge color="#16A34A">Vendedor</Badge></Td>
                <Td>Vista "Mi Perfil" (KPIs propios)</Td>
                <Td>Gestión exclusiva de <em>su</em> cartera, visitas, gastos y pipeline</Td>
              </Tr>
              <Tr>
                <Td><Badge color="#0284C7">Pauta</Badge></Td>
                <Td>Vista de Pautas directas</Td>
                <Td>CRUD completo exclusivo del módulo Pautas</Td>
              </Tr>
              <Tr color="#F8FAFC">
                <Td><Badge color="#64748B">Invitado</Badge></Td>
                <Td>Dashboard Resumen</Td>
                <Td>Solo lectura global (sin modificaciones)</Td>
              </Tr>
            </tbody>
          </table>
        </div>

        <InfoBox color="#EFF6FF" border="#BFDBFE" title="💡 Importante">
          Los permisos son gestionados automáticamente por el sistema. Si intentas acceder a una sección
          sin los permisos necesarios, serás redirigido al login o recibirás un mensaje de acceso denegado.
        </InfoBox>
      </Section>

      {/* ── 2. DASHBOARD ── */}
      <Section title="2. Dashboard — Vista Principal" icon="📊" pageBreak>
        <p style={pStyle}>
          El Dashboard es la pantalla de inicio después del login. Su contenido varía según el rol del usuario autenticado.
        </p>

        <RoleCard rol="Director General" color="#EA580C" icon="🏆">
          <ul style={ulStyle}>
            <li>Resumen global de <strong>todos los módulos</strong>: pautas activas, clientes totales, visitas del mes, ingresos.</li>
            <li>KPIs del equipo completo de ventas.</li>
            <li>Acceso a métricas de auditoría y comparativos históricos.</li>
            <li>Gráficas de rendimiento por vendedor, región y categoría.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Administrador" color="#7C3AED" icon="⚙️">
          <ul style={ulStyle}>
            <li>Vista de Equipo de Ventas con métricas de cada miembro.</li>
            <li>Resumen de pautas recientes y clientes activos.</li>
            <li>Acceso rápido a agregar vendedores, clientes o pautas.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Vendedor" color="#16A34A" icon="📈">
          <ul style={ulStyle}>
            <li>Redirigido automáticamente a <strong>"Mi Perfil"</strong> con sus KPIs propios.</li>
            <li>Muestra: meta mensual, clientes activos, visitas realizadas y pipeline propio.</li>
            <li>No ve datos de otros vendedores.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Pauta (Usuario Pautas)" color="#0284C7" icon="📋">
          <ul style={ulStyle}>
            <li>Al ingresar, va directamente al módulo de <strong>Pautas</strong>.</li>
            <li>Ve únicamente la lista, kanban y calendario de pautas.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Invitado" color="#64748B" icon="👁️">
          <ul style={ulStyle}>
            <li>Dashboard Resumen en modo <strong>solo lectura</strong>.</li>
            <li>Puede navegar módulos pero sin capacidad de crear, editar ni eliminar.</li>
          </ul>
        </RoleCard>
      </Section>

      {/* ── 3. MI PERFIL ── */}
      <Section title="3. Mi Perfil" icon="👤" pageBreak>
        <p style={pStyle}>
          El módulo Mi Perfil ofrece una vista personalizada con los indicadores de desempeño (KPIs)
          del usuario autenticado. Está disponible principalmente para vendedores.
        </p>

        <RoleCard rol="Vendedor" color="#16A34A" icon="📈">
          <ul style={ulStyle}>
            <li><strong>Meta Mensual:</strong> Progreso hacia la meta de ventas asignada.</li>
            <li><strong>Mis Clientes:</strong> Número de clientes en su cartera activa.</li>
            <li><strong>Visitas del Mes:</strong> Total de visitas registradas y cuántas fueron efectivas.</li>
            <li><strong>Pipeline:</strong> Leads en cada etapa (Prospecto → En Negociación → Negociado).</li>
            <li><strong>Gastos:</strong> Resumen de gastos comerciales propios.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Director General / Administrador" color="#EA580C" icon="🔍">
          <ul style={ulStyle}>
            <li>Pueden visualizar perfiles de cualquier vendedor desde el módulo Equipo de Ventas.</li>
            <li>Su propia sección Mi Perfil muestra información administrativa general.</li>
          </ul>
        </RoleCard>

        <InfoBox color="#F0FDF4" border="#86EFAC" title="✅ Funciones disponibles en Mi Perfil">
          Editar datos personales (nombre, correo de contacto), visualizar histórico de actividad propia
          y exportar resumen de rendimiento.
        </InfoBox>
      </Section>

      {/* ── 4. EQUIPO DE VENTAS ── */}
      <Section title="4. Equipo de Ventas" icon="👥" pageBreak>
        <p style={pStyle}>
          Este módulo lista a todos los vendedores registrados y permite gestionar el equipo comercial.
        </p>

        <RoleCard rol="Director General" color="#EA580C" icon="🏆">
          <ul style={ulStyle}>
            <li>Ve y gestiona a <strong>todos</strong> los vendedores.</li>
            <li>Puede agregar, editar, desactivar y eliminar vendedores.</li>
            <li>Accede al detalle de cada vendedor con su historial completo.</li>
            <li>Puede auditar actividad y modificar metas mensuales.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Administrador" color="#7C3AED" icon="⚙️">
          <ul style={ulStyle}>
            <li>CRUD completo de vendedores.</li>
            <li>Agregar nuevo vendedor: nombre, apellido, email, teléfono y meta mensual.</li>
            <li>Ver detalle de cada vendedor con sus KPIs y clientes asociados.</li>
            <li>No puede eliminar al Director General.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Vendedor" color="#16A34A" icon="📈">
          <ul style={ulStyle}>
            <li>Acceso de <strong>solo lectura</strong> al directorio del equipo.</li>
            <li>No puede ver los clientes ni detalles financieros de sus colegas.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Pauta / Invitado" color="#64748B" icon="🚫">
          <ul style={ulStyle}>
            <li><strong>Sin acceso</strong> a este módulo. No aparece en su sidebar.</li>
          </ul>
        </RoleCard>

        <SubSection title="Cómo agregar un Vendedor">
          <ol style={{ ...ulStyle, listStyleType: 'decimal', paddingLeft: '24px' }}>
            <li>Ir a <code>Equipo de Ventas → Agregar Vendedor</code>.</li>
            <li>Completar: Nombres, Apellidos, Cédula, Correo, Contraseña, Teléfonos y Meta Mensual.</li>
            <li>Seleccionar los códigos de área de los teléfonos (0412, 0414, etc.).</li>
            <li>El sistema valida que el correo sea único y el teléfono tenga 7 dígitos.</li>
            <li>Presionar <strong>"Registrar Vendedor"</strong>.</li>
          </ol>
        </SubSection>
      </Section>

      {/* ── 5. PAUTAS ── */}
      <Section title="5. Pautas" icon="📋" pageBreak>
        <p style={pStyle}>
          El módulo de Pautas gestiona las órdenes de transmisión (OT) de medios publicitarios.
          Ofrece tres vistas: Lista, Kanban y Calendario.
        </p>

        <RoleCard rol="Director General" color="#EA580C" icon="🏆">
          <ul style={ulStyle}>
            <li>Acceso total: crear, editar, cancelar y eliminar cualquier pauta.</li>
            <li>Ve pautas de todos los clientes y vendedores.</li>
            <li>Puede auditar cambios de estado e histórico de modificaciones.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Administrador / Usuario Pauta" color="#0284C7" icon="⚙️">
          <ul style={ulStyle}>
            <li><strong>CRUD completo</strong> de pautas.</li>
            <li>Crear pauta: número OT, cliente, vendedor asignado, marca, aliados (emisoras), tipo de compra, fechas y monto.</li>
            <li>Estados disponibles: <em>Programada → En Transmisión → Finalizada → Cancelada</em>.</li>
            <li>Vista Kanban: arrastrar pautas entre columnas de estado.</li>
            <li>Vista Calendario: visualizar pautas por fecha de transmisión.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Vendedor" color="#16A34A" icon="👁️">
          <ul style={ulStyle}>
            <li>Modo <strong>Catálogo (solo lectura)</strong>.</li>
            <li>Puede ver las pautas asociadas a sus clientes.</li>
            <li>No puede crear, modificar ni cancelar pautas.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Invitado" color="#64748B" icon="👁️">
          <ul style={ulStyle}>
            <li>Solo lectura global de todas las pautas.</li>
            <li>No puede realizar ninguna acción de escritura.</li>
          </ul>
        </RoleCard>

        <SubSection title="Estados de una Pauta">
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
            <StatusBadge label="Programada" color="#16B1B8" />
            <StatusBadge label="En Transmisión" color="#8DC63F" />
            <StatusBadge label="Finalizada" color="#64748B" />
            <StatusBadge label="Cancelada" color="#EF4444" />
          </div>
        </SubSection>
      </Section>

      {/* ── 6. ALIADOS COMERCIALES ── */}
      <Section title="6. Aliados Comerciales" icon="🤝" pageBreak>
        <p style={pStyle}>
          Los Aliados Comerciales son las emisoras de radio y medios asociados que transmiten las pautas.
          Este módulo gestiona el directorio de emisoras y sus contactos.
        </p>

        <RoleCard rol="Director General" color="#EA580C" icon="🏆">
          <ul style={ulStyle}>
            <li>CRUD completo: agregar, editar y eliminar aliados.</li>
            <li>Ver historial de pautas transmitidas por cada emisora.</li>
            <li>Auditar modificaciones al directorio.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Administrador" color="#7C3AED" icon="⚙️">
          <ul style={ulStyle}>
            <li>CRUD completo de aliados comerciales.</li>
            <li>Agregar aliado: razón social, nombre de emisora, categoría, RIF, fecha de nacimiento de la empresa y contactos.</li>
            <li>Validación estricta de RIF en formato venezolano (J/V/G-XXXXXXXX-X).</li>
            <li>Gestión de contactos de la emisora (nombre, correo, teléfonos).</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Vendedor / Pauta / Invitado" color="#64748B" icon="👁️">
          <ul style={ulStyle}>
            <li>Modo <strong>Catálogo (solo lectura)</strong>.</li>
            <li>Pueden consultar el directorio de emisoras y sus detalles.</li>
            <li>No pueden agregar, editar ni eliminar aliados.</li>
          </ul>
        </RoleCard>

        <SubSection title="Cómo agregar un Aliado Comercial">
          <ol style={{ ...ulStyle, listStyleType: 'decimal', paddingLeft: '24px' }}>
            <li>Ir a <code>Aliados Comerciales → Agregar Aliado</code>.</li>
            <li>Completar datos de la empresa: Razón Social, Nombre Emisora, Categoría, RIF.</li>
            <li>El RIF debe tener formato: <code>J-12345678-9</code> (auto-formateado al escribir).</li>
            <li>Agregar al menos un contacto con nombre, apellido, correo y teléfono.</li>
            <li>Presionar <strong>"Registrar Aliado"</strong>.</li>
          </ol>
        </SubSection>
      </Section>

      {/* ── 7. ACTIVIDAD COMERCIAL ── */}
      <Section title="7. Actividad Comercial" icon="📍" pageBreak>
        <p style={pStyle}>
          Este módulo registra las visitas comerciales realizadas a clientes y los gastos asociados
          a esas actividades (transporte, entretenimiento, etc.).
        </p>

        <RoleCard rol="Director General" color="#EA580C" icon="🏆">
          <ul style={ulStyle}>
            <li>Ve <strong>todas las visitas</strong> de todos los vendedores.</li>
            <li>Visualiza el historial de gastos del equipo completo.</li>
            <li>Puede auditar y eliminar registros de cualquier vendedor.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Administrador" color="#7C3AED" icon="⚙️">
          <ul style={ulStyle}>
            <li>Ve todas las visitas y gastos registrados.</li>
            <li>No puede registrar visitas propias (no tiene cartera de clientes).</li>
            <li>Puede editar o eliminar cualquier registro.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Vendedor" color="#16A34A" icon="📈">
          <ul style={ulStyle}>
            <li><strong>Solo ve y gestiona sus propias visitas y gastos.</strong></li>
            <li>Registrar visita: cliente visitado, lugar, fecha, observaciones y si fue efectiva.</li>
            <li>Registrar gasto: concepto, monto, fecha y visita asociada.</li>
            <li>No puede ver la actividad de otros vendedores.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Pauta / Invitado" color="#64748B" icon="👁️">
          <ul style={ulStyle}>
            <li>El módulo aparece en solo lectura (si tienen acceso configurado).</li>
            <li>No pueden registrar visitas ni gastos.</li>
          </ul>
        </RoleCard>

        <SubSection title="Cómo registrar una Visita">
          <ol style={{ ...ulStyle, listStyleType: 'decimal', paddingLeft: '24px' }}>
            <li>Ir a <code>Actividad Comercial → Registrar Visita</code>.</li>
            <li>Seleccionar el cliente de su cartera personal.</li>
            <li>Indicar el lugar (oficina, local, etc.).</li>
            <li>Indicar fecha y hora de la visita.</li>
            <li>Marcar si la visita fue <strong>efectiva</strong> (logró su objetivo).</li>
            <li>Agregar observaciones relevantes.</li>
          </ol>
        </SubSection>
      </Section>

      {/* ── 8. PIPELINE ── */}
      <Section title="8. Pipeline de Ventas" icon="🔄" pageBreak>
        <p style={pStyle}>
          El Pipeline visualiza el proceso de prospección comercial en tres etapas progresivas.
          Permite darle seguimiento a cada lead desde el primer contacto hasta el cierre.
        </p>

        <div style={{
          display: 'flex',
          gap: '12px',
          margin: '20px 0',
          flexWrap: 'wrap',
        }}>
          <PipelineStage label="Prospecto" color="#16B1B8" desc="Contacto inicial identificado como potencial cliente." />
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', color: '#94A3B8' }}>→</div>
          <PipelineStage label="En Negociación" color="#F59E0B" desc="Se inició conversación activa y cotización." />
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', color: '#94A3B8' }}>→</div>
          <PipelineStage label="Negociado" color="#10B981" desc="Acuerdo cerrado. Se genera cliente final." />
        </div>

        <RoleCard rol="Director General" color="#EA580C" icon="🏆">
          <ul style={ulStyle}>
            <li>Ve el pipeline completo de todo el equipo de ventas.</li>
            <li>Puede mover cualquier lead entre etapas.</li>
            <li>Accede a estadísticas globales de conversión.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Administrador" color="#7C3AED" icon="⚙️">
          <ul style={ulStyle}>
            <li>Visualiza el pipeline global del equipo.</li>
            <li>Puede gestionar y reasignar leads.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Vendedor" color="#16A34A" icon="📈">
          <ul style={ulStyle}>
            <li>Solo ve y gestiona <strong>sus propios leads</strong>.</li>
            <li>Puede agregar un nuevo lead y moverlo entre las 3 etapas.</li>
            <li>Al pasar un lead a estado <strong>"Negociado"</strong>, el sistema lo redirige
            automáticamente al formulario de <em>Agregar Cliente</em> para formalizar el ingreso.</li>
          </ul>
        </RoleCard>

        <InfoBox color="#FEF3C7" border="#FCD34D" title="⚠️ Flujo importante para Vendedores">
          Cuando un lead en "En Negociación" pasa a "Negociado", serás redirigido automáticamente
          para completar el registro formal del cliente. Asegúrate de tener todos los datos
          (RIF, razón social, contacto) antes de hacer este movimiento.
        </InfoBox>
      </Section>

      {/* ── 9. CLIENTES ── */}
      <Section title="9. Clientes" icon="🏢" pageBreak>
        <p style={pStyle}>
          El módulo de Clientes gestiona el directorio comercial de empresas y personas que contratan
          servicios publicitarios. Incluye datos de la empresa, contactos y sub-empresas asociadas.
        </p>

        <RoleCard rol="Director General" color="#EA580C" icon="🏆">
          <ul style={ulStyle}>
            <li>CRUD completo de <strong>todos</strong> los clientes del sistema.</li>
            <li>Ve la cartera de cada vendedor.</li>
            <li>Puede reasignar clientes entre vendedores.</li>
            <li>Accede al historial completo de negociaciones y pautas por cliente.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Administrador" color="#7C3AED" icon="⚙️">
          <ul style={ulStyle}>
            <li>CRUD completo: agregar, editar, ver y eliminar clientes.</li>
            <li>Puede asignar un cliente a cualquier vendedor.</li>
            <li>Ve el directorio global de clientes.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Vendedor" color="#16A34A" icon="📈">
          <ul style={ulStyle}>
            <li>Solo ve y gestiona <strong>su cartera personal</strong> de clientes.</li>
            <li>Puede agregar nuevos clientes (quedan asignados automáticamente a él).</li>
            <li>Puede modificar datos de sus clientes, pero <strong>no puede eliminarlos</strong>.</li>
            <li>Ve la última interacción con cada cliente de su cartera.</li>
            <li>No puede ver los clientes de otros vendedores.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Pauta / Invitado" color="#64748B" icon="👁️">
          <ul style={ulStyle}>
            <li>Solo lectura del directorio de clientes.</li>
            <li>No pueden crear ni modificar registros.</li>
          </ul>
        </RoleCard>

        <SubSection title="Datos requeridos para registrar un Cliente">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
            <DataField label="Nombre Comercial" desc="Nombre con el que opera el negocio." />
            <DataField label="Razón Social" desc="Nombre legal de la empresa." />
            <DataField label="RIF Fiscal" desc="Formato: J-XXXXXXXX-X (Venezuela)" />
            <DataField label="Clasificación" desc="Agencia / Cliente Directo" />
            <DataField label="Nombre de Agencia" desc="Si aplica (cuando es agencia)." />
            <DataField label="Contacto Principal" desc="Nombre, correo y teléfono." />
          </div>
        </SubSection>
      </Section>

      {/* ── 10. REPORTES ── */}
      <Section title="10. Reportes" icon="📊" pageBreak>
        <p style={pStyle}>
          El módulo de Reportes ofrece una galería de informes preconstruidos para analizar el
          desempeño comercial desde múltiples perspectivas.
        </p>

        <RoleCard rol="Director General" color="#EA580C" icon="🏆">
          <ul style={ulStyle}>
            <li>Acceso a <strong>todos</strong> los reportes disponibles.</li>
            <li>Puede ver datos disagregados por vendedor, región y período.</li>
            <li>Reportes de auditoría y gastos del equipo completo.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Administrador" color="#7C3AED" icon="⚙️">
          <ul style={ulStyle}>
            <li>Acceso a todos los reportes operativos.</li>
            <li>Puede filtrar por fechas, vendedores y categorías.</li>
          </ul>
        </RoleCard>

        <RoleCard rol="Vendedor" color="#16A34A" icon="📈">
          <ul style={ulStyle}>
            <li>Reportes filtrados a <strong>sus propios datos</strong>.</li>
            <li>No ve información financiera del resto del equipo.</li>
          </ul>
        </RoleCard>

        <SubSection title="Reportes Disponibles">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '12px' }}>
            <ReporteItem icon="🏆" label="Ranking Clientes por Pautas" />
            <ReporteItem icon="🏭" label="Clientes por Sector" />
            <ReporteItem icon="🗺️" label="Distribución por Región" />
            <ReporteItem icon="💰" label="Ingresos Mensuales" />
            <ReporteItem icon="📋" label="Pautas con Filtros" />
            <ReporteItem icon="💳" label="Gastos por Cliente" />
            <ReporteItem icon="⭐" label="Efectividad de Vendedores" />
            <ReporteItem icon="📻" label="Top Emisoras por Cuñas" />
            <ReporteItem icon="🗺️" label="Emisoras por Región" />
            <ReporteItem icon="🏷️" label="Marcas por Región" />
            <ReporteItem icon="🤝" label="Clientes por Emisora" />
            <ReporteItem icon="📡" label="Emisoras Activas por Región" />
          </div>
        </SubSection>
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
          <strong>CRM 2JMC Medios</strong> · Manual de Usuario v1.0
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
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '13px',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
};

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

function SubSection({ title, children }) {
  return (
    <div style={{ marginTop: '20px', background: '#F8FAFC', borderRadius: '8px', padding: '16px 20px' }}>
      <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700', color: '#1F2937', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
        {title}
      </h4>
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

function Th({ children }) {
  return (
    <th style={{
      background: '#16B1B8', color: 'white', padding: '10px 14px',
      textAlign: 'left', fontWeight: '700', fontSize: '12px', letterSpacing: '0.5px',
    }}>
      {children}
    </th>
  );
}

function Tr({ children, color }) {
  return (
    <tr style={{ background: color || 'white' }}>
      {children}
    </tr>
  );
}

function Td({ children }) {
  return (
    <td style={{ padding: '10px 14px', borderBottom: '1px solid #E2E8F0', fontSize: '13px' }}>
      {children}
    </td>
  );
}

function Badge({ children, color }) {
  return (
    <span style={{
      display: 'inline-block',
      background: `${color}15`,
      color,
      border: `1px solid ${color}40`,
      padding: '2px 10px',
      borderRadius: '20px',
      fontWeight: '700',
      fontSize: '12px',
    }}>
      {children}
    </span>
  );
}

function StatusBadge({ label, color }) {
  return (
    <span style={{
      background: `${color}15`,
      color,
      border: `1px solid ${color}40`,
      padding: '4px 12px',
      borderRadius: '20px',
      fontWeight: '600',
      fontSize: '12px',
    }}>
      {label}
    </span>
  );
}

function PipelineStage({ label, color, desc }) {
  return (
    <div style={{
      flex: 1,
      minWidth: '140px',
      background: `${color}10`,
      border: `2px solid ${color}40`,
      borderRadius: '10px',
      padding: '16px',
      textAlign: 'center',
    }}>
      <div style={{ fontWeight: '700', color, fontSize: '14px', marginBottom: '6px' }}>{label}</div>
      <div style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.5 }}>{desc}</div>
    </div>
  );
}

function DataField({ label, desc }) {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      padding: '12px',
    }}>
      <div style={{ fontWeight: '700', fontSize: '12px', color: '#16B1B8', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '12px', color: '#6B7280' }}>{desc}</div>
    </div>
  );
}

function ReporteItem({ icon, label }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      padding: '10px 12px',
      fontSize: '13px',
      color: '#374151',
    }}>
      <span style={{ fontSize: '16px' }}>{icon}</span>
      {label}
    </div>
  );
}
