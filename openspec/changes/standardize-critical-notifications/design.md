# Design

## Context

El proyecto actualmente maneja los errores de validación de campos con un componente `<AlertError />` (cambio reciente) y algunas notificaciones flotantes con `toast.error()` o `toast.success()`. Sin embargo, para las operaciones críticas, como eliminar registros o acciones bloqueadas por falta de permisos (código HTTP 403), el manejo no está centralizado ni es visualmente consistente. Se requiere un enfoque uniforme utilizando las herramientas existentes en el stack de React (específicamente la librería `sonner` para toasts) que informe al usuario de manera clara cuando una acción tiene éxito o cuando no está autorizado para realizarla.

## Goals / Non-Goals

**Goals:**
- Centralizar y estandarizar la llamada a `toast.success` para todas las acciones de creación, actualización y eliminación exitosas.
- Capturar los errores de permisos (status 403 u otros de autorización) en las cláusulas `catch` de las llamadas a la API en el frontend, y renderizarlos vía `toast.error` con un mensaje amigable o el mensaje proveído por el backend.
- Eliminar el uso de alertas nativas (`alert()`) o fallos silenciosos (errores que se quedan solo en consola) para mutaciones críticas.

**Non-Goals:**
- No se reemplazarán los errores de validación de formularios campo a campo (estos ya están siendo manejados por `<AlertError />`). Esto aplica a notificaciones de éxito y errores globales como permisos.
- No se implementará un nuevo sistema o librería de notificaciones (se reusará `sonner` que ya está instalado).

## Decisions

### 1. Uso de `sonner` (`toast`) para Notificaciones de Éxito
**Decisión:** Todas las llamadas asíncronas de mutación (POST, PUT, DELETE) que retornen éxito llamarán a `toast.success('Mensaje descriptivo')`.
**Razón:** Es un estándar moderno, no intrusivo, que el proyecto ya tiene instalado.
**Alternativa considerada:** Usar mensajes en línea (`AlertSuccess`), pero los modales muchas veces se cierran al tener éxito, por lo que un toast persistente en pantalla tras el cierre del modal es la mejor UX.

### 2. Manejo de Errores de Autorización (403/401)
**Decisión:** En los bloques `catch` de los formularios/modales, si el error contiene información de permisos o estado `403`, se lanzará un `toast.error('No tienes permisos...')`. Si es un error 400 de validación, se pasará al state `errors` para que `<AlertError />` lo dibuje.
**Razón:** Los errores de validación de campos deben estar cerca del formulario. Los errores de falta de permisos impiden toda la acción, por lo cual una notificación de tipo *toast* llama mejor la atención sobre restricciones de rol.

## Risks / Trade-offs

- [Risk] Posible doble notificación si el backend devuelve un 400 y un componente usa tanto el `AlertError` como un `toast.error`.
  → **Mitigación**: Se revisarán cuidadosamente los bloques `catch` para asegurar que el `toast.error` se reserve exclusivamente para errores no relacionados con validación (como el 403 o fallas de red), mientras que los de validación van al componente `AlertError`.
