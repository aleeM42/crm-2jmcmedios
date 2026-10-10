# Proposal

## Why

Actualmente en la aplicación, el manejo y presentación de notificaciones de confirmación (éxito) y errores (especialmente los derivados por falta de permisos o roles) tras realizar acciones críticas carece de un formato completamente unificado que el usuario pueda visualizar siempre en el frontend de forma clara. Estandarizar estas notificaciones es vital para garantizar una experiencia de usuario (UX) coherente, reducir la confusión cuando una acción falla por motivos de seguridad o rol, y asegurar que el sistema siempre provea retroalimentación inequívoca tras operaciones sensibles.

## What Changes

- Estandarización de todas las notificaciones de éxito (confirmaciones) para acciones críticas (crear, editar, eliminar) utilizando una interfaz unificada (por ejemplo, el componente `toast` de `sonner` que ya existe en el stack).
- Implementación de un formato unificado para mostrar errores relacionados con la falta de permisos o roles (errores de autorización 403), exponiéndolos directamente en el frontend mediante notificaciones visuales (toast o alertas) en lugar de fallos silenciosos o mensajes genéricos.
- Asegurar que todas las llamadas asíncronas a la API que muten estado capturen estos errores específicos de permisos y los traduzcan a mensajes claros para el usuario final.

## Capabilities

### New Capabilities
- `error-handling/critical-notifications`: Estandariza la presentación de notificaciones de éxito y errores de autorización en operaciones críticas en todo el frontend.

### Modified Capabilities
- (N/A)

## Impact

- **Frontend**: Se actualizarán los hooks, servicios o componentes que realizan mutaciones a la API (formularios, modales y botones de borrado) para que sigan un mismo patrón de visualización de notificaciones.
- **Interacción de Usuario**: Los mensajes serán más descriptivos, y en caso de que un usuario (ej. Vendedor) intente algo sin los permisos necesarios, verá inmediatamente un mensaje estandarizado explicando el porqué.
