# Design

## Context

Actualmente en `reporte.model.js` y `dashboard.model.js`, los cálculos financieros derivados de las Órdenes de Compra (OC) y Pautas (OT) sufren de dos grandes problemas: una inconsistencia conceptual ("Ventas" calculando la ganancia neta en dashboard, pero "Ingresos" sumando el monto bruto de la OC en reportes) y un severo error de producto cartesiano en SQL ("fan trap") al unir tablas de relación uno a muchos. (Ver `proposal.md` para la motivación).

## Goals / Non-Goals

**Goals:**
- Unificar todos los cálculos de "Ventas" o "Ingresos" a través de la métrica de **Ganancia Neta** (`monto_oc - sum(monto_ot)`).
- Eliminar el producto cartesiano en `reporte.model.js` (especialmente en `getRankingClientesPautas`).
- Asegurar que la temporalidad (mes/año) de un OC se base exclusivamente en el `MIN(fecha_emision)` de todas las pautas de ese número de OC.

**Non-Goals:**
- No se modificarán los nombres de las variables y respuestas de la API (`totalVentas`, `ingresosMensuales`) para evitar romper los componentes de React en el Frontend.
- No se implementarán cambios en la interfaz de usuario más allá de los valores calculados devueltos por el backend.

## Decisions

### 1. Refactor de `getRankingClientesPautas`
**Problema:** Un `JOIN` entre la tabla de `CLIENTE`, una subconsulta de `OC` y luego la tabla `PAUTAS` multiplica el `monto_oc` tantas veces como pautas tenga la OC.
**Solución:** Extraeremos toda la lógica de conteo y suma a una subconsulta agregada (CTE - Common Table Expression) agrupando de la siguiente manera:
1. Agrupar la tabla `PAUTAS` por `COALESCE(numero_oc, id::text)` y calcular el `profit` de cada OC (`MAX(monto_oc) - SUM(monto_ot)`).
2. Agrupar este resultado intermedio por `fk_cliente` para obtener la suma de ganancias y el total de pautas por cliente.
3. Hacer un único `JOIN` con la tabla `CLIENTE`.
**Alternativa considerada:** Mantener los `JOIN` y usar `COUNT(DISTINCT)` pero no funciona para sumar montos deduplicados sin consultas agrupadas previas.

### 2. Temporalidad de la OC
**Decisión:** En lugar de utilizar `MAX(fecha_emision)`, se utilizará `MIN(fecha_emision)` en las consultas agrupadas por `numero_oc`.
**Razón:** Si una OC comienza en enero y culmina en febrero, el hito que dispara el "ingreso" contablemente a efectos del dashboard de esta agencia es la primera fecha donde arranca el compromiso (enero). Al agrupar las OTs por el mismo OC, `MIN(fecha_emision)` asegura que todo el margen de ganancia se asigne íntegramente al mes de inicio de la primera pauta.

### 3. Ganancia Neta como estándar de Ingreso
**Decisión:** En los métodos `getIngresosMensuales` (de Reportes) se sustituirá `MAX(monto_oc)` por `MAX(monto_oc) - SUM(monto_ot)`.
**Razón:** Mantener consistencia directa con `dashboard.model.js`. El "volumen" que mueve la agencia se mantendrá visible tal vez como inversión total en los rankings de clientes, pero el ingreso de la agencia como entidad de negocio reflejará el profit (lo cual coincide con la vista gerencial requerida por el usuario).

## Risks / Trade-offs

- [Risk] Los totales de ingresos mostrados a los usuarios bajarán drásticamente tras desplegar el cambio.
  → **Mitigación**: Notificar al negocio de que esta baja es en realidad una corrección y limpieza de datos falsamente duplicados.
- [Risk] Posible confusión de los ejecutivos al ver "Ventas" representando la Ganancia Neta y no la venta bruta al cliente.
  → **Mitigación**: Esto ha sido una decisión consciente confirmada con los stakeholders, pero en el futuro podría cambiarse el *label* en el frontend si lo deciden.
