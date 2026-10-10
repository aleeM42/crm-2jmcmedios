# Spec Delta

## Purpose

Define y estandariza la manera en que se comunican al usuario los éxitos y errores (incluyendo falta de permisos) para las acciones críticas en toda la aplicación, asegurando una experiencia visual y clara en el frontend.

## ADDED Requirements

### Requirement: Notificación Estandarizada de Éxito
El sistema DEBE utilizar un componente de notificación estandarizado en todo el frontend (ej. un *toast*) para confirmar al usuario cuando una acción de creación, actualización o eliminación se complete exitosamente, evitando el uso de alertas nativas o comportamientos silenciosos.

#### Scenario: Éxito en acción crítica
- **WHEN** un usuario guarda exitosamente los datos de un nuevo cliente.
- **THEN** el sistema muestra una notificación estandarizada de éxito ("Cliente guardado correctamente") visible en la pantalla.

### Requirement: Exposición Frontend de Errores de Permisos (Autorización)
El sistema DEBE interceptar y manejar adecuadamente las respuestas HTTP de estado 403 (Prohibido) o relativas a falta de permisos, traduciéndolas a un mensaje visual y claro en el frontend, en lugar de fallar en silencio o lanzar errores genéricos incomprensibles.

#### Scenario: Error por falta de rol/permisos
- **WHEN** un usuario con rol "Vendedor" intenta eliminar un registro que requiere rol de "Admin", y el backend devuelve un error 403.
- **THEN** el frontend muestra una notificación de error estandarizada que indica explícitamente "No tienes permisos para realizar esta acción" o el mensaje exacto enviado por el backend en lugar de un error de sistema.
