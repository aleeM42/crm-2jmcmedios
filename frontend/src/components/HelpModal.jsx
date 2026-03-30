// ==============================================
// HelpModal.jsx — Modal fullscreen del Manual de Usuario
// ==============================================
import { useEffect, useRef } from 'react';
import ManualContenido from './ManualContenido';

// ── Abre una ventana nueva con el contenido del manual y lanza la impresión ──
function printManual(contentNode) {
  const manualHTML = contentNode ? contentNode.innerHTML : '<p>Error al cargar el contenido.</p>';

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Manual de Usuario — CRM 2JMC Medios</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: 'Montserrat', 'Inter', Arial, sans-serif;
      font-size: 12pt;
      color: #1F2937;
      background: white;
      padding: 24px 40px;
      line-height: 1.6;
    }
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    @media print {
      body { padding: 0; }
      @page { margin: 14mm 12mm; size: A4 portrait; }
    }
  </style>
</head>
<body>
  ${manualHTML}
  <script>
    // Esperar a que las fuentes y estilos carguen antes de imprimir
    window.addEventListener('load', function () {
      setTimeout(function () {
        window.print();
        // Cerrar la ventana tras imprimir (funciona en la mayoría de navegadores)
        window.addEventListener('afterprint', function () { window.close(); });
      }, 600);
    });
  <\/script>
</body>
</html>`;

  const win = window.open('', '_blank', 'width=900,height=700');
  if (!win) {
    alert(
      'Tu navegador bloqueó la ventana emergente.\n\n' +
      'Permite las ventanas emergentes para este sitio e inténtalo de nuevo.'
    );
    return;
  }
  win.document.open();
  win.document.write(html);
  win.document.close();
}

export default function HelpModal({ onClose }) {
  // Referencia al div que ya contiene el ManualContenido renderizado
  const contentRef = useRef(null);

  // Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handlePrint = () => {
    printManual(contentRef.current);
  };

  return (
    <>
      {/* ── Overlay ── */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 9998,
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* ── Panel Modal ── */}
      <div style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(860px, calc(100vw - 48px))',
        height: 'calc(100vh - 48px)',
        background: 'white',
        borderRadius: '16px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        animation: 'slideUp 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      }}>

        {/* ── Header ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 28px',
          borderBottom: '1px solid #E2E8F0',
          background: 'linear-gradient(135deg, #16B1B8, #0e8a90)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>📋</span>
            <div>
              <h2 style={{ margin: 0, color: 'white', fontSize: '18px', fontWeight: '800' }}>
                Manual de Usuario
              </h2>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: '12px' }}>
                CRM 2JMC Medios · Guía de Módulos por Rol
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Botón Exportar PDF */}
            <button
              onClick={handlePrint}
              title="Exportar como PDF"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                fontFamily: 'inherit',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>print</span>
              Exportar PDF
            </button>

            {/* Botón Cerrar */}
            <button
              onClick={onClose}
              title="Cerrar (Esc)"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '36px', height: '36px',
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.5)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
            </button>
          </div>
        </div>

        {/* ── Cuerpo Scrollable — ref apunta aquí para capturar el HTML ── */}
        <div
          ref={contentRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '32px 40px',
            background: '#FAFAFA',
          }}
        >
          <ManualContenido />
        </div>

        {/* ── Footer ── */}
        <div style={{
          padding: '12px 28px',
          borderTop: '1px solid #E2E8F0',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
            Presiona{' '}
            <kbd style={{
              background: '#F1F5F9', border: '1px solid #CBD5E1',
              borderRadius: '4px', padding: '1px 6px', fontFamily: 'monospace', fontSize: '11px',
            }}>Esc</kbd>{' '}
            para cerrar
          </span>
          <button
            onClick={handlePrint}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '7px 16px',
              background: '#16B1B8',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: 'inherit',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#0e8a90'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#16B1B8'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>download</span>
            Descargar como PDF
          </button>
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(20px); opacity: 0 }
          to   { transform: translateX(-50%) translateY(0);    opacity: 1 }
        }
      `}</style>
    </>
  );
}
