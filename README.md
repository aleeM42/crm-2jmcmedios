# CRM 2jmcMedios

Sistema de Gestión Comercial para la red local de 2jmcMedios.

## Arquitectura

El proyecto sigue una arquitectura **MVC con Silos Estrictos** y **Docker** para base de datos.

```
crm-2jmcmedios/
├── docker-compose.yml          # Configuración de PostgreSQL local
├── backend/                    # Silo Backend (Express + pg)
│   ├── db/
│   │   └── init.sql            # Estructura inicial (creación de tablas)
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # Pool de conexión PostgreSQL (pg)
│   │   ├── model/              # Queries de SQL Puro
│   │   │   ├── cliente.model.js
│   │   │   ├── contacto.model.js
│   │   │   ├── vendedor.model.js
│   │   │   └── visita.model.js
│   │   ├── controller/         # Lógica de negocio y validaciones
│   │   │   ├── cliente.controller.js
│   │   │   ├── contacto.controller.js
│   │   │   ├── vendedor.controller.js
│   │   │   └── visita.controller.js
│   │   ├── router/             # Definición de endpoints API
│   │   │   ├── cliente.router.js
│   │   │   ├── contacto.router.js
│   │   │   ├── vendedor.router.js
│   │   │   └── visita.router.js
│   │   └── server.js           # Entry point Express
│   ├── .env                    # Variables de entorno
│   └── package.json
├── frontend/                   # Silo Frontend (React + Vite + Tailwind)
│   ├── public/                 # Assets estáticos
│   ├── views/
│   │   ├── html/
│   │   │   └── index.html      # Plantilla base
│   │   ├── css/
│   │   │   └── index.css       # Tailwind + estilos globales
│   │   └── js/                 # Componentes React (.jsx)
│   │       ├── main.jsx
│   │       └── App.jsx
│   ├── vite.config.js
│   └── package.json
├── .gitignore
├── .aiignore
├── package.json                # Scripts raíz (concurrently)
└── README.md
```

## Patrón MVC

| Capa | Carpeta | Responsabilidad |
|------|---------|-----------------|
| **Model** | `backend/src/model/` | SQL Puro usando cliente `pg`. TODA interacción BD aisalda aquí. |
| **Controller** | `backend/src/controller/` | Validaciones y lógica de negocio |
| **Router** | `backend/src/router/` | Definición de endpoints REST |
| **View** | `frontend/views/` | Componentes React (.jsx) + Tailwind CSS |

## Base de Datos (Docker)

La base de datos se despliega de forma autónoma con **Docker Compose**.
El script `backend/db/init.sql` aprovisiona automáticamente 4 tablas:
- **clientes**
- **contactos**
- **vendedores**
- **visitas**

## Endpoints API

| Recurso | Base URL |
|---------|----------|
| Clientes | `GET/POST /api/clientes`, `GET/PUT/DELETE /api/clientes/:id` |
| Contactos | `GET/POST /api/contactos`, `GET/PUT/DELETE /api/contactos/:id` |
| Vendedores | `GET/POST /api/vendedores`, `GET/PUT/DELETE /api/vendedores/:id` |
| Visitas | `GET/POST /api/visitas`, `GET/PUT/DELETE /api/visitas/:id` |
| Health | `GET /api/health` |

## Inicio Rápido

```bash
# 1. Instalar dependencias
npm install --prefix backend
npm install --prefix frontend

# 2. Configurar base de datos (crear .env si no existe)
# Editar backend/.env con:
# DATABASE_URL="postgresql://postgres:TU_CLAVE@localhost:5432/crm_2jmc"

# 3. Levantar PostgreSQL
docker-compose up -d

# 4. Ejecutar infraestructura (Backend y Frontend al mismo tiempo)
npm run dev
```

## Regla de Oro

Ningún archivo debe superar las **600-900 líneas**. Si crece más, se divide en sub-archivos dentro de su respectivo silo.

---

*Proyecto del equipo MAD — 2jmcMedios © 2026*
