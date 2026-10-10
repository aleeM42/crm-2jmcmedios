# Design

## Context

See proposal.md - Why for motivation.

Current state that shapes the approach:

- `validarCliente`, `validarContacto`, `validarTelefonos` (and equivalents) already collect errors into an array but only return `errores[0]`.
- `errorMessages.js` already has `byKeyword` matching per module, but `byStatus` is checked first, so a 400 always returns the generic text before inspecting the actual error string.
- `AlertError` accepts a single `message` string. It is already used in most `Agregar*.jsx` and `Editar*Modal.jsx` forms.
- `AgregarPauta.jsx` is the only module using `toast.error()` for backend errors; all others use `AlertError`.

## Goals / Non-Goals

**Goals:**

- All backend validation controllers emit the full errors array in HTTP 400 responses.
- `resolveErrorMessage` surfaces the backend's specific message first.
- `AlertError` can render a list of errors without regressions.
- All form pages and modals use `AlertError` for backend errors (no toast for validation errors).
- No changes to the API contract — `error` string field stays; `errors` array is additive.

**Non-Goals:**

- Per-field inline highlighting (error on the specific `<input>` element) — that is a separate UX concern, not in scope here.
- Changing the validation logic or rules themselves.
- Adding a new validation library (e.g., Zod, Yup) — not needed to meet the spec.
- Translating error messages to other languages.

## Decisions

### 1. Emit full errors array from the backend while keeping `error` string

**Decision**: keep `{ success: false, error: errores[0], errors: errores }` as the 400 response shape.

**Why**: Additive change with zero risk of breaking existing frontend code that reads `error`. Future callers can use `errors` directly.

**Alternative considered**: return only `errors` array, drop `error` string. Rejected — any service consumer, integration, or older code path reading `.error` would break.

---

### 2. Fix `resolveErrorMessage` priority: keyword before `byStatus[400]`

**Decision**: Inside `resolveErrorMessage`, check module `byKeyword` BEFORE module `byStatus`. Check `byStatus` only as a final fallback after all keyword passes.

**Why**: The current order (`byStatus` first) causes 400 responses to always resolve to the generic string, ignoring the richer backend message. Swapping the order costs nothing — there is already a `general.fallback` as the absolute last resort.

**New resolution order**:
1. Module `byKeyword` — match against the backend's specific error text
2. General `byKeyword` — match against generic network/fetch errors
3. Module `byStatus` — HTTP status fallback per module
4. General `byStatus` — HTTP status fallback global
5. Module `fallback`
6. General `fallback`

---

### 3. Extend `AlertError` with an `errors` prop (array)

**Decision**: Add an optional `errors?: string[]` prop. When present and non-empty, render a `<ul>` list with one `<li>` per error. Existing `message` prop behavior is unchanged.

**Why**: Minimal surface change to an existing, well-styled component. Avoids introducing a new component that would need to be adopted across 40+ pages.

**Alternative considered**: Render multiple `AlertError` instances stacked. Rejected — each instance has its own animation and dismiss logic, leading to awkward UX.

---

### 4. Migrate `AgregarPauta.jsx` toast calls to `AlertError`

**Decision**: Replace `toast.error(resolveErrorMessage(...))` for backend errors with a local `error` state + `<AlertError errors={...} />`. Frontend-only validation toasts (e.g. "Debe seleccionar una emisora") can optionally remain as toasts since they are immediate UI feedback, not backend errors.

**Why**: Consistency with the rest of the application. Users should not have to learn two different error surfaces.

**Assumption recorded**: Toast notifications for non-backend, in-form UI validation (missing field before submit) are acceptable as-is. If the user wants uniform errors for those too, a separate change is required.

## Risks / Trade-offs

- [Risk] Controllers with deeply nested validation (visita, pauta) collect errors across multiple conditionals. If a developer misses a branch when wiring up the full array, partial error lists ship silently.
  → Mitigation: Tasks will enumerate every controller file explicitly and include a "verify full errors array" step per controller.

- [Risk] `byStatus[400]` demotion could surface a raw backend error string that is not yet in `byKeyword`, degrading message quality for edge cases.
  → Mitigation: The backend validation messages are already human-readable (they are the strings in `validar*` functions). Edge cases will default to the module `fallback`, which is still better than the generic "Datos inválidos" blanket.

- [Risk] `AgregarPauta.jsx` uses toast also for intra-form validations (before submit). Migrating the whole file risks removing those toasts unintentionally.
  → Mitigation: The task explicitly distinguishes "before-submit UI validation" (may keep toast) from "backend error response" (must use AlertError).

## Migration Plan

1. Update all backend controllers — no deploy coordination needed (additive response field).
2. Update `resolveErrorMessage` — pure refactor, no API change.
3. Update `AlertError` component — backwards-compatible prop addition.
4. Update all form pages/modals — one by one, verified against the running dev server.
5. No rollback strategy required — all changes are additive or isolated to the presentation layer.
