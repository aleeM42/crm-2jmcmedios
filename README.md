# CRM 2jmcMedios

Sistema de Gestión Comercial para la red local de 2jmcMedios.

## Arquitectura

El proyecto sigue una arquitectura **MVC con Silos Estrictos**:

```
crm-2jmcmedios/
├── backend/                    # Silo Backend (Express + Prisma)
│   ├── prisma/
│   │   └── schema.prisma       # Modelos de datos
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # Instancia PrismaClient
│   │   ├── model/              # TODA la lógica de queries
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
│   ├── .env                    # Variables de entorno (NO commitear)
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
| **Model** | `backend/src/model/` | Queries Prisma aisladas. TODA interacción con BD |
| **Controller** | `backend/src/controller/` | Validaciones y lógica de negocio |
| **Router** | `backend/src/router/` | Definición de endpoints REST |
| **View** | `frontend/views/` | Componentes React (.jsx) + Tailwind CSS |

## Modelos de Datos

- **Cliente** — Empresas/razones sociales gestionadas
- **Contacto** — Personas de contacto asociadas a un cliente
- **Vendedor** — Equipo comercial
- **Visita** — Registro de visitas comerciales

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

# 2. Configurar base de datos
# Editar backend/.env con tus credenciales PostgreSQL:
# DATABASE_URL="postgresql://postgres:TU_CLAVE@localhost:5432/crm_2jmc?schema=public"

# 3. Crear tablas en PostgreSQL
cd backend && npx prisma db push

# 4. Ejecutar en desarrollo
npm run dev   # Lanza backend (:3001) y frontend (:5173) juntos
```

## Regla de Oro

Ningún archivo debe superar las **600-900 líneas**. Si crece más, se divide en sub-archivos dentro de su respectivo silo.

---

*Proyecto del equipo MAD — 2jmcMedios © 2026*
