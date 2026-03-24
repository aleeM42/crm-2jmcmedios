export function calcularProgresoPauta(pauta) {
  if (pauta.estado === 'programada' || pauta.estado === 'suspendida') {
    return { cuñasEmitidas: 0, progresoPorcentaje: 0 };
  }
  
  const cantidadCunas = Number(pauta.cantidad_cunas) || 0;

  if (pauta.estado === 'finalizada' || pauta.estado === 'cancelada') {
    return { cuñasEmitidas: cantidadCunas, progresoPorcentaje: 100 };
  }

  if (pauta.fecha_inicio && pauta.fecha_fin) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Parsear fecha en hora local evadiendo shift de zonas horarias de UTC
    const parseLocalDate = (ds) => {
      if (!ds) return new Date();
      const [y, m, d] = typeof ds === 'string' ? ds.split('T')[0].split('-') : ds.toISOString().split('T')[0].split('-');
      return new Date(y, m - 1, d);
    };

    const inicio = parseLocalDate(pauta.fecha_inicio);
    const fin = parseLocalDate(pauta.fecha_fin);

    const totalDays = (fin - inicio) / (1000 * 60 * 60 * 24);
    const elapsedDays = (today - inicio) / (1000 * 60 * 60 * 24);

    let progresoPorcentaje = 0;
    let cuñasEmitidas = 0;

    if (totalDays <= 0) {
      progresoPorcentaje = today >= inicio ? 100 : 0;
      cuñasEmitidas = today >= inicio ? cantidadCunas : 0;
    } else {
      const ratio = Math.max(0, Math.min(elapsedDays / totalDays, 1));
      cuñasEmitidas = Math.round(cantidadCunas * ratio);
      progresoPorcentaje = Math.round(ratio * 100);
    }

    return { cuñasEmitidas, progresoPorcentaje };
  }

  return { cuñasEmitidas: 0, progresoPorcentaje: 0 };
}
