// ==============================================
// services/ExportService.js — Utilidad de Exportación PDF + Excel
// ==============================================
import ExcelJS from 'exceljs';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// ── Constantes ─────────────────────────────────────────────────────────────────
const PRIMARY_HEX  = '16B1B8';
const LOGO_PATH    = '/Vortice-01.png';
const COMPANY_NAME = '2JMC Medios';

/**
 * Obtiene datos del usuario logueado desde localStorage.
 */
function getUsuario() {
  try {
    const raw = localStorage.getItem('crm_user');
    if (!raw) return 'Usuario';
    const u = JSON.parse(raw);
    return `${u.nombre ?? ''} ${u.apellido ?? ''}`.trim() || 'Usuario';
  } catch { return 'Usuario'; }
}

/**
 * Convierte un ArrayBuffer/Blob en data-URL base64 para jsPDF.
 */
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror   = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Pre-carga el logo como base64 (se cachea en la primera llamada).
 */
let _logoCache = null; // { dataUrl, w, h } — dimensiones naturales en px
async function loadLogo() {
  if (_logoCache) return _logoCache;
  try {
    const resp = await fetch(LOGO_PATH);
    if (!resp.ok) return null;
    const blob    = await resp.blob();
    const dataUrl = await blobToBase64(blob);
    // Obtener dimensiones naturales para calcular relación de aspecto
    const dims = await new Promise((resolve) => {
      const img = new Image();
      img.onload  = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
      img.onerror = () => resolve({ w: 100, h: 35 }); // fallback
      img.src = dataUrl;
    });
    _logoCache = { dataUrl, ...dims };
    return _logoCache;
  } catch {
    return null;
  }
}

// ══════════════════════════════════════════════════════════════════════════════
//  EXCEL
// ══════════════════════════════════════════════════════════════════════════════
/**
 * Genera y descarga un archivo Excel con estilo corporativo.
 *
 * @param {Object} opts
 * @param {string}              opts.reportName   — Nombre del reporte
 * @param {string[]}            opts.columns      — Nombres visibles de columnas
 * @param {Object[]}            opts.rows         — Array de objetos planos con los datos
 * @param {Object}              [opts.columnTypes] — Map columna→tipo ('currency'|'number'|'date'|'string')
 * @param {string}              [opts.sheetName]  — Nombre de la hoja (default: 'Reporte')
 * @param {(p:number)=>void}    [opts.onProgress] — Callback 0-100
 */
export async function exportToExcel({
  reportName,
  columns,
  rows,
  columnTypes = {},
  sheetName   = 'Reporte',
  onProgress,
}) {
  if (!rows || rows.length === 0) throw new Error('No hay datos para exportar.');
  onProgress?.(5);

  const wb = new ExcelJS.Workbook();
  wb.creator  = getUsuario();
  wb.created  = new Date();
  wb.modified = new Date();

  // ── Hoja principal ──────────────────────────────────────────────────────────
  const ws = wb.addWorksheet(sheetName, {
    views: [{ state: 'frozen', ySplit: 3 }],   // Freeze top rows (meta + header)
  });
  onProgress?.(15);

  // ── Metadatos (fila 1 y 2) ──────────────────────────────────────────────────
  ws.mergeCells(1, 1, 1, columns.length);
  const titleCell        = ws.getCell('A1');
  titleCell.value        = reportName;
  titleCell.font         = { bold: true, size: 14, color: { argb: `FF${PRIMARY_HEX}` } };
  titleCell.alignment    = { vertical: 'middle' };

  ws.mergeCells(2, 1, 2, columns.length);
  const metaCell         = ws.getCell('A2');
  const fechaStr         = new Date().toLocaleDateString('es-VE', { dateStyle: 'full' });
  metaCell.value         = `Generado por: ${getUsuario()}  •  Fecha: ${fechaStr}`;
  metaCell.font          = { italic: true, size: 9, color: { argb: 'FF6B7280' } };
  metaCell.alignment     = { vertical: 'middle' };

  ws.getRow(1).height = 28;
  ws.getRow(2).height = 20;

  // ── Fila de encabezado (fila 3) ─────────────────────────────────────────────
  const headerRow = ws.getRow(3);
  columns.forEach((col, i) => {
    const cell          = headerRow.getCell(i + 1);
    cell.value          = col;
    cell.font           = { bold: true, size: 10, color: { argb: 'FFFFFFFF' } };
    cell.fill           = { type: 'pattern', pattern: 'solid', fgColor: { argb: `FF${PRIMARY_HEX}` } };
    cell.alignment      = { horizontal: 'center', vertical: 'middle' };
    cell.border         = { bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } } };
  });
  headerRow.height = 22;
  onProgress?.(30);

  // ── Filas de datos ──────────────────────────────────────────────────────────
  const totalRows = rows.length;
  rows.forEach((row, ri) => {
    const dataRow = ws.getRow(ri + 4); // empezamos en fila 4
    columns.forEach((col, ci) => {
      const cell = dataRow.getCell(ci + 1);
      const raw  = row[col] ?? '';
      const type = columnTypes[col] ?? 'string';

      switch (type) {
        case 'currency':
          cell.value      = typeof raw === 'number' ? raw : parseFloat(raw) || 0;
          cell.numFmt     = '"$"#,##0.00';
          cell.alignment  = { horizontal: 'right' };
          break;
        case 'number':
          cell.value      = typeof raw === 'number' ? raw : parseInt(raw, 10) || 0;
          cell.alignment  = { horizontal: 'center' };
          break;
        case 'date':
          cell.value      = raw instanceof Date ? raw : new Date(raw);
          cell.numFmt     = 'dd/mm/yyyy';
          cell.alignment  = { horizontal: 'center' };
          break;
        default:
          cell.value      = String(raw);
          cell.alignment  = { horizontal: 'left', vertical: 'middle' };
      }
      cell.font = { size: 10 };
    });

    // Progreso: 30-80 proporcional a filas escritas
    if (ri % 50 === 0 || ri === totalRows - 1) {
      onProgress?.(30 + Math.round((ri / totalRows) * 50));
    }
  });

  // ── Auto-filtros ────────────────────────────────────────────────────────────
  ws.autoFilter = {
    from: { row: 3, column: 1 },
    to:   { row: 3 + totalRows, column: columns.length },
  };

  // ── Auto-width ──────────────────────────────────────────────────────────────
  ws.columns.forEach((col, i) => {
    let maxLen = String(columns[i]).length;
    rows.forEach(row => {
      const cellVal = String(row[columns[i]] ?? '');
      if (cellVal.length > maxLen) maxLen = cellVal.length;
    });
    col.width = Math.min(maxLen + 4, 40);
  });
  onProgress?.(85);

  // ── Generar y descargar ─────────────────────────────────────────────────────
  const buffer = await wb.xlsx.writeBuffer();
  const blob   = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url    = URL.createObjectURL(blob);

  const a      = document.createElement('a');
  a.href       = url;
  a.download   = `${reportName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.xlsx`;
  a.click();
  URL.revokeObjectURL(url);
  onProgress?.(100);
}

// ══════════════════════════════════════════════════════════════════════════════
//  PDF
// ══════════════════════════════════════════════════════════════════════════════
/**
 * Genera y descarga un PDF con encabezado corporativo, captura del gráfico y tabla.
 *
 * @param {Object} opts
 * @param {string}              opts.reportName       — Nombre del reporte
 * @param {HTMLElement|null}    opts.chartElement      — Ref al DOM del gráfico (se captura con html2canvas)
 * @param {string[]}            opts.columns          — Nombres visibles de columnas de la tabla
 * @param {Object[]}            opts.rows             — Array de objetos planos con los datos de la tabla
 * @param {Object}              [opts.columnTypes]    — Map columna→tipo ('currency'|'number'|'date'|'string')
 * @param {string}              [opts.subtitle]       — Texto debajo del título (ej: "Enero 2026")
 * @param {(p:number)=>void}    [opts.onProgress]     — Callback 0-100
 */
export async function exportToPDF({
  reportName,
  chartElement,
  columns,
  rows,
  columnTypes = {},
  subtitle    = '',
  onProgress,
}) {
  if (!rows || rows.length === 0) throw new Error('No hay datos para exportar.');
  onProgress?.(5);

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const W   = doc.internal.pageSize.getWidth();
  const H   = doc.internal.pageSize.getHeight();
  const MX  = 14;   // margen X
  const MT  = 14;   // margen Top
  let   y   = MT;

  const totalPages = { count: 1 };

  // ── Helpers internos ────────────────────────────────────────────────────────
  function drawHeader(pageDoc) {
    // Línea de color
    pageDoc.setDrawColor(22, 177, 184);
    pageDoc.setLineWidth(1.2);
    pageDoc.line(MX, 10, W - MX, 10);

    // ── Logo (derecha): debajo de la línea, max 50px ───────────────────────
    if (logo) {
      try {
        const MAX_H_MM = 13.23; // 50px @ 96dpi → mm  (50 / 96 * 25.4)
        const logoH    = MAX_H_MM;
        const logoW    = logoH * (logo.w / logo.h);
        pageDoc.addImage(logo.dataUrl, 'PNG', W - MX - logoW, 11, logoW, logoH);
      } catch { /* sin logo */ }
    }

    // ── Título (izquierda) ──────────────────────────────────────────────────
    pageDoc.setFont('helvetica', 'bold');
    pageDoc.setFontSize(14);
    pageDoc.setTextColor(31, 41, 55);
    pageDoc.text(reportName, MX, 18);

    if (subtitle) {
      pageDoc.setFont('helvetica', 'normal');
      pageDoc.setFontSize(9);
      pageDoc.setTextColor(107, 114, 128);
      pageDoc.text(subtitle, MX, 23);
    }

    // ── Fecha y usuario (debajo del logo, derecha) ──────────────────────────
    const fechaStr = new Date().toLocaleDateString('es-VE', { dateStyle: 'long' });
    const usuario  = getUsuario();
    pageDoc.setFont('helvetica', 'normal');
    pageDoc.setFontSize(8);
    pageDoc.setTextColor(107, 114, 128);
    pageDoc.text(`${usuario}  •  ${fechaStr}`, W - MX, 26.5, { align: 'right' });
  }

  function drawFooter(pageDoc, pageNum) {
    pageDoc.setFont('helvetica', 'normal');
    pageDoc.setFontSize(8);
    pageDoc.setTextColor(150, 150, 150);
    pageDoc.text(`${COMPANY_NAME}`, MX, H - 6);
    pageDoc.text(`Página ${pageNum}`, W - MX, H - 6, { align: 'right' });
  }

  function newPage() {
    doc.addPage();
    totalPages.count++;
    y = MT;
    drawHeader(doc);
    y = 33;
  }

  // ── Encabezado primera página ────────────────────────────────────────────────
  // Logo pre-cargado en closure — drawHeader lo pinta en cada página
  const logo = await loadLogo();
  drawHeader(doc);
  y = 33;
  onProgress?.(15);

  // ── Captura del gráfico ─────────────────────────────────────────────────────
  if (chartElement) {
    try {
      const canvas = await html2canvas(chartElement, {
        scale:           2,
        useCORS:         true,
        backgroundColor: '#FFFFFF',
        logging:         false,
      });
      const imgData = canvas.toDataURL('image/png');
      const ratio   = canvas.width / canvas.height;
      const imgW    = W - MX * 2;
      const imgH    = imgW / ratio;

      // Si cabe en la página actual
      if (y + imgH + 10 > H - 15) newPage();
      doc.addImage(imgData, 'PNG', MX, y, imgW, Math.min(imgH, H - y - 20));
      y += Math.min(imgH, H - y - 20) + 8;
    } catch (err) {
      console.error('[ExportService] Error capturando gráfico:', err);
      // Continuar sin gráfico
    }
  }
  onProgress?.(45);

  // ── Tabla de datos ──────────────────────────────────────────────────────────
  if (rows.length > 0) {
    const colW      = (W - MX * 2) / columns.length;
    const rowH      = 7;
    const headerH   = 8;

    function drawTableHeader() {
      // Fondo del header
      doc.setFillColor(22, 177, 184);
      doc.rect(MX, y, W - MX * 2, headerH, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(255, 255, 255);
      columns.forEach((col, i) => {
        doc.text(
          String(col).substring(0, 18),
          MX + colW * i + colW / 2,
          y + headerH / 2 + 1.5,
          { align: 'center' }
        );
      });
      y += headerH;
    }

    // ── Verificar espacio y dibujar header ──
    if (y + headerH + rowH > H - 15) newPage();
    drawTableHeader();

    const totalRowCount = rows.length;
    for (let ri = 0; ri < totalRowCount; ri++) {
      // Salto de página si no cabe la fila
      if (y + rowH > H - 15) {
        newPage();
        drawTableHeader();
      }

      // Stripe
      if (ri % 2 === 0) {
        doc.setFillColor(244, 250, 251);
        doc.rect(MX, y, W - MX * 2, rowH, 'F');
      }

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(51, 65, 85);

      columns.forEach((col, ci) => {
        const raw  = rows[ri][col] ?? '';
        const type = columnTypes[col] ?? 'string';
        let val;
        if (type === 'currency') {
          const num = typeof raw === 'number' ? raw : parseFloat(raw) || 0;
          val = `$${num.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else {
          val = String(raw);
        }
        doc.text(
          val.substring(0, 22),
          MX + colW * ci + colW / 2,
          y + rowH / 2 + 1.5,
          { align: 'center' }
        );
      });

      y += rowH;

      // Progreso: 45-90 proporcional a filas
      if (ri % 20 === 0 || ri === totalRowCount - 1) {
        onProgress?.(45 + Math.round((ri / totalRowCount) * 45));
      }
    }
  }

  // ── Dibujar footers en todas las páginas ────────────────────────────────────
  const numPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= numPages; i++) {
    doc.setPage(i);
    drawFooter(doc, i);
  }
  onProgress?.(95);

  // ── Descargar ───────────────────────────────────────────────────────────────
  doc.save(`${reportName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`);
  onProgress?.(100);
}
