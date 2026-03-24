# Lecciones Aprendidas (Self-Improvement Loop)

## Respuestas del Backend y Arrays
**Contexto**: El frontend espera recibir un array del API para hacer `.map()`, pero los endpoints del backend que incluyen KPIs devuelven un objeto con metadatos.
**Error Común**: Usar `res.data` asumiendo que es un array, causando `TypeError: data.map is not a function` y dejando la pantalla en blanco (pantalla blanca de la muerte de React).
**Regla / Patrón a seguir**: Siempre extraer explícitamente el array esperado cuando el controlador combina múltiples resultados. Ejemplo: `res.data?.vendedores || []` en lugar de `res.data || []`.

## Dependencias y Entornos Limpios
**Contexto**: El comando `npm run dev` en un proyecto clonado fallaba con `ERR_MODULE_NOT_FOUND` para dependencias muy comunes (`dotenv`).
**Error Común**: Omitir la instalación inicial de las dependencias.
**Regla / Patrón a seguir**: Ante cualquier error `MODULE_NOT_FOUND` global del Entry Point, el primer reflejo debe ser ejecutar `npm install` de inmediato.

## fk_usuario y UUID — Empty String Bug
**Contexto**: Al crear oportunidades, el backend hacía `req.body.fk_usuario || req.user.id`. Pero el frontend enviaba `fk_usuario: ''` (string vacío).
**Error Común**: En JavaScript `'' || fallback` SÍ ejecuta el fallback, pero si el frontend manda el campo en el body con un valor inválido, Express lo recibe y PostgreSQL falla con `string_to_uuid`.
**Regla / Patrón a seguir**: Para campos de ownership (fk_usuario, fk_vendedor), SIEMPRE usar `req.user.id` desde el JWT en el backend. No confiar en el frontend. El frontend NO debe enviar este campo.

## RBAC en Pipeline — Quién ve qué
**Contexto**: El pipeline de ventas debe mostrar solo los leads del usuario logueado (vendedor/director). Solo el Administrador ve todos.
**Error Común**: Incluir Director en `isAdmin` cuando el Director también debe ver solo sus propios leads.
**Regla / Patrón a seguir**: `isAdmin = user.rol === 'Administrador'` (no incluir Director). Backend filtra: `vendedorId = rol === 'Administrador' ? null : req.user.id`.

