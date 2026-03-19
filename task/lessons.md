# Lecciones Aprendidas (Self-Improvement Loop)

## Respuestas del Backend y Arrays
**Contexto**: El frontend espera recibir un array del API para hacer `.map()`, pero los endpoints del backend que incluyen KPIs devuelven un objeto con metadatos.
**Error Común**: Usar `res.data` asumiendo que es un array, causando `TypeError: data.map is not a function` y dejando la pantalla en blanco (pantalla blanca de la muerte de React).
**Regla / Patrón a seguir**: Siempre extraer explícitamente el array esperado cuando el controlador combina múltiples resultados. Ejemplo: `res.data?.vendedores || []` en lugar de `res.data || []`.

## Dependencias y Entornos Limpios
**Contexto**: El comando `npm run dev` en un proyecto clonado fallaba con `ERR_MODULE_NOT_FOUND` para dependencias muy comunes (`dotenv`).
**Error Común**: Omitir la instalación inicial de las dependencias.
**Regla / Patrón a seguir**: Ante cualquier error `MODULE_NOT_FOUND` global del Entry Point, el primer reflejo debe ser ejecutar `npm install` de inmediato.
