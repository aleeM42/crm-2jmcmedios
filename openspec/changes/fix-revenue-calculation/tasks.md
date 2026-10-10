# Tasks

## 1. Actualización de Consultas en Reportes

- [ ] 1.1 Modificar la consulta de ingresos mensuales (`getIngresosMensuales`) en `backend/src/model/reporte.model.js` para usar `MAX(monto_oc) - SUM(monto_ot)` en lugar de `MAX(monto_oc)`. Cambiar la fecha utilizada a `MIN(fecha_emision)` por cada OC. Verificar: Probar la API y comprobar que los ingresos del mes incluyen la deducción de OTs y se asientan sobre la fecha de primera emisión.
- [ ] 1.2 Refactorizar `getRankingClientesPautas` en `backend/src/model/reporte.model.js` para extraer la suma de OCs a una CTE o subconsulta previamente agrupada, evitando el `JOIN` con la tabla `PAUTAS` por cliente que genera el producto cartesiano. Verificar: Ejecutar el endpoint y confirmar que un cliente con una sola OC distribuida en varias pautas muestra el monto total de inversión correcto y no un múltiplo.
- [ ] 1.3 Revisar y ajustar el endpoint `getClientesEmisora` o `getEfectividadVendedores` si es necesario, asegurando que se utilice `MIN(fecha_emision)` donde aplique. Verificar: Constatar que la respuesta JSON de estos endpoints no lanza error y refleja el cambio de cálculo.

## 2. Actualización de Consultas en Dashboard

- [ ] 2.1 Modificar `getResumen` en `backend/src/model/dashboard.model.js` para usar `MIN(fecha_emision)` en vez de `MAX(fecha_emision)` tanto en `variacionQ` como en `ingresosQ`. Verificar: Probar la API de resumen del dashboard y constatar que las variaciones porcentuales toman las primeras emisiones de las pautas.
- [ ] 2.2 Verificar que `topClientesQ`, `totalVentasQ` y `ingresosQ` utilicen el estándar de ganancia neta. (Actualmente ya utilizan `MAX(monto_oc) - SUM(monto_ot)`). Verificar: Re-testear el endpoint completo.

## 3. Verificación End-to-End

- [ ] 3.1 Insertar manualmente (vía interfaz o DB) un cliente con 1 OC nueva ($5.000) dividida en 3 pautas para el mes actual, con montos OT combinados de $2.000. Verificar en la pestaña de Reportes que la inversión/ventas suba por $3.000 (y no por 15.000), y que el dashboard muestre $3.000 de ingreso/venta neta.
