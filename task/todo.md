# Plan de Tareas: Inicialización del Backend

- [x] Identificar el error al iniciar el backend (Faltaba paquete dotenv)
- [x] Instalar dependencias del backend usando `npm install`
- [x] Validar que el servidor inicia correctamente (puerto 3001)
- [x] Configurar el archivo `.env` según el `.env.example`
- [x] Inicializar el frontend usando `npm install`

## Fix: Blank Screen in Agregar Cliente
- [x] Investigar ciclo de vida y renders de `AgregarCliente.jsx`
- [x] Localizar el crash: `vendedores.map is not a function` por desajuste de payload API
- [x] Aplicar corrección a la asignación de estado (`venRes.data?.vendedores`)
- [x] Verificar funcionamiento en la UI

## Feature: Validación de Campos
- [x] Limitar RIF Fiscal a 10 caracteres (Letras válidas [J,G,V,P] + 9 dígitos)
- [x] Limitar y validar código de área a 4 dígitos
- [x] Limitar y validar número de teléfono a 7 dígitos

## Review
- El error `"Cannot find package 'dotenv'"` se originaba por la ausencia de los módulos de Node (`node_modules`) en el backend.
- Se instalaron las dependencias (`npm install`) tanto en el backend como en el frontend para prevenir el mismo error.
- El servidor backend levantó correctamente en el puerto 3001 en la prueba de validación.
- **Acción Pendiente:** Se ha configurado el `.env` utilizando las credenciales generadas en el `init.sql` (usuario: `alejandra`).
