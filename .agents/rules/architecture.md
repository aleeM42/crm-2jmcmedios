---
trigger: always_on
---

# Arquitectura del Proyecto CRM

Este documento sirve como "El Mapa" del proyecto para entender su estructura, tecnologías, convenciones y modelos de datos de un vistazo.

## Stack Tecnológico
- **Frontend**: React 19 + Vite, Tailwind CSS v4, React Router DOM
- **Backend**: Node.js, Express
- **Base de Datos**: PostgreSQL (Prisma ORM)
- **Bundler**: Vite 7
- **Íconos**: Material Symbols Outlined (Google Fonts)
- **Tipografía**: Montserrat + Inter (Google Fonts)

## Estructura de Carpetas

```text
/ (raíz del proyecto)
├── frontend/
│   ├── index.html           # Entry point HTML (carga /src/main.jsx)
│   ├── vite.config.js       # Configuración de Vite + plugins React y Tailwind
│   ├── package.json
│   ├── public/              # Favicon, imágenes estáticas (Vortice.png, etc.)
│   └── src/
│       ├── main.jsx         # Punto de entrada React (StrictMode + createRoot)
│       ├── App.jsx          # Enrutador principal (BrowserRouter + rutas)
│       ├── assets/          # CSS global (index.css con @theme tokens)
│       ├── components/      # Componentes reutilizables (DashboardLayout, etc.)
│       ├── pages/           # Vistas completas por módulo (Dashboard, Clientes, etc.)
│       └── services/        # Conexión con el Backend (Fetch/Axios)
│
└── backend/
    ├── prisma.config.ts     # Configuración de Prisma ORM
    ├── db/                  # Migraciones y esquema de Prisma
    ├── package.json
    └── src/
        ├── server.js        # Entry point del servidor Express
        ├── config/          # Configuración general y conexión a PostgreSQL
        ├── model/           # Modelos de datos y consultas (queries aisladas)
        ├── controller/      # Controladores con lógica de negocio
        └── router/          # Definición de endpoints y rutas de la API
```

## Convenciones de Código

### General
- **Silos Estrictos de Base de Datos:** Las consultas (queries) nunca se escriben en componentes de frontend ni en el router. Toda gestión a la base de datos pasa exclusivamente por `/backend/src/model`.
- **Archivos Pequeños:** Mantener los archivos bajo 600-900 líneas. Si un componente, controlador o modelo supera este límite, se debe extraer y dividir en sub-componentes lógicos.
- **Reducción de Ruido IA:** Carpetas `node_modules`, `dist`, `build` y medios pesados están ignorados en `.gitignore`.

### Frontend (React)
- **Componentes funcionales** con `export default function NombreComponente()`.
- **Cabecera de archivo** con comentario descriptivo: `// === NombreArchivo.jsx — Descripción ===`.
- **Imports**: React Router (`Link`, `NavLink`, `useLocation`) para navegación.
- **Estilo**: Tailwind CSS v4 utilities inline con tokens personalizados del `@theme`.
- **Nombres de archivos**: PascalCase para componentes (`DetalleCliente.jsx`), camelCase para utilidades.

### Backend (Express)
- Patrón MVC estricto: Router → Controller → Model.
- Respuestas JSON con estructura `{ success, data, error }`.

## Design Tokens (Tailwind @theme)

| Token              | Hex       | Uso                    |
|--------------------|-----------|------------------------|
| `primary`          | `#16B1B8` | Botones, enlaces, sidebar activo |
| `secondary`        | `#8DC63F` | Acento verde, gradientes |
| `accent-light`     | `#A1DEE5` | Fondos suaves, badges  |
| `accent-green`     | `#8DC63F` | Estados positivos      |
| `background-main`  | `#F5F7FA` | Fondo general          |
| `background-light` | `#F5F7FA` | Fondo del layout       |
| `text-dark`        | `#1F2937` | Texto principal        |
| `text-muted`       | `#6B7280` | Texto secundario       |

## Esquema de Base de Datos (Modelo Lógico PostgreSQL)
El sistema utiliza una base de datos relacional robusta en PostgreSQL, con claves foráneas (FK) estrictas e integridad referencial.

### 1. Seguridad y Autenticación
* **USUARIOS:** `id` (UUID PK), `nombre`, `apellido`, `email` (Unique), `password_hash` (Argon2/Bcrypt), `rol` (Enum: Admin, Director, Vendedor), `estado`, `intentos_fallidos`. (Tabla central de RBAC).
* **VENDEDORES:** `usuario_id` (UUID PK/FK -> usuarios.id), `meta_mensual`. (Extensión 1:1 de usuarios).

### 2. Directorio Comercial
* **CLIENTES:** `id` (UUID PK), `nombre`, `razon_social`, `rif_fiscal` (Unique), `clasificacion`, `nombre_agencia` (Nulo si es directo).
* **ALIADOS_COMERCIALES:** `id` (UUID PK), `razon_social`, `nombre_emisora`, `categoria_id` (FK -> categorias).
* **CONTACTOS:** `id` (UUID PK), `cliente_id` (FK nulo si es emisora), `aliado_id` (FK nulo si es cliente), `tipo` (Enum: Emisora, Cliente), `primer_nombre`, `primer_apellido`, `correo`.
* **TELEFONOS:** `codigo_area` (PK), `cuerpo` (PK), `contacto_id` (FK).

### 3. Operaciones Core (Pautas)
* **PAUTAS:** `numero_ot` (Serial PK), `cliente_id` (FK), `vendedor_id` (FK), `marca_id` (FK), `monto_ot`, `tipo_compra`, `estado` (Enum: Programada, En transmisión...).
* **PAUTA_ALIADO (Tabla M:N):** `pauta_id` (FK), `aliado_id` (FK), `cantidad_emisoras`. Conecta en qué emisoras suena una pauta.
* **CUÑAS:** `id` (UUID PK), `pauta_id` (FK), `duracion`, `mensaje`. (Depende estrictamente de la pauta).

### 4. Tracking y Finanzas
* **HISTORICO_NEGOCIACIONES:** `id` (UUID PK), `cliente_id` (FK), `vendedor_id` (FK), `monto_negociacion`.
* **VISITAS:** `id` (UUID PK), `vendedor_id` (FK), `cliente_id` (FK), `lugar_id` (FK), `fecha`, `efectiva` (Boolean).
* **GASTOS (Visitas y Mkt):** Tablas separadas vinculadas a las visitas o campañas para auditar montos y conceptos.
