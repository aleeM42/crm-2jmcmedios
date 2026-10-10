# Proposal

## Why

Actualmente, existen discrepancias graves y duplicaciones en el cálculo de los ingresos de la agencia entre los modelos de Dashboard y Reportes. En los reportes, la relación 1 a N entre Orden de Compra (OC) y Pautas (OT) causa que el monto de la OC se multiplique por el número de pautas de un cliente, inflando los resultados (producto cartesiano). Además, existe una inconsistencia conceptual: el Dashboard muestra "Ventas" referenciando a la ganancia neta (`monto_oc - sum(monto_ot)`), mientras que los Reportes asumen "Ingresos" como la venta bruta (`monto_oc`). Es crítico estandarizar que "Ingresos/Ventas" en todos los módulos refleje la **Ganancia Neta** de la agencia, evitar la duplicación de las OCs, y anclar la fecha del ingreso a la primera emisión de dicha OC.

## What Changes

- Estandarizar la fórmula de ingresos en toda la plataforma como **Ganancia Neta** (`monto_oc - sum(monto_ot)` de todas las pautas de esa OC).
- Prevenir la duplicación del `monto_oc`. El monto total de la OC se considera fijo y se fracciona o debita con cada OT ingresada.
- Anclar las fechas de ingreso de la OC a la fecha de la **primera emisión** (`MIN(fecha_emision)`) del grupo de pautas de esa OC, para que todo el monto se registre de forma consolidada en el mes de inicio.
- Corregir las consultas SQL en `reporte.model.js` (específicamente `getRankingClientesPautas`) para agregar correctamente los montos antes del `JOIN` con la tabla de PAUTAS, eliminando el "fan trap" que multiplica artificialmente los ingresos.

## Capabilities

### New Capabilities
- `reports/revenue-calculation`: Define las reglas matemáticas y de agregación para calcular ingresos y evitar la duplicación de Orden de Compra.

### Modified Capabilities
- (N/A)

## Impact

- **Modelos**: `dashboard.model.js` y `reporte.model.js`.
- **Datos expuestos**: Las cifras históricas y actuales en el Dashboard y en la sección de Reportes de Clientes/Ventas verán una corrección sustancial a la baja donde había duplicaciones.
- **Frontend**: Ningún impacto estructural esperado, los nombres de propiedades enviadas en el JSON se mantendrán iguales, solo que los montos vendrán corregidos y unificados bajo el concepto de Ganancia Neta.
