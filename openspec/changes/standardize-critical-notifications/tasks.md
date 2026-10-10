# Tasks

## 1. Identificación y Limpieza Inicial

- [x] 1.1 Revisar todas las vistas principales de listados (`Clientes`, `Vendedores`, `Pautas`, `Dashboard`) y modales/formularios para identificar dónde se utilizan alertas nativas `alert()`, `console.log()` sin notificar al usuario, o llamadas de `toast` inconsistentes. Verificar: La búsqueda por `alert(` en `frontend/src` no debe retornar usos para mostrar respuestas de API de mutación.

## 2. Implementación de Notificaciones de Éxito

- [x] 2.1 Estandarizar la notificación de éxito en todas las creaciones y ediciones (ej. `AgregarCliente.jsx`, `EditarClienteModal.jsx`, `AgregarPauta.jsx`, etc.) usando `toast.success('Mensaje descriptivo')`. Verificar: Crear un cliente exitosamente muestra un único toast de éxito verde y no una alerta nativa.
- [x] 2.2 Estandarizar la notificación de eliminación de registros usando `toast.success('Registro eliminado')`. Verificar: Eliminar un registro en cualquier listado confirma con el toast.

## 3. Implementación de Notificaciones de Errores de Autorización

- [x] 3.1 Actualizar el bloque `catch` de todas las operaciones críticas de eliminación para interceptar el error HTTP 403 (o mensajes similares del backend sobre permisos). Si se detecta falta de permisos, mostrar `toast.error(mensaje_del_backend || 'No tienes permisos para realizar esta acción')`. Verificar: Intentar eliminar un usuario desde una cuenta de Vendedor dispara un toast rojo de "No tienes permisos" (error visible, sin que la UI se rompa).
- [x] 3.2 Actualizar el bloque `catch` en modales y formularios de creación/edición para interceptar el error 403 (falta de permisos) y mostrar un `toast.error` (diferente a los errores 400 que van al `AlertError`). Verificar: Intentar guardar un recurso sin permisos suficientes lanza un toast.error visible con el mensaje explícito.

## 4. Pruebas End-to-End de Notificaciones

- [ ] 4.1 Iniciar sesión con un usuario restringido (Vendedor) y realizar intentos de eliminación de clientes, pautas, etc., y confirmar que el frontend emite notificaciones claras de falta de permisos (toast.error) en todos los casos. Verificar: 100% de las denegaciones muestran el error visualmente.
- [ ] 4.2 Iniciar sesión con un Admin y realizar operaciones de éxito, confirmando que cada una levanta el toast.success estandarizado. Verificar: UX consistente.
