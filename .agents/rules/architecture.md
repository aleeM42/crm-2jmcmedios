---
trigger: always_on
---

# Arquitectura del Proyecto CRM

Este documento sirve como "El Mapa" del proyecto para entender su estructura, tecnologías, convenciones y modelos de datos de un vistazo.

## Stack Tecnológico
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Base de Datos**: PostgreSQL

## Estructura de Carpetas (Silos Estrictos y MVC)
La arquitectura se basa en el patrón MVC (Modelo-Vista-Controlador), dividida estrictamente en dos repositorios/carpetas principales para mantener la modularización y separar las responsabilidades de UI y servidor:

```text
/ (raíz del proyecto)
├── frontend/
├── public/        # Favicon, imágenes estáticas
└── src/
    ├── assets/    # CSS global, logos
    ├── components/# Botones, tarjetas, formularios (reutilizables)
    ├── pages/     # Vistas completas (Login, Dashboard, Clientes)
    ├── services/  # Conexión con el Backend (Fetch/Axios)
    └── App.jsx    # Enrutador principal del frontend       # Componentes React y lógica   
└── backend/
    ├── config/          # Configuración general y conexión a la base de datos PostgreSQL
    ├── model/           # Modelos de bases de datos y consultas (queries aisladas)
    ├── controller/      # Controladores con la lógica de negocio
    └── router/          # Implementación y definición de endpoints y rutas de la API
```

## Convenciones de Código
- **Silos Estrictos de Base de Datos:** Las consultas (queries) nunca se escriben en componentes de frontend o directamente en el router. Toda gestión a la base de datos pasa exclusivamete por `/backend/model`.
- **Archivos Pequeños:** Mantener los archivos bajo 600-900 líneas. Si un componente de React, controlador o modelo supera este límite, se debe extraer y dividir en sub-componentes lógicos.
- **Reducción de Ruido IA (.aiignore):** Carpetas de dependencias (`node_modules`), builds transpilados (`dist`, `build`), y medios estáticos pesados deben estar ignorados para los Agentes y control de versiones a través de archivos como `.claudeignore` y `.gitignore`.

## Esquema de Base de Datos (Modelo ER)
Resumen de las tablas, entidades y atributos principales extraídos del modelo relacional del CRM.
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
