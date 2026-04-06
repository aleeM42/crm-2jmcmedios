# Implementación de Reportes Full-Stack

Esta es la propuesta de diseño e implementación para proveer y consumir la información desde base de datos hacia los 14 reportes definidos en el `ReportesDirectorio.jsx`. 

El objetivo es establecer **un endpoint genérico** y una arquitectura de Modelo que devuelva todo lo necesario en una sola petición por reporte, evitando saturar el servidor y simplificando el Frontend.

## User Review Required
> [!IMPORTANT]
> Revisa la lógica de consultas SQL propuesta en la sección "Consultas Propuestas por Reporte" para asegurar que cruza correctamente las tablas según la regla de negocio esperada. En especial revisa cómo calculamos el gasto, la región o la efectividad.

## Propuesta del Endpoint 

**Endpoint:** `GET /api/reportes/:nombreReporte`

**Controller (`/backend/src/controller/reporte.controller.js`):**
Se creará un controlador que reciba el `:nombreReporte`, y mediante un diccionario o un *switch*, llame a la función correspondiente del modelo.

**Respuesta Estándar (JSON):**
```json
{
  "success": true,
  "data": {
    "chartData": [ ... arreglo de datos formateados para Recharts ... ],
    "listData": [ ... arreglo de registros detallados para la tabla ... ]
  }
}
```

---

## Consultas SQL Propuestas por Reporte (`/backend/src/model/reporte.model.js`)

Aquí resumo cómo estructuraré las consultas para llenar el `chartData` y `listData`.

1. **Ranking Clientes por Pautas (`ranking-clientes-pautas`)**
   - **Chart:** TOP 5 `CLIENTE.nombre`, `COUNT(PAUTAS.id)` y `SUM(PAUTAS.monto_oc)`.
   - **List:** Todos los clientes con `total_pautas`, `monto_total_oc` ordenado de forma descendente.

2. **Clientes por Sector (`clientes-sector`)**
   - **Chart:** Agrupado por `sector` de `CLIENTE`, `COUNT(id) as value`.
   - **List:** Detalles (`rif_fiscal`, `nombre`, `sector`, `estado`).

3. **Regiones por Cliente (`regiones-cliente`)**
   - **Chart:** `region.nombre` (tipo = Region), `COUNT(CLIENTE.id)`. Recorreremos usando el `fk_region` de cliente y buscando el `LUGAR` padre que sea región. (Alternativa rápida: se espera que los clientes estén asociados a un estado, y el estado a una región).
   - **List:** `CLIENTE.nombre`, `Región`, `Estado`.

4. **Ingresos Mensuales (`ingresos-mensuales`)**
   - **Chart:** `TO_CHAR(DATE_TRUNC('month', fecha_emision), 'Mon YYYY') as mes`, `SUM(monto_oc)`. 
   - **List:** Histórico detallado de pautas x mes.

5. **Pautas por Filtro (`pautas-filtro`)**
   - **Chart:** 2 gráficos -> 1. Distribución por `estado` (COUNT). 2. Distribución por `tipo_compra` (COUNT). Setaremos properties distintas en `chartData`.
   - **List:** Desglose detallado de pautas (`numero_ot`, `cliente`, `marca`, `estado`, `monto_oc`).

6. **Gastos Cliente (`gastos-cliente`)**
   - **Chart:** `CLIENTE.nombre`, `SUM(GASTOS_MARKETING.monto)` (Solo GM asociados al cliente directamente).
   - **List:** Fechas, conceptos, tipos y montos de `GASTOS_MARKETING` asociados a Clientes.

7. **Marcas Región (`marcas-region`)**
   - **Chart:** `Region.nombre` (región asociada al cliente de la pauta/marca), `COUNT(MARCA_INTER)`.
   - **List:** Marcas, Clientes asociados, Región de la pauta.

8. **Gastos Detalle Vendedor (`gastos-detalle-vendedor`)**
   - **Chart:** `USUARIOS.primer_nombre`, `SUM(GASTOS_VISITAS.monto)` usando el JOIN con `VISITAS` y `VENDEDORES`.
   - **List:** Desglose detallado de viáticos (`concepto`, `monto`, `categoría`, fecha, vendedor).

9. **Top Emisoras Cuñas (`top-emisoras-cunas`)**
   - **Chart:** `ALIADOS_COMERCIALES.nombre_emisora` y `SUM(PAUTAS.cantidad_cunas)` a través de `DETALLE_PAUTA`. TOP 5.
   - **List:** Listado de todas las emisoras que transmiten cuñas con sus totales.

10. **Emisoras Región (`emisoras-region`)**
    - **Chart:** `Region.nombre`, `COUNT(ALIADOS_COMERCIALES.id)`. 
    - **List:** Emisora, Frecuencia, Categoría, Estado.

11. **Clientes Emisora (`clientes-emisora`)**
    - **Chart/List:** Para la gráfica podemos rankear. Listado es `ALIADOS_COMERCIALES` cruzado con `PAUTAS` y `CLIENTE`.

12. **Top Emisoras Clientes (`top-emisoras-clientes`)**
    - **Chart:** TOP Emisoras por `COUNT(DISTINCT PAUTAS.fk_cliente)`.
    - **List:** Mismo cruce con los conteos desagrupados.

13. **Efectividad Vendedores (`efectividad-vendedores`)**
    - **Chart:** Agrupamos `VISITAS` por vendedor evaluando `efectiva = 'si'` vs total, además evaluando las ventas vs la `meta` mensual del `VENDEDOR`.
    - **List:** Desempeño métricas (visitas, efectivas, %).

14. **Emisoras Activas Región (`emisoras-activas-region`)**
    - **Chart:** Agrupado por región, solo `ALIADOS_COMERCIALES` donde `estado = 'activo'`.

---

## Modificaciones Frontend (React)
Para cada uno de los 14 archivos en `frontend/src/pages/Reportes/..`:
1. Quitar la static data en constante superior.
2. Inicializar estáteles globales de la vista: `const [chartData, setChartData] = useState([])`, `[listData, setListData]`, `[loading, setLoading]`.
3. Cargar la data al montar usando `useEffect`:
   ```javascript
   useEffect(() => {
     api.get('/reportes/nombre-reporte').then(res => {
         if(res.success) {
            setChartData(res.data.chartData);
            setListData(res.data.listData);
         }
     }).finally(() => setLoading(false));
   }, []);
   ```
4. Envolver el contenido en un condicional para el render de loading screen y ajustar todos los `<BarChart data={chartData}>` y los `<tr>` para renderizar `listData`.

## Verification Plan
1. Correr el servidor Express y verificar mediante cURL / Browser que `/api/reportes/...` trae data válida de la BD.
2. Abrir el Frontend en el puerto 5173, navegar por cada componente bajo `/reportes` y constatar que renderiza gráficos de Recharts sin errores y puebla las tablas de detalles.
