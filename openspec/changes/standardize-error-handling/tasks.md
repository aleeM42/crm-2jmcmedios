# Tasks

## 1. Backend � Emit full errors array from all validation controllers

- [x] 1.1 Update `cliente.controller.js`: change `validarCliente`, `validarContacto`, and `validarTelefonos` callers to collect all errors and respond with `{ success: false, error: errores[0], errors: errores }`. Verify: POST /api/clientes with two invalid fields returns HTTP 400 with `errors` array of length >= 2.
- [x] 1.2 Update `vendedor.controller.js`: same pattern � collect all validation errors and emit `errors` array. Verify: POST /api/vendedores with missing nombre AND correo returns `errors` with two entries.
- [x] 1.3 Update `aliado.controller.js`: same pattern. Verify: POST /api/aliados with missing razon_social AND nombre_emisora returns `errors` with two entries.
- [x] 1.4 Update `visita.controller.js`: collect all errors and emit `errors` array. Verify: POST /api/visitas with multiple missing fields returns `errors` with all violations.
- [x] 1.5 Update `gasto.controller.js` and `gastoMarketing.controller.js`: same pattern. Verify: POST with missing monto AND concepto returns `errors` array with both messages.
- [x] 1.6 Update `pauta.controller.js`: same pattern for all validation logic. Verify: POST /api/pautas with missing emisora AND dates returns `errors` array.
- [x] 1.7 Update `auth.controller.js` and `perfil.controller.js`: same pattern wherever validation arrays are already built. Verify: POST /api/auth/login with empty body returns structured `errors` array.
- [x] 1.8 Update `contacto.controller.js` if it has standalone validation logic. Verify: POST /api/contactos with invalid correo returns `errors` array.

## 2. Frontend � Fix `resolveErrorMessage` resolution priority

- [x] 2.1 In `frontend/src/utils/errorMessages.js`, reorder `resolveErrorMessage` to check module `byKeyword` BEFORE module `byStatus`. New order: module byKeyword ? general byKeyword ? module byStatus ? general byStatus ? module fallback ? general fallback. Verify: call `resolveErrorMessage({ status: 400, data: { error: 'El RIF fiscal es obligatorio.' } }, 'clientes')` and confirm it returns the RIF-specific message, NOT "Datos inv�lidos. Revise el formulario".

## 3. Frontend � Extend `AlertError` to render error lists

- [x] 3.1 Add optional `errors?: string[]` prop to `AlertError`. When `errors` is provided and non-empty, render a `<ul>` list with one `<li>` per entry (shared header icon). When only `message` is provided, behavior is unchanged. Verify: render `<AlertError errors={['Error A', 'Error B']} />` and confirm both messages appear simultaneously; render `<AlertError message="Error A" />` and confirm single-message layout is identical to the current one.

## 4. Frontend  Migrate all forms and modals to use errors array

- [x] 4.1 Update `AgregarCliente.jsx`: on catch, pass `err?.data?.errors || [resolveErrorMessage(err, 'clientes')]` to `setErrors` state and render `<AlertError errors={errors} />`. Verify: submit with two invalid fields and confirm both appear in the alert.
- [x] 4.2 Update `EditarClienteModal.jsx`: same pattern. Verify: attempt to save a client with invalid RIF and see the RIF-specific message, not the generic one.
- [x] 4.3 Update `AgregarVendedor.jsx`: same pattern with module `'vendedores'`. Verify: submit with missing nombre AND correo and see two errors in `AlertError`.
- [x] 4.4 Update `EditarVendedorModal.jsx`: same pattern. Verify: save with conflicting correo returns the specific duplicate-email message.
- [x] 4.5 Update `AgregarAliado.jsx`: same pattern with module `'aliados'`. Verify: submit with missing razon_social sees the specific message.
- [x] 4.6 Update `EditarAliadoModal.jsx`: same pattern. Verify: update shows specific backend message on failure.
- [x] 4.7 Update `AgregarPauta.jsx`: replace `toast.error(resolveErrorMessage(response, 'pautas'))` and `toast.error(resolveErrorMessage(err, 'pautas'))` with a local `errors` state and `<AlertError errors={errors} />`. Front-end-only validation toasts (before submit) may remain. Verify: submit a pauta with a backend error and confirm it renders in `AlertError`, not as a toast notification.
- [x] 4.8 Update `EditarPautaModal.jsx`: same pattern. Verify as above.
- [x] 4.9 Update `AgregarVisita.jsx`, `EditarVisitaModal.jsx`, `AgregarGasto.jsx`, `EditarGastoModal.jsx`, `AgregarSubEmpresa.jsx`: same pattern per module. Verify each shows field-specific messages on backend failure.
- [x] 4.10 Review remaining `Agregar*.jsx` files (`AgregarMarca.jsx`, `AgregarLead.jsx`) and any other form pages for any `toast.error` or raw `alert()` for backend responses; migrate as needed. Verify no `toast.error` call remains for backend validation errors.

## 5. End-to-end verification

- [ ] 5.1 Start the full dev stack (`npm run dev` at root) and submit the AgregarCliente form leaving at least 3 required fields empty. Confirm all 3+ error messages appear simultaneously in `AlertError` � not just one.
- [ ] 5.2 Submit the same form with only valid data. Confirm no `errors` field appears in the success API response and `AlertError` is not shown.
- [ ] 5.3 Trigger a duplicate-RIF error on AgregarCliente and confirm the specific message "El RIF fiscal ya est� registrado" appears (not the generic 400 fallback).
- [ ] 5.4 Submit AgregarPauta with a backend-validation error. Confirm the error renders in `AlertError` (not a toast) and is cleared on the next successful submission.
