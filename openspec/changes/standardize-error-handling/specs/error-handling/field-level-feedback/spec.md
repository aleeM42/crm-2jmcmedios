# Spec Delta

## Purpose

Defines the contract for returning, resolving, and displaying the complete set of validation errors across all form submissions in the CRM, so users can see exactly which fields failed and why — without contacting support.

## ADDED Requirements

### Requirement: Backend returns all validation errors

The system SHALL collect ALL validation errors for a single request and include them in the response body as an `errors` string array.
The response MUST also include an `error` string field (first element of the array) for backwards compatibility.
The HTTP status for a validation failure MUST remain 400.

#### Scenario: Single field invalid

- **WHEN** a user submits a form with one invalid field (e.g., RIF malformado)
- **THEN** the API MUST respond with HTTP 400, `success: false`, an `errors` array with exactly one message, and `error` set to that message

#### Scenario: Multiple fields invalid

- **WHEN** a user submits a form with two or more invalid fields simultaneously
- **THEN** the API MUST respond with HTTP 400, `success: false`, and an `errors` array containing one descriptive message per violated rule, in the order the validations are declared

#### Scenario: No validation errors

- **WHEN** all submitted fields pass validation
- **THEN** the API MUST NOT include an `errors` field in the success response

---

### Requirement: Error message resolution prioritizes backend specificity

The frontend error resolution utility (`resolveErrorMessage`) SHALL surface the backend's own error message text before applying generic HTTP-status fallbacks.

#### Scenario: Backend returns specific 400 message

- **WHEN** the API responds with HTTP 400 and an `error` or `errors[0]` string that contains recognizable keywords
- **THEN** `resolveErrorMessage` MUST return a message derived from that specific text, NOT a generic "Datos inválidos. Revise el formulario" string

#### Scenario: Backend 400 with no recognizable keyword

- **WHEN** the API responds with HTTP 400 and `error` text matches no keyword in any module dictionary
- **THEN** `resolveErrorMessage` MAY fall back to the generic `byStatus[400]` entry as a last resort

---

### Requirement: AlertError displays a list of errors

The `AlertError` component SHALL accept an `errors` prop (string array) and, when provided, render each item as a distinct line inside the alert — preserving all existing single-message behavior.

#### Scenario: Single error passed as `message`

- **WHEN** `AlertError` receives only a `message` string prop
- **THEN** it MUST render identically to its current behavior (no regression)

#### Scenario: Multiple errors passed as `errors` array

- **WHEN** `AlertError` receives an `errors` prop with two or more strings
- **THEN** it MUST render each string as a separate list item, all visible simultaneously, with an error icon per item or a shared header icon

#### Scenario: Both `message` and `errors` provided

- **WHEN** `AlertError` receives both `message` and `errors`
- **THEN** `errors` MUST take precedence and the list view is shown

---

### Requirement: All form surfaces use a consistent error display mechanism

Every form submission handler (pages and modals) SHALL display backend errors through `AlertError`, not through browser `alert()`, bare `console.error`, or `toast.error()` for backend validation errors.

#### Scenario: Backend validation fails on a form page

- **WHEN** a `Agregar*.jsx` or `Editar*Modal.jsx` form submit receives an error response
- **THEN** the component MUST call `setError` / `setErrors` and render `<AlertError>` with the resolved message(s), scrolled into view

#### Scenario: User corrects fields and resubmits

- **WHEN** the user fixes the fields and resubmits
- **THEN** the `AlertError` MUST be cleared before the new request is dispatched, and MUST NOT reappear unless the new submission also fails
