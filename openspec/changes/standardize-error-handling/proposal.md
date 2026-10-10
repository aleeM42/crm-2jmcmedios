# Proposal

## Why

Users currently see generic, opaque error messages (e.g., "Datos inválidos. Revise el formulario") that hide the actual reason why a form submission failed.
This is caused by two compounding problems: the backend returns only the first validation error, and the frontend's `resolveErrorMessage` util resolves HTTP 400 responses to a generic string before it even inspects the specific error text from the backend. Users cannot self-correct without contacting support.

## What Changes

- **Backend**: All validation functions (`validarCliente`, `validarContacto`, `validarTelefonos`, and their equivalents in every other controller) must return and transmit the **full list** of validation errors, not just the first one. The API response for validation failures (HTTP 400) will include a new `errors` array field alongside the existing `error` string (kept for backwards compatibility).
- **Frontend - `resolveErrorMessage`**: The util must prioritize the backend's specific error message (from `error.data.error` or individual keywords) over the generic `byStatus[400]` entry. The `byStatus[400]` fallback becomes a last resort, not the first match.
- **Frontend - `AlertError`**: Extended to optionally accept an `errors` array prop in addition to the existing `message` string, rendering each item as a list entry with its own icon.
- **Frontend - forms/modals**: All form submission handlers updated to pass `errors` (array) when available, falling back to `message` (string), so all error surfaces are consistent.
- **Consistency**: `AgregarPauta.jsx` and any other module using `toast.error()` for backend errors must migrate to `AlertError` with the same pattern used by the rest of the forms.

## Capabilities

### New Capabilities

- `error-handling/field-level-feedback`: System capability for returning, resolving, and displaying the full set of validation errors per form submission, with each error mapped to a specific field or rule.

### Modified Capabilities

*(None - no existing OpenSpec specs to update; this is a greenfield spec for an area not previously specified.)*

## Impact

- **Backend**: All controller validation blocks (`cliente`, `vendedor`, `aliado`, `visita`, `gasto`, `pauta`, `auth`, `perfil`, and any future controllers) - response shape changes to include `errors: string[]`.
- **Frontend utilities**: `frontend/src/utils/errorMessages.js` - resolution priority reordered; `byStatus[400]` demoted to fallback.
- **Frontend components**: `frontend/src/components/AlertError.jsx` - new `errors` prop (array); layout updated to render a list.
- **Frontend pages/modals**: All `Agregar*.jsx` and `Editar*Modal.jsx` pages that call `setError(resolveErrorMessage(...))` or `toast.error(...)` on form submission.
- **No breaking changes to the API contract**: the existing `error` string field is preserved; `errors` array is additive.
